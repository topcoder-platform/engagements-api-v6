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
  EngagementApplication,
  EngagementStatus,
  Prisma,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { MemberService } from "../integrations/member.service";
import { EventBusService } from "../integrations/event-bus.service";
import { EngagementMemberAssignedPayload } from "../integrations/types/event-bus.types";
import { EngagementsService } from "../engagements/engagements.service";
import {
  ApplicationQueryDto,
  APPLICATION_SORT_FIELDS,
  ApplicationSortBy,
  CreateApplicationDto,
} from "./dto";
import { PaginatedResponse } from "../engagements/dto";
import { ERROR_MESSAGES } from "../common/constants";
import { UserRoles } from "../app-constants";
import { normalizeUserId } from "../common/user.util";

type MemberAddress = {
  streetAddr1?: string | null;
  city?: string | null;
  stateCode?: string | null;
  zip?: string | null;
};

type ApplicationWithEngagement =
  Prisma.EngagementApplicationGetPayload<{
    include: { engagement: true };
  }>;

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(
    private readonly db: DbService,
    private readonly memberService: MemberService,
    private readonly engagementsService: EngagementsService,
    private readonly eventBusService: EventBusService,
  ) {}

  async create(
    engagementId: string,
    createDto: CreateApplicationDto,
    userId: string,
  ): Promise<EngagementApplication> {
    const normalizedUserId = normalizeUserId(userId) ?? userId;
    this.logger.debug("Creating application", {
      engagementId,
      userId: normalizedUserId,
    });

    const engagement = await this.engagementsService.findOne(engagementId);

    if (
      engagement.status !== EngagementStatus.OPEN ||
      engagement.applicationDeadline <= new Date()
    ) {
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

    const member = await this.memberService.getMemberByUserId(
      normalizedUserId,
    );
    if (!member) {
      throw new NotFoundException(ERROR_MESSAGES.MemberNotFound);
    }

    const memberAddress = await this.memberService.getMemberAddress(
      normalizedUserId,
    );
    const formattedAddress = this.formatAddress(memberAddress);
    const name = [member.firstName, member.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    return this.db.engagementApplication.create({
      data: {
        engagementId,
        userId: normalizedUserId,
        email: member.email ?? "",
        name,
        address: formattedAddress,
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

    if (query.engagementId && isProjectManager && !isAdmin) {
      const engagement = await this.engagementsService.findOne(
        query.engagementId,
      );
      this.assertPmEngagementAccess(engagement, authUser);
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
      this.assertPmEngagementAccess(application.engagement, authUser);
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
    const engagement = await this.engagementsService.findOne(engagementId);

    if (!this.isAdminOrPm(authUser)) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedApplicationAccess,
      );
    }

    this.assertPmEngagementAccess(engagement, authUser);

    return this.db.engagementApplication.findMany({
      where: { engagementId },
    });
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
    authUser: Record<string, any>,
  ): Promise<EngagementApplication> {
    const application = await this.findOne(id, authUser);
    const authUserId = normalizeUserId(authUser?.userId);

    if (status === ApplicationStatus.ACCEPTED) {
      await this.handleMemberAssignment(
        application,
        authUserId as string,
      );
    }

    return this.db.engagementApplication.update({
      where: { id },
      data: {
        status,
        updatedBy: authUserId,
      },
    });
  }

  private async handleMemberAssignment(
    application: ApplicationWithEngagement,
    authUserId: string,
  ): Promise<void> {
    const memberHandle =
      await this.memberService.getMemberHandleByUserId(
        application.userId,
      );
    const assignmentResult = await this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.findUnique({
        where: { id: application.engagementId },
      });

      if (!engagement) {
        throw new NotFoundException("Engagement not found.");
      }

      const engagementId = engagement.id;
      const memberId = application.userId;

      const existingAssignment =
        await tx.engagementAssignment.findUnique({
          where: {
            engagementId_memberId: {
              engagementId,
              memberId,
            },
          },
        });

      if (existingAssignment) {
        this.logger.debug(
          `Member ${memberId} already assigned to engagement ${engagementId}`,
        );
        return { assigned: false, engagement };
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

      const resolvedMemberHandle =
        memberHandle?.trim() || memberId;

      await tx.engagementAssignment.create({
        data: {
          id: nanoid(),
          engagementId,
          memberId,
          memberHandle: resolvedMemberHandle,
        },
      });

      const updatedCount = await tx.engagementAssignment.count({
        where: { engagementId },
      });

      if (updatedCount === 1) {
        await tx.engagement.update({
          where: { id: engagement.id },
          data: {
            status: EngagementStatus.ACTIVE,
            updatedBy: authUserId,
          },
        });
      }

      const updatedEngagement = await tx.engagement.findUnique({
        where: { id: engagement.id },
        include: { assignments: true },
      });

      if (!updatedEngagement) {
        throw new NotFoundException("Engagement not found.");
      }

      return { assigned: true, engagement: updatedEngagement };
    });

    if (!assignmentResult.assigned) {
      return;
    }

    const { engagement } = assignmentResult;

    this.logger.log(
      `Assigned member ${application.userId} to engagement ${engagement.id}`,
    );

    const payload: EngagementMemberAssignedPayload = {
      engagementId: engagement.id,
      memberId: application.userId,
      memberHandle: memberHandle ?? null,
      skills: engagement.requiredSkills,
      assignedAt: new Date().toISOString(),
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
      const message =
        error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to emit engagement.member.assigned event for engagement ${engagement.id}: ${message}`,
      );
    }
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

    return this.isProjectManager(authUser);
  }

  private isAdmin(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    if (authUser.isMachine) {
      return true;
    }

    const roles: string[] = authUser.roles ?? [];
    return roles.some(
      (role) => role?.toLowerCase() === UserRoles.Admin.toLowerCase(),
    );
  }

  private isProjectManager(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    const roles: string[] = authUser.roles ?? [];
    return roles.some(
      (role) =>
        role?.toLowerCase() === UserRoles.ProjectManager.toLowerCase() ||
        role?.toLowerCase() === UserRoles.TaskManager.toLowerCase(),
    );
  }

  private assertPmEngagementAccess(
    engagement: ApplicationWithEngagement["engagement"],
    authUser?: Record<string, any>,
  ): void {
    if (!authUser || this.isAdmin(authUser)) {
      return;
    }

    const authUserId = normalizeUserId(authUser?.userId);
    if (
      this.isProjectManager(authUser) &&
      engagement.createdBy !== authUserId
    ) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedApplicationAccess,
      );
    }
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
