import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  ApplicationStatus,
  AssignmentStatus,
  EngagementApplication,
  EngagementStatus,
  Prisma,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { MemberService } from "../integrations/member.service";
import { EventBusService } from "../integrations/event-bus.service";
import { AssignmentOfferEmailService } from "../integrations/assignment-offer-email.service";
import { EngagementMemberAssignedPayload } from "../integrations/types/event-bus.types";
import { EngagementsService } from "../engagements/engagements.service";
import {
  ApplicationQueryDto,
  APPLICATION_SORT_FIELDS,
  ApplicationSortBy,
  ApproveApplicationDto,
  CreateApplicationDto,
} from "./dto";
import { PaginatedResponse } from "../engagements/dto";
import { ERROR_MESSAGES } from "../common/constants";
import {
  ProjectManagerRoles,
  TalentManagerRoles,
  TaskManagerRoles,
  UserRoles,
} from "../app-constants";
import {
  getUserIdentifier,
  getUserRoles,
  normalizeUserId,
} from "../common/user.util";

type MemberAddress = {
  streetAddr1?: string | null;
  city?: string | null;
  stateCode?: string | null;
  zip?: string | null;
};

type ApplicationWithEngagement = Prisma.EngagementApplicationGetPayload<{
  include: { engagement: true };
}>;

const PROJECT_MANAGER_ROLE_SET = new Set(
  ProjectManagerRoles.map((role) => role.toLowerCase()),
);

const TASK_MANAGER_ROLE_SET = new Set(
  [...TaskManagerRoles, ...TalentManagerRoles].map((role) =>
    role.toLowerCase(),
  ),
);

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(
    private readonly db: DbService,
    private readonly memberService: MemberService,
    private readonly engagementsService: EngagementsService,
    private readonly eventBusService: EventBusService,
    private readonly assignmentOfferEmailService: AssignmentOfferEmailService,
  ) {}

  async create(
    engagementId: string,
    createDto: CreateApplicationDto,
    authUser: Record<string, any>,
  ): Promise<EngagementApplication> {
    if (authUser?.isMachine) {
      throw new ForbiddenException("M2M tokens cannot create applications.");
    }

    const normalizedUserId = normalizeUserId(authUser?.userId);
    if (!normalizedUserId) {
      throw new ForbiddenException(
        "User ID is required to create applications.",
      );
    }
    this.logger.debug("Creating application", {
      engagementId,
      userId: normalizedUserId,
    });

    const engagement = await this.engagementsService.findOne(engagementId);

    if (engagement.status !== EngagementStatus.OPEN) {
      throw new BadRequestException(ERROR_MESSAGES.EngagementNotOpen);
    }

    const existing = await this.db.engagementApplication.findUnique({
      where: {
        engagementId_userId: {
          engagementId,
          userId: normalizedUserId,
        },
      },
    });

    if (existing) {
      throw new ConflictException(ERROR_MESSAGES.DuplicateApplication);
    }

    const member = await this.memberService.getMemberByUserId(normalizedUserId);
    if (!member) {
      throw new NotFoundException(ERROR_MESSAGES.MemberNotFound);
    }

    const memberAddress =
      await this.memberService.getMemberAddress(normalizedUserId);
    const formattedAddress = this.formatAddress(memberAddress);
    const name = [member.firstName, member.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const handle =
      typeof authUser?.handle === "string" ? authUser.handle.trim() : undefined;
    const resolvedHandle = handle ? handle : undefined;

    return this.db.engagementApplication.create({
      data: {
        engagementId,
        userId: normalizedUserId,
        ...(resolvedHandle && { handle: resolvedHandle }),
        email: member.email ?? "",
        name,
        address: formattedAddress,
        mobileNumber: createDto.mobileNumber,
        coverLetter: createDto.coverLetter,
        resumeUrl: createDto.resumeUrl,
        portfolioUrls: createDto.portfolioUrls ?? [],
        yearsOfExperience: createDto.yearsOfExperience,
        availability: createDto.availability,
      },
    });
  }

  async findAll(
    query: ApplicationQueryDto,
    authUser: Record<string, any>,
  ): Promise<PaginatedResponse<EngagementApplication>> {
    const where: Prisma.EngagementApplicationWhereInput = {};
    const isAdmin = this.isAdmin(authUser);
    const isProjectManager = this.isProjectManager(authUser);
    const authUserId = normalizeUserId(authUser?.userId);

    if (query.engagementId) {
      where.engagementId = query.engagementId;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.status?.length) {
      const statuses = Array.isArray(query.status)
        ? query.status
        : [query.status];
      if (statuses.length) {
        where.status = { in: statuses };
      }
    }

    if (isProjectManager && !isAdmin) {
      where.engagement = { createdBy: authUserId };
    } else if (!this.isAdminOrPm(authUser)) {
      where.userId = authUserId;
    }

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;

    const sortBy = APPLICATION_SORT_FIELDS.includes(query.sortBy)
      ? query.sortBy
      : ApplicationSortBy.CreatedAt;

    const orderBy: Prisma.EngagementApplicationOrderByWithRelationInput = {
      [sortBy]: query.sortOrder,
    };

    const include = query.engagementId ? { engagement: true } : undefined;

    const [data, totalCount] = await Promise.all([
      this.db.engagementApplication.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
        include,
      }),
      this.db.engagementApplication.count({ where }),
    ]);

    const totalPages = totalCount ? Math.ceil(totalCount / perPage) : 0;

    return {
      data,
      meta: {
        page,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }

  async findOne(
    id: string,
    authUser: Record<string, any>,
  ): Promise<ApplicationWithEngagement> {
    const application = await this.db.engagementApplication.findUnique({
      where: { id },
      include: { engagement: true },
    });

    if (!application) {
      throw new NotFoundException("Application not found.");
    }

    if (this.isAdminOrPm(authUser)) {
      return application;
    }

    const authUserId = normalizeUserId(authUser?.userId);
    this.assertUserOwnsApplication(application, authUserId);
    return application;
  }

  async findByEngagement(
    engagementId: string,
    authUser: Record<string, any>,
  ): Promise<EngagementApplication[]> {
    await this.engagementsService.findOne(engagementId);

    if (!this.isAdminOrPm(authUser)) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedApplicationAccess,
      );
    }

    return this.db.engagementApplication.findMany({
      where: { engagementId },
    });
  }

  async approve(
    id: string,
    authUser: Record<string, any>,
    assignmentDetails?: ApproveApplicationDto,
  ): Promise<EngagementApplication> {
    return this.updateStatus(
      id,
      ApplicationStatus.SELECTED,
      authUser,
      assignmentDetails,
    );
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
    authUser: Record<string, any>,
    assignmentDetails?: ApproveApplicationDto,
  ): Promise<EngagementApplication> {
    const application = await this.findOne(id, authUser);
    const authUserId = getUserIdentifier(authUser);
    const wasSelected = application.status === ApplicationStatus.SELECTED;

    if (status === ApplicationStatus.SELECTED && !wasSelected) {
      await this.handleMemberAssignment(
        application,
        authUser,
        assignmentDetails,
      );
    } else if (wasSelected && status !== ApplicationStatus.SELECTED) {
      await this.handleMemberUnassignment(application);
    }

    return this.db.engagementApplication.update({
      where: { id },
      data: {
        status,
        updatedBy: authUserId,
      },
    });
  }

  private normalizeAssignmentDetails(details?: ApproveApplicationDto): {
    startDate?: Date;
    endDate?: Date;
    agreementRate?: string;
    otherRemarks?: string | null;
    hasAny: boolean;
  } {
    const parseDate = (value?: string) => {
      if (value === undefined || value === null || value === "") {
        return undefined;
      }
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        throw new BadRequestException("Invalid assignment date format.");
      }
      return parsed;
    };

    const startDate = parseDate(details?.startDate);
    const endDate = parseDate(details?.endDate);
    const agreementRate =
      details?.agreementRate !== undefined ? details.agreementRate : undefined;
    const otherRemarks =
      details?.otherRemarks !== undefined ? details.otherRemarks : undefined;

    if (startDate && endDate && endDate.getTime() < startDate.getTime()) {
      throw new BadRequestException(
        "Assignment end date must be after start date.",
      );
    }

    return {
      startDate,
      endDate,
      agreementRate,
      otherRemarks,
      hasAny:
        startDate !== undefined ||
        endDate !== undefined ||
        agreementRate !== undefined ||
        otherRemarks !== undefined,
    };
  }

  private async handleMemberAssignment(
    application: ApplicationWithEngagement,
    authUser: Record<string, any>,
    assignmentDetails?: ApproveApplicationDto,
  ): Promise<void> {
    const normalizedAssignment =
      this.normalizeAssignmentDetails(assignmentDetails);
    const memberHandle = await this.memberService.getMemberHandleByUserId(
      application.userId,
    );
    const resolvedMemberHandle = memberHandle?.trim();
    if (!resolvedMemberHandle) {
      throw new BadRequestException(
        `Member handle not found for userId ${application.userId}`,
      );
    }
    const assignmentResult = await this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.findUnique({
        where: { id: application.engagementId },
      });

      if (!engagement) {
        throw new NotFoundException("Engagement not found.");
      }

      const engagementId = engagement.id;
      const memberId = application.userId;

      const existingAssignment = await tx.engagementAssignment.findUnique({
        where: {
          engagementId_memberId: {
            engagementId,
            memberId,
          },
        },
      });

      if (existingAssignment) {
        let updatedAssignment = existingAssignment;
        if (normalizedAssignment.hasAny) {
          const updateData: Prisma.EngagementAssignmentUpdateInput = {};
          if (normalizedAssignment.startDate !== undefined) {
            updateData.startDate = normalizedAssignment.startDate;
          }
          if (normalizedAssignment.endDate !== undefined) {
            updateData.endDate = normalizedAssignment.endDate;
          }
          if (normalizedAssignment.agreementRate !== undefined) {
            updateData.agreementRate = normalizedAssignment.agreementRate;
          }
          if (normalizedAssignment.otherRemarks !== undefined) {
            updateData.otherRemarks = normalizedAssignment.otherRemarks;
          }
          updatedAssignment = await tx.engagementAssignment.update({
            where: { id: existingAssignment.id },
            data: updateData,
          });
        }
        this.logger.debug(
          `Member ${memberId} already assigned to engagement ${engagementId}`,
        );
        return {
          assigned: false,
          engagement,
          assignmentId: existingAssignment.id,
          memberHandle: existingAssignment.memberHandle,
          assignment: {
            id: updatedAssignment.id,
            engagementId: updatedAssignment.engagementId,
            startDate: updatedAssignment.startDate,
            endDate: updatedAssignment.endDate,
            agreementRate: updatedAssignment.agreementRate,
          },
        };
      }

      const assignmentCount = await tx.engagementAssignment.count({
        where: { engagementId },
      });

      if (
        engagement.requiredMemberCount !== undefined &&
        engagement.requiredMemberCount !== null &&
        assignmentCount >= engagement.requiredMemberCount
      ) {
        throw new BadRequestException(
          "Maximum number of members already assigned to this engagement",
        );
      }

      const assignment = await tx.engagementAssignment.create({
        data: {
          id: nanoid(),
          engagementId,
          memberId,
          memberHandle: resolvedMemberHandle,
          status: AssignmentStatus.SELECTED,
          ...(normalizedAssignment.startDate !== undefined && {
            startDate: normalizedAssignment.startDate,
          }),
          ...(normalizedAssignment.endDate !== undefined && {
            endDate: normalizedAssignment.endDate,
          }),
          ...(normalizedAssignment.agreementRate !== undefined && {
            agreementRate: normalizedAssignment.agreementRate,
          }),
          ...(normalizedAssignment.otherRemarks !== undefined && {
            otherRemarks: normalizedAssignment.otherRemarks,
          }),
        },
      });

      const updatedEngagement = await tx.engagement.findUnique({
        where: { id: engagement.id },
        include: { assignments: true },
      });

      if (!updatedEngagement) {
        throw new NotFoundException("Engagement not found.");
      }

      return {
        assigned: true,
        engagement: updatedEngagement,
        assignmentId: assignment.id,
        memberHandle: resolvedMemberHandle,
        assignment: {
          id: assignment.id,
          engagementId: assignment.engagementId,
          startDate: assignment.startDate,
          endDate: assignment.endDate,
          agreementRate: assignment.agreementRate,
        },
      };
    });

    if (!assignmentResult.assignmentId) {
      return;
    }

    const { engagement, assignmentId, assigned } = assignmentResult;
    const payloadMemberHandle =
      assignmentResult.memberHandle?.trim() || resolvedMemberHandle;

    this.logger.log(
      assigned
        ? `Assigned member ${application.userId} to engagement ${engagement.id}`
        : `Member ${application.userId} already assigned to engagement ${engagement.id}; emitting assignment event`,
    );

    const payload: EngagementMemberAssignedPayload = {
      engagementId: engagement.id,
      assignmentId,
      memberId: Number(application.userId),
      memberHandle: payloadMemberHandle,
      skills: engagement.requiredSkills.map((skillId) => ({
        id: skillId,
      })),
    };

    try {
      await this.eventBusService.postEvent(
        "engagement.member.assigned",
        payload,
      );
      this.logger.log(
        `Emitted engagement.member.assigned event for engagement ${engagement.id}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to emit engagement.member.assigned event for engagement ${engagement.id}: ${message}`,
      );
    }

    if (assigned) {
      await this.assignmentOfferEmailService.sendAssignmentOfferEmail({
        memberId: String(application.userId),
        memberHandle: payloadMemberHandle,
        assignmentId,
        engagementId: engagement.id,
        assignmentStartDate: assignmentResult.assignment?.startDate ?? null,
        assignmentEndDate: assignmentResult.assignment?.endDate ?? null,
        agreementRate: assignmentResult.assignment?.agreementRate ?? null,
      });
    }
  }

  private async handleMemberUnassignment(
    application: ApplicationWithEngagement,
  ): Promise<void> {
    const assignment = await this.db.engagementAssignment.findUnique({
      where: {
        engagementId_memberId: {
          engagementId: application.engagementId,
          memberId: application.userId,
        },
      },
      select: { id: true },
    });

    if (!assignment?.id) {
      return;
    }

    await this.engagementsService.removeAssignment(
      application.engagementId,
      assignment.id,
    );
  }

  private assertUserOwnsApplication(
    application: EngagementApplication,
    userId?: string,
  ) {
    if (application.userId !== userId) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedApplicationAccess,
      );
    }
  }

  private isAdminOrPm(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    if (this.isAdmin(authUser)) {
      return true;
    }

    return this.isProjectManager(authUser) || this.isTaskManager(authUser);
  }

  private isAdmin(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    if (authUser.isMachine) {
      return true;
    }

    const roles = getUserRoles(authUser);
    return roles.some(
      (role) => role?.toLowerCase() === UserRoles.Admin.toLowerCase(),
    );
  }

  private isProjectManager(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    const roles = getUserRoles(authUser);
    return roles.some((role) =>
      PROJECT_MANAGER_ROLE_SET.has(role?.toLowerCase()),
    );
  }

  private isTaskManager(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    const roles = getUserRoles(authUser);
    return roles.some((role) => TASK_MANAGER_ROLE_SET.has(role?.toLowerCase()));
  }

  private formatAddress(address?: MemberAddress | null): string | null {
    if (!address) {
      return null;
    }

    const street = address.streetAddr1?.trim();
    const city = address.city?.trim();
    const state = address.stateCode?.trim();
    const zip = address.zip?.trim();

    const base = [street, city].filter(Boolean) as string[];
    const stateZip = [state, zip].filter(Boolean).join(" ");

    if (stateZip) {
      base.push(stateZip);
    }

    return base.length ? base.join(", ") : null;
  }
}
