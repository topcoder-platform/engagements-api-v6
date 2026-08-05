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
  AssignmentSource,
  AssignmentStatus,
  EngagementApplication,
  EngagementStatus,
  PaymentCycle,
  Prisma,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { MemberService } from "../integrations/member.service";
import { EventBusService } from "../integrations/event-bus.service";
import { AssignmentOfferEmailService } from "../integrations/assignment-offer-email.service";
import { ApplicationStatusEmailService } from "../integrations/application-status-email.service";
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
import {
  ACTIVE_ASSIGNMENT_STATUSES,
  ERROR_MESSAGES,
} from "../common/constants";
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
const MAX_STANDARD_HOURS_DECIMAL_PLACES = 2;

const hasAtMostDecimalPlaces = (
  value: number,
  maxDecimalPlaces: number,
): boolean => {
  const normalized = value.toString();
  if (!normalized || /e/i.test(normalized)) {
    return false;
  }

  const [, decimalPart = ""] = normalized.split(".");
  return decimalPart.length <= maxDecimalPlaces;
};

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(
    private readonly db: DbService,
    private readonly memberService: MemberService,
    private readonly engagementsService: EngagementsService,
    private readonly eventBusService: EventBusService,
    private readonly assignmentOfferEmailService: AssignmentOfferEmailService,
    private readonly applicationStatusEmailService: ApplicationStatusEmailService,
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

    const memberHandle =
      await this.memberService.getMemberHandleByUserId(normalizedUserId);

    if (!memberHandle) {
      throw new BadRequestException("Member handle not found.");
    }

    const percentComplete =
      await this.memberService.getMemberProfileCompleteness(memberHandle);

    if (percentComplete !== 1) {
      throw new BadRequestException(
        "Your profile must be 100% complete before applying.",
      );
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

  /**
   * Updates an application's status and applies related side-effects.
   *
   * Besides assignment and unassignment workflows, transitions to
   * `UNDER_REVIEW` and `REJECTED` trigger a non-blocking applicant email
   * notification.
   *
   * @param id - Application ID.
   * @param status - New application status.
   * @param authUser - Authenticated user context used for authorization and
   *   `updatedBy`.
   * @param assignmentDetails - Optional assignment details used when selecting a
   *   member.
   * @returns The updated engagement application row.
   */
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

    const updatedApplication = await this.db.engagementApplication.update({
      where: { id },
      data: {
        status,
        updatedBy: authUserId,
      },
    });

    const emailStatus =
      status === ApplicationStatus.UNDER_REVIEW
        ? "UNDER_REVIEW"
        : status === ApplicationStatus.REJECTED
          ? "REJECTED"
          : null;

    if (emailStatus) {
      try {
        void this.applicationStatusEmailService
          .sendApplicationStatusEmail({
            memberId: application.userId,
            status: emailStatus,
            engagementTitle: application.engagement.title,
          })
          .catch((error: unknown) => {
            const message =
              error instanceof Error ? error.message : "unknown error";
            this.logger.error(
              `Failed to send application status email for application ${application.id}: ${message}`,
            );
          });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "unknown error";
        this.logger.error(
          `Failed to queue application status email for application ${application.id}: ${message}`,
        );
      }
    }

    return updatedApplication;
  }

  private normalizeAssignmentDetails(details?: ApproveApplicationDto): {
    startDate?: Date;
    durationMonths?: number;
    paymentCycle?: PaymentCycle;
    ratePerHour?: string;
    standardHoursPerDay?: number;
    agreementRate?: string;
    otherRemarks?: string | null;
    wiproIdEndDate?: Date;
    candidateWiproId?: string;
    source?: AssignmentSource;
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
    const wiproIdEndDate = parseDate(details?.wiproIdEndDate);
    const durationMonths = details?.durationMonths;
    const paymentCycle = details?.paymentCycle;
    const ratePerHour = details?.ratePerHour;
    const standardHoursPerDay = details?.standardHoursPerDay;
    const agreementRate = this.calculateAgreementRate(
      ratePerHour,
      standardHoursPerDay,
      details?.agreementRate,
    );
    const otherRemarks =
      details?.otherRemarks !== undefined ? details.otherRemarks : undefined;
    const candidateWiproId =
      details?.candidateWiproId !== undefined
        ? String(details.candidateWiproId).trim() || undefined
        : undefined;
    const source = details?.source;

    return {
      startDate,
      durationMonths,
      paymentCycle,
      ratePerHour,
      standardHoursPerDay,
      agreementRate,
      otherRemarks,
      wiproIdEndDate,
      candidateWiproId,
      source,
      hasAny:
        startDate !== undefined ||
        durationMonths !== undefined ||
        paymentCycle !== undefined ||
        ratePerHour !== undefined ||
        standardHoursPerDay !== undefined ||
        agreementRate !== undefined ||
        otherRemarks !== undefined ||
        wiproIdEndDate !== undefined ||
        candidateWiproId !== undefined ||
        source !== undefined,
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

      const existingAssignment = await tx.engagementAssignment.findFirst({
        where: {
          engagementId,
          memberId,
          status: { in: ACTIVE_ASSIGNMENT_STATUSES },
        },
        orderBy: { createdAt: "desc" },
      });

      if (existingAssignment) {
        let updatedAssignment = existingAssignment;
        let shouldSendUpdatedEmail = false;
        if (normalizedAssignment.hasAny) {
          const updateData: Prisma.EngagementAssignmentUpdateInput = {};
          shouldSendUpdatedEmail = this.didAssignmentOfferDetailsChange(
            existingAssignment,
            normalizedAssignment,
          );
          if (normalizedAssignment.startDate !== undefined) {
            updateData.startDate = normalizedAssignment.startDate;
          }
          if (normalizedAssignment.durationMonths !== undefined) {
            updateData.durationMonths = normalizedAssignment.durationMonths;
          }
          if (normalizedAssignment.paymentCycle !== undefined) {
            updateData.paymentCycle = normalizedAssignment.paymentCycle;
          }
          if (normalizedAssignment.ratePerHour !== undefined) {
            updateData.ratePerHour = normalizedAssignment.ratePerHour;
          }
          if (normalizedAssignment.standardHoursPerDay !== undefined) {
            updateData.standardHoursPerDay =
              normalizedAssignment.standardHoursPerDay;
          }
          if (normalizedAssignment.agreementRate !== undefined) {
            updateData.agreementRate = normalizedAssignment.agreementRate;
          }
          if (normalizedAssignment.otherRemarks !== undefined) {
            updateData.otherRemarks = normalizedAssignment.otherRemarks;
          }
          if (normalizedAssignment.wiproIdEndDate !== undefined) {
            updateData.wiproIdEndDate = normalizedAssignment.wiproIdEndDate;
          }
          if (normalizedAssignment.candidateWiproId !== undefined) {
            updateData.candidateWiproId =
              normalizedAssignment.candidateWiproId;
          }
          if (normalizedAssignment.source !== undefined) {
            updateData.source = normalizedAssignment.source;
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
            durationMonths: updatedAssignment.durationMonths,
            paymentCycle: updatedAssignment.paymentCycle,
            ratePerHour: updatedAssignment.ratePerHour,
            standardHoursPerDay: updatedAssignment.standardHoursPerDay,
            agreementRate: updatedAssignment.agreementRate,
            otherRemarks: updatedAssignment.otherRemarks,
          },
          shouldSendUpdatedEmail,
        };
      }

      const assignmentCount = await tx.engagementAssignment.count({
        where: {
          engagementId,
          status: { in: ACTIVE_ASSIGNMENT_STATUSES },
        },
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
          ...(normalizedAssignment.durationMonths !== undefined && {
            durationMonths: normalizedAssignment.durationMonths,
          }),
          ...(normalizedAssignment.paymentCycle !== undefined && {
            paymentCycle: normalizedAssignment.paymentCycle,
          }),
          ...(normalizedAssignment.ratePerHour !== undefined && {
            ratePerHour: normalizedAssignment.ratePerHour,
          }),
          ...(normalizedAssignment.standardHoursPerDay !== undefined && {
            standardHoursPerDay: normalizedAssignment.standardHoursPerDay,
          }),
          ...(normalizedAssignment.agreementRate !== undefined && {
            agreementRate: normalizedAssignment.agreementRate,
          }),
          ...(normalizedAssignment.otherRemarks !== undefined && {
            otherRemarks: normalizedAssignment.otherRemarks,
          }),
          ...(normalizedAssignment.wiproIdEndDate !== undefined && {
            wiproIdEndDate: normalizedAssignment.wiproIdEndDate,
          }),
          ...(normalizedAssignment.candidateWiproId !== undefined && {
            candidateWiproId: normalizedAssignment.candidateWiproId,
          }),
          ...(normalizedAssignment.source !== undefined && {
            source: normalizedAssignment.source,
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
          durationMonths: assignment.durationMonths,
          paymentCycle: assignment.paymentCycle,
          ratePerHour: assignment.ratePerHour,
          standardHoursPerDay: assignment.standardHoursPerDay,
          agreementRate: assignment.agreementRate,
          otherRemarks: assignment.otherRemarks,
        },
        shouldSendUpdatedEmail: false,
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
        engagementTitle: engagement.title,
        assignmentStartDate: assignmentResult.assignment?.startDate ?? null,
        durationMonths: assignmentResult.assignment?.durationMonths ?? null,
        paymentCycle: assignmentResult.assignment?.paymentCycle ?? null,
        ratePerHour: assignmentResult.assignment?.ratePerHour ?? null,
        standardHoursPerDay:
          assignmentResult.assignment?.standardHoursPerDay ?? null,
        agreementRate: assignmentResult.assignment?.agreementRate ?? null,
        otherRemarks: assignmentResult.assignment?.otherRemarks ?? null,
      });
      return;
    }

    if (assignmentResult.shouldSendUpdatedEmail) {
      await this.assignmentOfferEmailService.sendAssignmentUpdatedEmail({
        memberId: String(application.userId),
        memberHandle: payloadMemberHandle,
        assignmentId,
        engagementId: engagement.id,
        engagementTitle: engagement.title,
        assignmentStartDate: assignmentResult.assignment?.startDate ?? null,
        durationMonths: assignmentResult.assignment?.durationMonths ?? null,
        paymentCycle: assignmentResult.assignment?.paymentCycle ?? null,
        ratePerHour: assignmentResult.assignment?.ratePerHour ?? null,
        standardHoursPerDay:
          assignmentResult.assignment?.standardHoursPerDay ?? null,
        agreementRate: assignmentResult.assignment?.agreementRate ?? null,
        otherRemarks: assignmentResult.assignment?.otherRemarks ?? null,
      });
    }
  }

  /**
   * Calculates the weekly assignment rate from the hourly rate and standard
   * hours inputs used by assignment selection forms.
   *
   * @param ratePerHour - Assignment rate per hour as a string from the request
   *   payload.
   * @param standardHoursPerDay - Standard hours per day from the request
   *   payload.
   * @param fallbackAgreementRate - Legacy per-week rate used by older clients
   *   that do not send the new hourly fields.
   * @returns The normalized weekly assignment rate string, or `undefined` when
   *   no rate fields were supplied.
   * @throws BadRequestException When only one of the required inputs is
   *   provided, or when the provided values are not positive numbers.
   */
  private calculateAgreementRate(
    ratePerHour?: string,
    standardHoursPerDay?: number,
    fallbackAgreementRate?: string,
  ): string | undefined {
    const hasRatePerHour = ratePerHour !== undefined;
    const hasStandardHours = standardHoursPerDay !== undefined;

    if (hasRatePerHour !== hasStandardHours) {
      throw new BadRequestException(
        "ratePerHour and standardHoursPerDay must be provided together.",
      );
    }

    if (hasRatePerHour && hasStandardHours) {
      const parsedRatePerHour = Number(ratePerHour);
      const parsedStandardHoursPerDay = Number(standardHoursPerDay);

      if (!Number.isFinite(parsedRatePerHour) || parsedRatePerHour <= 0) {
        throw new BadRequestException("ratePerHour must be a positive number.");
      }

      if (
        !Number.isFinite(parsedStandardHoursPerDay) ||
        parsedStandardHoursPerDay <= 0 ||
        !hasAtMostDecimalPlaces(
          parsedStandardHoursPerDay,
          MAX_STANDARD_HOURS_DECIMAL_PLACES,
        )
      ) {
        throw new BadRequestException(
          "standardHoursPerDay must be a positive number with up to 2 decimal places.",
        );
      }

      const parsedStandardHours = Number(
        (parsedStandardHoursPerDay * 5).toFixed(2),
      );
      return (parsedRatePerHour * parsedStandardHours).toFixed(2);
    }

    if (fallbackAgreementRate === undefined) {
      return undefined;
    }

    const normalizedAgreementRate = fallbackAgreementRate.trim();
    if (!normalizedAgreementRate.length) {
      return undefined;
    }

    const parsedAgreementRate = Number(normalizedAgreementRate);
    if (!Number.isFinite(parsedAgreementRate) || parsedAgreementRate <= 0) {
      throw new BadRequestException("agreementRate must be a positive number.");
    }

    return normalizedAgreementRate;
  }

  /**
   * Compares persisted assignment terms against a normalized update payload to
   * decide whether the member should receive an assignment-update email.
   *
   * @param existingAssignment - The assignment row currently stored in the
   *   database.
   * @param normalizedAssignment - The normalized request payload containing the
   *   edited assignment terms.
   * @returns `true` when at least one member-facing offer field changed,
   *   otherwise `false`.
   */
  private didAssignmentOfferDetailsChange(
    existingAssignment: {
      startDate: Date | null;
      durationMonths: number | null;
      paymentCycle: PaymentCycle | null;
      ratePerHour: string | null;
      standardHoursPerDay: number | null;
      agreementRate: string | null;
      otherRemarks: string | null;
      wiproIdEndDate: Date | null;
      candidateWiproId: string | null;
      source: AssignmentSource | null;
    },
    normalizedAssignment: {
      startDate?: Date;
      durationMonths?: number;
      paymentCycle?: PaymentCycle;
      ratePerHour?: string;
      standardHoursPerDay?: number;
      agreementRate?: string;
      otherRemarks?: string | null;
      wiproIdEndDate?: Date;
      candidateWiproId?: string;
      source?: AssignmentSource;
    },
  ): boolean {
    if (
      normalizedAssignment.startDate !== undefined &&
      normalizedAssignment.startDate.getTime() !==
        existingAssignment.startDate?.getTime()
    ) {
      return true;
    }

    if (
      normalizedAssignment.durationMonths !== undefined &&
      normalizedAssignment.durationMonths !== existingAssignment.durationMonths
    ) {
      return true;
    }

    if (
      normalizedAssignment.paymentCycle !== undefined &&
      normalizedAssignment.paymentCycle !== existingAssignment.paymentCycle
    ) {
      return true;
    }

    if (
      normalizedAssignment.ratePerHour !== undefined &&
      normalizedAssignment.ratePerHour !== existingAssignment.ratePerHour
    ) {
      return true;
    }

    if (
      normalizedAssignment.standardHoursPerDay !== undefined &&
      normalizedAssignment.standardHoursPerDay !==
        existingAssignment.standardHoursPerDay
    ) {
      return true;
    }

    if (
      normalizedAssignment.agreementRate !== undefined &&
      normalizedAssignment.agreementRate !== existingAssignment.agreementRate
    ) {
      return true;
    }

    if (
      normalizedAssignment.wiproIdEndDate !== undefined &&
      normalizedAssignment.wiproIdEndDate.getTime() !==
        existingAssignment.wiproIdEndDate?.getTime()
    ) {
      return true;
    }

    if (
      normalizedAssignment.candidateWiproId !== undefined &&
      normalizedAssignment.candidateWiproId !==
        existingAssignment.candidateWiproId
    ) {
      return true;
    }

    if (
      normalizedAssignment.source !== undefined &&
      normalizedAssignment.source !== existingAssignment.source
    ) {
      return true;
    }

    return (
      normalizedAssignment.otherRemarks !== undefined &&
      normalizedAssignment.otherRemarks !== existingAssignment.otherRemarks
    );
  }

  private async handleMemberUnassignment(
    application: ApplicationWithEngagement,
  ): Promise<void> {
    const assignment = await this.db.engagementAssignment.findFirst({
      where: {
        engagementId: application.engagementId,
        memberId: application.userId,
        status: { in: ACTIVE_ASSIGNMENT_STATUSES },
      },
      orderBy: { createdAt: "desc" },
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
