import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  Engagement,
  EngagementAssignment,
  AssignmentStatus,
  EngagementStatus,
  PaymentCycle,
  Role,
  Prisma,
  Workload,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { PrivilegedUserRoles } from "../app-constants";
import { DbService } from "../db/db.service";
import { EventBusService } from "../integrations/event-bus.service";
import { MemberService } from "../integrations/member.service";
import { ProjectService } from "../integrations/project.service";
import { SkillsService } from "../integrations/skills.service";
import { AssignmentOfferEmailService } from "../integrations/assignment-offer-email.service";
import { AssignmentOfferResponseEmailService } from "../integrations/assignment-offer-response-email.service";
import { EngagementMemberAssignedPayload } from "../integrations/types/event-bus.types";
import {
  CreateEngagementDto,
  ENGAGEMENT_SORT_FIELDS,
  AssignmentDetailsDto,
  EngagementQueryDto,
  EngagementSortBy,
  FlexiEngagementAssignmentRowDto,
  FlexiEngagementBucket,
  FlexiEngagementDetailDto,
  FlexiEngagementListItemDto,
  FlexiEngagementListQueryDto,
  FlexiEngagementListResponseDto,
  FlexiEngagementSortBy,
  FlexiEngagementSummaryDto,
  FlexiMemberBucket,
  FlexiMemberDetailDto,
  FlexiMemberHistoryDto,
  FlexiMemberHistoryItemDto,
  FlexiMemberListItemDto,
  FlexiMemberListQueryDto,
  FlexiMemberListResponseDto,
  FlexiMemberSortBy,
  FlexiMemberSummaryDto,
  FlexiSkillReferenceDto,
  PaginatedResponse,
  UpdateEngagementDto,
} from "./dto";
import {
  ACTIVE_ASSIGNMENT_STATUSES,
  ASSIGNMENT_COMPLETION_STATUSES,
  ERROR_MESSAGES,
  MY_ASSIGNMENTS_STATUSES,
} from "../common/constants";
import { getUserIdentifier, getUserRoles } from "../common/user.util";

const USER_ID_PATTERN = /^\d+$/;
const ANY_LOCATION = "Any";
const MAX_STANDARD_HOURS_DECIMAL_PLACES = 2;
const DEFAULT_PAYMENT_CYCLE = PaymentCycle.WEEKLY;
const FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV = "FLEXI_TALENT_IGNORED_PROJECT_IDS";
const FLEXI_ACTIVE_ENGAGEMENT_STATUSES: EngagementStatus[] = [
  EngagementStatus.ACTIVE,
];
const FLEXI_CLOSED_ENGAGEMENT_STATUSES: EngagementStatus[] = [
  EngagementStatus.CLOSED,
];
const FLEXI_QUALIFYING_ENGAGEMENT_STATUSES: EngagementStatus[] = [
  ...FLEXI_ACTIVE_ENGAGEMENT_STATUSES,
  ...FLEXI_CLOSED_ENGAGEMENT_STATUSES,
];

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

type ResolvedAssignmentDetails = {
  memberId: string;
  memberHandle: string;
  startDate?: Date;
  durationMonths?: number;
  paymentCycle?: PaymentCycle;
  ratePerHour?: string;
  standardHoursPerDay?: number;
  agreementRate?: string;
  otherRemarks?: string;
};

type PlannedAssignmentMutation = {
  activeAssignmentCount: number;
  assignmentsToCreate: ResolvedAssignmentDetails[];
  assignmentsToTerminate: EngagementAssignment[];
  assignmentsToUpdate: Array<{
    assignment: EngagementAssignment;
    details: ResolvedAssignmentDetails;
  }>;
};

type EngagementProjectReference = {
  id: string;
  name?: string;
};

type AssignmentContextDetail = {
  assignmentId: string;
  engagementId: string;
  projectId: string;
  billingAccountId: number | null;
  projectName?: string;
  engagementTitle: string;
  memberId: string;
  memberHandle: string;
  status: AssignmentStatus;
  agreementRate?: string | null;
  paymentCycle?: PaymentCycle | null;
  ratePerHour?: string | null;
  standardHoursPerDay?: number | null;
  durationMonths?: number | null;
  otherRemarks?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
};

type EngagementDetail = Engagement & {
  assignments?: EngagementAssignment[];
};

type FlexiAssignmentWithEngagement = EngagementAssignment & {
  engagement: Engagement;
};

type FlexiAssignmentTieRow = Pick<
  EngagementAssignment,
  "id" | "memberId" | "memberHandle"
> & {
  engagement: Pick<Engagement, "title">;
};

type FlexiEngagementListFilters = {
  bucket: FlexiEngagementBucket;
  searchText?: string;
  projectIds: string[];
  ignoredProjectIds: string[];
};

type FlexiEngagementListRow = Pick<
  Engagement,
  "id" | "projectId" | "title" | "status" | "requiredMemberCount"
> & {
  assignedMemberCount: number;
};

type FlexiEngagementListSqlRow = Pick<
  Engagement,
  "id" | "projectId" | "title" | "status" | "requiredMemberCount"
> & {
  assignedMemberCount: number | bigint | string;
};

type FlexiDurationFields = {
  durationMonths?: number | null;
  durationWeeks?: number | null;
  durationStartDate?: Date | null;
  durationEndDate?: Date | null;
  durationLabel?: string | null;
};

type FlexiTimingFields = {
  resolvedEndDate?: Date | null;
  timeLeftDays?: number | null;
  isOverdue: boolean;
};

type FlexiMemberAssignmentGroup = {
  memberId: string;
  assignments: FlexiAssignmentWithEngagement[];
};

type FlexiMemberListAssignment = Pick<
  EngagementAssignment,
  "id" | "engagementId" | "memberId" | "memberHandle" | "status"
> & {
  engagement: Pick<Engagement, "id" | "projectId" | "title">;
};

type FlexiPrimaryAssignment<
  TAssignment extends FlexiAssignmentTieRow = FlexiAssignmentWithEngagement,
> = {
  assignment: TAssignment;
  isCurrentlyAssigned: boolean;
  daysRemaining?: number | null;
  latestCompletedAt?: Date | null;
};

type FlexiMemberListPrimaryAssignment =
  FlexiPrimaryAssignment<FlexiMemberListAssignment>;

type FlexiMemberListSqlRow = {
  assignmentId: string;
  engagementId: string;
  memberId: string;
  memberHandle: string;
  status: AssignmentStatus;
  engagementProjectId: string;
  engagementTitle: string;
  isCurrentlyAssigned: boolean;
  daysRemaining: number | bigint | string | null;
  latestCompletedAt: Date | null;
};

type FlexiListPage<TRow> = {
  rows: TRow[];
  total: number;
};

@Injectable()
export class EngagementsService {
  private readonly logger = new Logger(EngagementsService.name);
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );
  private readonly flexiTalentIgnoredProjectIds =
    this.parseConfiguredProjectIds(
      process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV],
    );

  constructor(
    private readonly db: DbService,
    private readonly projectService: ProjectService,
    private readonly skillsService: SkillsService,
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly assignmentOfferEmailService: AssignmentOfferEmailService,
    private readonly assignmentOfferResponseEmailService: AssignmentOfferResponseEmailService,
  ) {}

  async create(
    createDto: CreateEngagementDto,
    authUser: Record<string, any>,
  ): Promise<Engagement> {
    const userIdentifier = getUserIdentifier(authUser);

    this.logger.debug("Creating engagement", {
      projectId: createDto.projectId,
      userId: userIdentifier,
    });

    this.assertNonBlankField(createDto.title, "title");
    this.assertNonBlankField(createDto.description, "description");
    this.assertNonEmptyArrayField(createDto.timeZones, "timeZones");
    this.assertNonEmptyArrayField(createDto.countries, "countries");
    this.assertNonEmptyArrayField(createDto.requiredSkills, "requiredSkills");

    await this.assertProjectExists(createDto.projectId);
    await this.assertSkillsValid(createDto.requiredSkills);

    const {
      durationValidation,
      assignedMemberId,
      assignedMemberHandle,
      assignedMemberIds,
      assignedMemberHandles,
      assignmentDetails,
      ...payload
    } = createDto;
    void durationValidation;

    const assignmentDetailsPayload =
      Array.isArray(assignmentDetails) && assignmentDetails.length
        ? assignmentDetails
        : undefined;
    let assignmentDetailsList: ResolvedAssignmentDetails[] = [];

    if (payload.isPrivate) {
      if (assignmentDetailsPayload) {
        assignmentDetailsList = await this.resolveAssignmentDetailsList(
          assignmentDetailsPayload,
        );
      } else if (assignedMemberIds?.length || assignedMemberHandles?.length) {
        const resolved = await this.resolveMultipleAssignmentDetails(
          assignedMemberIds,
          assignedMemberHandles,
        );
        assignmentDetailsList = resolved.map((details) => ({ ...details }));
      } else if (assignedMemberId || assignedMemberHandle) {
        const singleAssignment = await this.resolveAssignmentDetails(
          assignedMemberId,
          assignedMemberHandle,
        );
        if (singleAssignment) {
          assignmentDetailsList = [{ ...singleAssignment }];
        }
      }

      if (
        payload.requiredMemberCount !== undefined &&
        assignmentDetailsList.length > payload.requiredMemberCount
      ) {
        throw new BadRequestException(
          `Cannot assign ${assignmentDetailsList.length} members when requiredMemberCount is ${payload.requiredMemberCount}.`,
        );
      }
    }

    const engagementWithAssignments = await this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.create({
        data: {
          id: nanoid(),
          ...payload,
          durationStartDate: this.normalizeDate(payload.durationStartDate),
          durationEndDate: this.normalizeDate(payload.durationEndDate),
          createdBy: userIdentifier,
        },
      });

      if (createDto.isPrivate && assignmentDetailsList.length > 0) {
        await Promise.all(
          assignmentDetailsList.map((details) => {
            const assignmentData: Prisma.EngagementAssignmentUncheckedCreateInput =
              {
                id: nanoid(),
                engagementId: engagement.id,
                memberId: details.memberId,
                memberHandle: details.memberHandle,
              };
            if (details.startDate !== undefined) {
              assignmentData.startDate = details.startDate;
            }
            if (details.durationMonths !== undefined) {
              assignmentData.durationMonths = details.durationMonths;
            }
            if (details.ratePerHour !== undefined) {
              assignmentData.ratePerHour = details.ratePerHour;
            }
            assignmentData.paymentCycle =
              details.paymentCycle ?? DEFAULT_PAYMENT_CYCLE;
            if (details.standardHoursPerDay !== undefined) {
              assignmentData.standardHoursPerDay = details.standardHoursPerDay;
            }
            if (details.agreementRate !== undefined) {
              assignmentData.agreementRate = details.agreementRate;
            }
            if (details.otherRemarks !== undefined) {
              assignmentData.otherRemarks = details.otherRemarks;
            }
            return tx.engagementAssignment.create({
              data: assignmentData,
            });
          }),
        );

        const assignmentCount = await tx.engagementAssignment.count({
          where: {
            engagementId: engagement.id,
            status: { in: ACTIVE_ASSIGNMENT_STATUSES },
          },
        });

        if (!assignmentCount) {
          throw new BadRequestException(
            "Private engagements must have at least one assigned member",
          );
        }

        if (
          payload.requiredMemberCount !== undefined &&
          assignmentCount > payload.requiredMemberCount
        ) {
          throw new BadRequestException(
            "Assigned member count exceeds required member count.",
          );
        }
      }

      const createdEngagementWithAssignments = await tx.engagement.findUnique({
        where: { id: engagement.id },
        include: { assignments: true },
      });

      if (!createdEngagementWithAssignments) {
        throw new NotFoundException("Engagement not found.");
      }

      return createdEngagementWithAssignments;
    });

    await this.emitMemberAssignedEvents(engagementWithAssignments);
    await this.sendAssignmentOfferEmails(
      engagementWithAssignments,
      engagementWithAssignments.assignments,
    );

    const engagementWithFields = this.applyAssignmentFields(
      engagementWithAssignments,
    );
    const [hydrated] = await this.hydrateCreatorEmails([engagementWithFields]);
    return (
      hydrated ?? {
        ...engagementWithFields,
        createdByEmail: null,
      }
    );
  }

  private async emitMemberAssignedEvents(engagement: {
    id: string;
    isPrivate: boolean;
    requiredSkills: string[];
    assignments?: EngagementAssignment[];
  }): Promise<void> {
    if (!engagement.isPrivate || !engagement.assignments?.length) {
      return;
    }

    const skills = engagement.requiredSkills.map((skillId) => ({
      id: skillId,
    }));
    const assignments = engagement.assignments;

    const results = await Promise.allSettled(
      assignments.map((assignment) => {
        const payload: EngagementMemberAssignedPayload = {
          engagementId: engagement.id,
          assignmentId: assignment.id,
          memberId: Number(assignment.memberId),
          memberHandle: assignment.memberHandle,
          skills,
        };

        return this.eventBusService.postEvent(
          "engagement.member.assigned",
          payload,
        );
      }),
    );

    results.forEach((result, index) => {
      const assignment = assignments[index];
      if (result.status === "fulfilled") {
        this.logger.log(
          `Emitted engagement.member.assigned event for engagement ${engagement.id} (assignment ${assignment.id})`,
        );
        return;
      }

      const message =
        result.reason instanceof Error
          ? result.reason.message
          : "unknown error";
      this.logger.error(
        `Failed to emit engagement.member.assigned event for engagement ${engagement.id} (assignment ${assignment.id}): ${message}`,
      );
    });
  }

  private async sendAssignmentOfferEmails(
    engagement: Engagement,
    assignments?: EngagementAssignment[],
  ): Promise<void> {
    if (!assignments?.length) {
      return;
    }

    await this.assignmentOfferEmailService.sendAssignmentOfferEmails(
      assignments.map((assignment) => ({
        memberId: String(assignment.memberId),
        memberHandle: assignment.memberHandle,
        assignmentId: assignment.id,
        engagementId: assignment.engagementId,
        engagementTitle: engagement.title,
        assignmentStartDate: assignment.startDate ?? null,
        durationMonths: assignment.durationMonths ?? null,
        paymentCycle: assignment.paymentCycle ?? DEFAULT_PAYMENT_CYCLE,
        ratePerHour: assignment.ratePerHour ?? null,
        standardHoursPerDay: assignment.standardHoursPerDay ?? null,
        agreementRate: assignment.agreementRate ?? null,
        otherRemarks: assignment.otherRemarks ?? null,
      })),
    );
  }

  /**
   * Sends assignment-update emails for existing assignments whose member-facing
   * terms changed during an engagement edit.
   *
   * @param engagement - Engagement owning the updated assignments.
   * @param assignments - Existing assignments with changed offer details.
   * @returns A promise that resolves after all update email publish attempts
   *   settle.
   */
  private async sendAssignmentUpdatedEmails(
    engagement: Engagement,
    assignments?: EngagementAssignment[],
  ): Promise<void> {
    if (!assignments?.length) {
      return;
    }

    await this.assignmentOfferEmailService.sendAssignmentUpdatedEmails(
      assignments.map((assignment) => ({
        memberId: String(assignment.memberId),
        memberHandle: assignment.memberHandle,
        assignmentId: assignment.id,
        engagementId: assignment.engagementId,
        engagementTitle: engagement.title,
        assignmentStartDate: assignment.startDate ?? null,
        durationMonths: assignment.durationMonths ?? null,
        paymentCycle: assignment.paymentCycle ?? DEFAULT_PAYMENT_CYCLE,
        ratePerHour: assignment.ratePerHour ?? null,
        standardHoursPerDay: assignment.standardHoursPerDay ?? null,
        agreementRate: assignment.agreementRate ?? null,
        otherRemarks: assignment.otherRemarks ?? null,
      })),
    );
  }

  /**
   * Compares assignment fields that are exposed in member-facing offer screens
   * to determine whether an update email should be sent.
   *
   * @param previousAssignment - Persisted assignment values before the update.
   * @param nextAssignment - Assignment values after the update completes.
   * @returns `true` when any offer-detail field changed; otherwise `false`.
   */
  private didAssignmentOfferDetailsChange(
    previousAssignment: {
      startDate: Date | null;
      durationMonths: number | null;
      paymentCycle: PaymentCycle | null;
      ratePerHour: string | null;
      standardHoursPerDay: number | null;
      agreementRate: string | null;
      otherRemarks: string | null;
    },
    nextAssignment: {
      startDate: Date | null;
      durationMonths: number | null;
      paymentCycle: PaymentCycle | null;
      ratePerHour: string | null;
      standardHoursPerDay: number | null;
      agreementRate: string | null;
      otherRemarks: string | null;
    },
  ): boolean {
    return (
      previousAssignment.startDate?.getTime() !==
        nextAssignment.startDate?.getTime() ||
      previousAssignment.durationMonths !== nextAssignment.durationMonths ||
      previousAssignment.paymentCycle !== nextAssignment.paymentCycle ||
      previousAssignment.ratePerHour !== nextAssignment.ratePerHour ||
      previousAssignment.standardHoursPerDay !==
        nextAssignment.standardHoursPerDay ||
      previousAssignment.agreementRate !== nextAssignment.agreementRate ||
      previousAssignment.otherRemarks !== nextAssignment.otherRemarks
    );
  }

  /**
   * Lists engagements with pagination and filters.
   * Public/non-includePrivate feeds always exclude ON_HOLD, including explicit status filters.
   * Supports `projectId` and `projectIds` project filtering.
   * When both are provided, `projectIds` takes precedence.
   */
  async findAll(
    query: EngagementQueryDto,
  ): Promise<PaginatedResponse<Engagement>> {
    const projectScope = this.resolveProjectScope(query);

    this.logger.debug("Listing engagements", {
      projectId: query.projectId,
      projectIds: query.projectIds,
      scopedProjectId: projectScope.projectId,
      scopedProjectIds: projectScope.projectIds,
      status: query.status,
      search: query.search,
    });

    if (projectScope.isEmpty) {
      return this.emptyPaginatedResponse(query.page, query.perPage);
    }

    const isPublicFeed = query.includePrivate !== true;
    const where: Prisma.EngagementWhereInput = query.includePrivate
      ? {}
      : { isPrivate: false };
    const andFilters: Prisma.EngagementWhereInput[] = [];

    if (projectScope.projectId) {
      where.projectId = projectScope.projectId;
    }
    if (projectScope.projectIds?.length) {
      where.projectId = { in: projectScope.projectIds };
    }

    if (query.status) {
      andFilters.push({ status: query.status });
    }
    if (isPublicFeed) {
      andFilters.push({ status: { notIn: [EngagementStatus.ON_HOLD] } });
    }

    if (query.search) {
      andFilters.push({
        OR: [
          {
            title: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    if (query.requiredSkills?.length) {
      andFilters.push({ requiredSkills: { hasSome: query.requiredSkills } });
    }

    const locationFilters: Prisma.EngagementWhereInput[] = [];
    const hasLocationFilter = Boolean(
      query.countries?.length || query.timeZones?.length,
    );
    if (query.countries?.length) {
      locationFilters.push({ countries: { hasSome: query.countries } });
    }
    if (query.timeZones?.length) {
      locationFilters.push({ timeZones: { hasSome: query.timeZones } });
    }
    if (hasLocationFilter) {
      locationFilters.push({ countries: { has: ANY_LOCATION } });
      locationFilters.push({ timeZones: { has: ANY_LOCATION } });
    }
    if (locationFilters.length === 1) {
      andFilters.push(locationFilters[0]);
    }
    if (locationFilters.length > 1) {
      andFilters.push({ OR: locationFilters });
    }

    if (andFilters.length) {
      where.AND = andFilters;
    }

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;

    const sortBy = ENGAGEMENT_SORT_FIELDS.includes(query.sortBy)
      ? query.sortBy
      : EngagementSortBy.CreatedAt;

    const orderBy: Prisma.EngagementOrderByWithRelationInput = {
      [sortBy]: query.sortOrder,
    };
    const includeAssignments = query.includePrivate === true;

    const [data, totalCount] = await Promise.all([
      this.db.engagement.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
        include: includeAssignments
          ? {
              _count: {
                select: {
                  applications: true,
                },
              },
              assignments: true,
            }
          : {
              _count: {
                select: {
                  applications: true,
                },
              },
            },
      }),
      this.db.engagement.count({ where }),
    ]);

    const totalPages = totalCount ? Math.ceil(totalCount / perPage) : 0;
    const engagements = data.map(({ _count, ...engagement }) => {
      const engagementWithCount = {
        ...engagement,
        applicationsCount: _count.applications,
      } as Engagement & {
        assignments?: EngagementAssignment[];
        applicationsCount: number;
      };

      return includeAssignments
        ? this.applyAssignmentFields(engagementWithCount)
        : engagementWithCount;
    });
    const hydratedEngagements = await this.hydrateCreatorEmails(engagements);
    const hydratedEngagementsWithProjectDetails =
      await this.hydrateProjectDetails(hydratedEngagements);

    return {
      data: hydratedEngagementsWithProjectDetails,
      meta: {
        page,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }

  async findMyAssignments(
    authUser: Record<string, any>,
    query: EngagementQueryDto,
  ): Promise<PaginatedResponse<Engagement>> {
    const userIdentifier = getUserIdentifier(authUser);
    this.logger.debug("Listing assigned engagements", {
      userId: userIdentifier,
      projectId: query.projectId,
      status: query.status,
      search: query.search,
    });

    const where: Prisma.EngagementWhereInput = {
      assignments: {
        some: {
          memberId: userIdentifier,
          status: { in: MY_ASSIGNMENTS_STATUSES },
        },
      },
    };
    const andFilters: Prisma.EngagementWhereInput[] = [];

    if (query.projectId) {
      where.projectId = query.projectId;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      andFilters.push({
        OR: [
          {
            title: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    if (query.requiredSkills?.length) {
      andFilters.push({ requiredSkills: { hasSome: query.requiredSkills } });
    }

    const locationFilters: Prisma.EngagementWhereInput[] = [];
    const hasLocationFilter = Boolean(
      query.countries?.length || query.timeZones?.length,
    );
    if (query.countries?.length) {
      locationFilters.push({ countries: { hasSome: query.countries } });
    }
    if (query.timeZones?.length) {
      locationFilters.push({ timeZones: { hasSome: query.timeZones } });
    }
    if (hasLocationFilter) {
      locationFilters.push({ countries: { has: ANY_LOCATION } });
      locationFilters.push({ timeZones: { has: ANY_LOCATION } });
    }
    if (locationFilters.length === 1) {
      andFilters.push(locationFilters[0]);
    }
    if (locationFilters.length > 1) {
      andFilters.push({ OR: locationFilters });
    }

    if (andFilters.length) {
      where.AND = andFilters;
    }

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;

    const sortBy = ENGAGEMENT_SORT_FIELDS.includes(query.sortBy)
      ? query.sortBy
      : EngagementSortBy.CreatedAt;

    const orderBy: Prisma.EngagementOrderByWithRelationInput = {
      [sortBy]: query.sortOrder,
    };

    const [data, totalCount] = await Promise.all([
      this.db.engagement.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
          assignments: {
            where: {
              memberId: userIdentifier,
              status: { in: MY_ASSIGNMENTS_STATUSES },
            },
          },
        },
      }),
      this.db.engagement.count({ where }),
    ]);

    const totalPages = totalCount ? Math.ceil(totalCount / perPage) : 0;
    const engagements = data.map(({ _count, ...engagement }) =>
      this.applyAssignmentFields({
        ...engagement,
        applicationsCount: _count.applications,
      }),
    );
    const hydratedEngagements = await this.hydrateCreatorEmails(engagements);
    const hydratedEngagementsWithProjectDetails =
      await this.hydrateProjectDetails(hydratedEngagements);

    return {
      data: hydratedEngagementsWithProjectDetails,
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
    options: {
      includeCreatorEmail?: boolean;
      includeAssignments?: boolean;
      assignmentMemberId?: string;
    } = {},
  ): Promise<EngagementDetail> {
    const engagement = await this.db.engagement.findUnique({
      where: { id },
      include: {
        assignments: options.assignmentMemberId
          ? {
              where: {
                memberId: options.assignmentMemberId,
                status: { in: ACTIVE_ASSIGNMENT_STATUSES },
              },
            }
          : true,
      },
    });
    if (!engagement) {
      throw new NotFoundException("Engagement not found.");
    }

    this.logger.debug("Raw engagement", engagement);
    const includeAssignments = options.includeAssignments !== false;

    const engagementWithFields = includeAssignments
      ? this.applyAssignmentFields(engagement)
      : (() => {
          const { assignments, ...rest } = engagement;
          void assignments;
          return rest;
        })();

    const normalizedEngagement = {
      ...engagementWithFields,
      role: engagementWithFields.role
        ? (engagementWithFields.role.toString() as Role)
        : null,
      workload: engagementWithFields.workload
        ? (engagementWithFields.workload.toString() as Workload)
        : null,
      compensationRange: engagementWithFields.compensationRange ?? null,
    };

    if (!options.includeCreatorEmail) {
      return normalizedEngagement;
    }

    const [hydrated] = await this.hydrateCreatorEmails([normalizedEngagement]);
    return (
      hydrated ?? {
        ...normalizedEngagement,
        createdByEmail: null,
      }
    );
  }

  async findAssignmentContext(
    assignmentId: string,
  ): Promise<AssignmentContextDetail> {
    const assignment = await this.db.engagementAssignment.findUnique({
      where: { id: assignmentId },
      include: {
        engagement: true,
      },
    });

    if (!assignment) {
      throw new NotFoundException("Engagement assignment not found.");
    }

    const projectId = assignment.engagement.projectId;
    let projectName: string | undefined;

    try {
      const projectNames = await this.projectService.getProjectNamesByIds([
        projectId,
      ]);
      projectName = this.normalizeProjectName(projectNames.get(projectId));
    } catch (error) {
      this.logger.warn("Failed to hydrate assignment project name.", {
        assignmentId,
        error: error instanceof Error ? error.message : error,
      });
    }

    const billingAccountId =
      await this.projectService.getProjectBillingAccountId(projectId);

    return {
      assignmentId: assignment.id,
      engagementId: assignment.engagementId,
      projectId,
      billingAccountId,
      projectName,
      engagementTitle: assignment.engagement.title,
      memberId: assignment.memberId,
      memberHandle: assignment.memberHandle,
      status: assignment.status,
      agreementRate: assignment.agreementRate,
      paymentCycle: assignment.paymentCycle,
      ratePerHour: assignment.ratePerHour,
      standardHoursPerDay: assignment.standardHoursPerDay,
      durationMonths: assignment.durationMonths,
      otherRemarks: assignment.otherRemarks,
      startDate: assignment.startDate,
      endDate: assignment.endDate,
    };
  }

  /**
   * Returns Flexi Talent engagement bucket counts.
   *
   * Counts are independent of list filters: total counts ACTIVE and CLOSED
   * engagements, active counts ACTIVE, and closed counts CLOSED.
   *
   * @returns Engagement summary counts for the Flexi Talent dashboard.
   */
  async getFlexiEngagementSummary(): Promise<FlexiEngagementSummaryDto> {
    this.logger.debug("Getting Flexi engagement summary");

    const totalWhere = this.buildFlexiEngagementWhere({
      bucket: FlexiEngagementBucket.Total,
      projectIds: [],
      ignoredProjectIds: this.flexiTalentIgnoredProjectIds,
    });
    const activeWhere = this.buildFlexiEngagementWhere({
      bucket: FlexiEngagementBucket.Active,
      projectIds: [],
      ignoredProjectIds: this.flexiTalentIgnoredProjectIds,
    });
    const closedWhere = this.buildFlexiEngagementWhere({
      bucket: FlexiEngagementBucket.Closed,
      projectIds: [],
      ignoredProjectIds: this.flexiTalentIgnoredProjectIds,
    });
    const [total, active, closed] = await Promise.all([
      this.db.engagement.count({ where: totalWhere }),
      this.db.engagement.count({ where: activeWhere }),
      this.db.engagement.count({ where: closedWhere }),
    ]);

    return { total, active, closed };
  }

  /**
   * Lists Flexi Talent engagements with database-paged member counts.
   *
   * The method applies Flexi bucket/search rules once, lets Prisma page simple
   * name sorting, and isolates aggregate member-count sorting in a
   * parameterized SQL helper so only page rows are hydrated with project names.
   *
   * @param query Flexi engagement list filters, sorting, and pagination.
   * @returns Flat body-paginated engagement list response.
   */
  async getFlexiEngagementList(
    query: FlexiEngagementListQueryDto,
  ): Promise<FlexiEngagementListResponseDto> {
    this.logger.debug("Listing Flexi engagements", {
      bucket: query.bucket,
      searchText: query.searchText,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;
    const filters = await this.resolveFlexiEngagementListFilters(query);
    const { rows: pagedEngagements, total } =
      query.sortBy === FlexiEngagementSortBy.MemberCount
        ? await this.getFlexiEngagementRowsSortedByMemberCount(
            filters,
            query.sortOrder,
            skip,
            perPage,
          )
        : await this.getFlexiEngagementRowsSortedByName(
            filters,
            query.sortOrder,
            skip,
            perPage,
          );
    const projectNamesById = await this.getFlexiProjectNames(
      pagedEngagements.map((engagement) => engagement.projectId),
    );
    const data = pagedEngagements.map((engagement) =>
      this.buildFlexiEngagementListItem(engagement, projectNamesById),
    );

    return {
      data,
      page,
      perPage,
      total,
      totalPages: total ? Math.ceil(total / perPage) : 0,
    };
  }

  /**
   * Gets a Flexi Talent engagement detail payload.
   *
   * The method returns one engagement with all assignments, project name, skill
   * names, active assigned-member count, and assignment timing derivations while
   * omitting payment fields.
   *
   * @param engagementId Engagement id to fetch.
   * @returns Flexi engagement detail read model.
   * @throws {NotFoundException} If the engagement does not exist or is not
   * ACTIVE or CLOSED for Flexi Talent display.
   */
  async getFlexiEngagementDetail(
    engagementId: string,
  ): Promise<FlexiEngagementDetailDto> {
    this.logger.debug("Getting Flexi engagement detail", { engagementId });

    const engagement = await this.db.engagement.findUnique({
      where: { id: engagementId },
      include: { assignments: true },
    });

    if (!engagement) {
      throw new NotFoundException("Engagement not found.");
    }
    if (this.isFlexiTalentProjectIgnored(engagement.projectId)) {
      throw new NotFoundException("Engagement not found.");
    }
    if (!FLEXI_QUALIFYING_ENGAGEMENT_STATUSES.includes(engagement.status)) {
      throw new NotFoundException("Engagement not found.");
    }

    const [projectNamesById, skillNamesById] = await Promise.all([
      this.getFlexiProjectNames([engagement.projectId]),
      this.getFlexiSkillNames(engagement.requiredSkills),
    ]);
    const projectName = this.normalizeProjectName(
      projectNamesById.get(engagement.projectId),
    );
    const skills = this.buildFlexiSkillReferences(
      engagement.requiredSkills,
      skillNamesById,
    );
    const duration = this.resolveFlexiDuration(undefined, engagement);
    const assignedMemberCount = this.countCurrentFlexiAssignments(
      engagement.assignments,
    );

    return {
      engagementId: engagement.id,
      projectId: engagement.projectId,
      ...(projectName ? { projectName } : {}),
      engagementTitle: engagement.title,
      description: engagement.description,
      status: engagement.status,
      requiredMemberCount: engagement.requiredMemberCount,
      assignedMemberCount,
      skills,
      ...duration,
      assignments: engagement.assignments.map((assignment) =>
        this.buildFlexiEngagementAssignmentRow(assignment, engagement),
      ),
    };
  }

  /**
   * Returns assignment-centric Flexi Talent member bucket counts.
   *
   * Members are keyed by memberId across current and completion assignment
   * statuses. Completed members have completion-status assignments and no
   * current assignment.
   *
   * @returns Unique member counts for total, assigned, and completed buckets.
   */
  async getFlexiMemberSummary(): Promise<FlexiMemberSummaryDto> {
    this.logger.debug("Getting Flexi member summary");

    const assignments = await this.db.engagementAssignment.findMany({
      where: {
        status: { in: this.getFlexiQualifyingAssignmentStatuses() },
        ...this.buildFlexiTalentAssignmentEngagementWhere(),
      },
      select: {
        memberId: true,
        status: true,
      },
    });
    const membersById = new Map<
      string,
      { hasCurrent: boolean; hasCompletion: boolean }
    >();

    assignments.forEach((assignment) => {
      const state = membersById.get(assignment.memberId) ?? {
        hasCurrent: false,
        hasCompletion: false,
      };

      if (ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status)) {
        state.hasCurrent = true;
      }
      if (ASSIGNMENT_COMPLETION_STATUSES.includes(assignment.status)) {
        state.hasCompletion = true;
      }

      membersById.set(assignment.memberId, state);
    });

    let assignedMembers = 0;
    let completedMembers = 0;
    membersById.forEach((state) => {
      if (state.hasCurrent) {
        assignedMembers += 1;
        return;
      }

      if (state.hasCompletion) {
        completedMembers += 1;
      }
    });

    return {
      totalUniqueMembers: membersById.size,
      assignedMembers,
      completedMembers,
    };
  }

  /**
   * Lists Flexi Talent members with database-ranked primary assignments.
   *
   * The method searches member handles, applies assignment-centric buckets, and
   * delegates primary-row selection, sorting, counting, and paging to a
   * list-specific SQL helper that mirrors the existing comparator semantics.
   *
   * @param query Flexi member list filters, sorting, and pagination.
   * @returns Flat body-paginated member list response.
   */
  async getFlexiMemberList(
    query: FlexiMemberListQueryDto,
  ): Promise<FlexiMemberListResponseDto> {
    this.logger.debug("Listing Flexi members", {
      bucket: query.bucket,
      searchText: query.searchText,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    const page = query.page;
    const perPage = query.perPage;
    const { rows: pagedRows, total } =
      await this.getPagedFlexiMemberListRows(query);
    const projectNamesById = await this.getFlexiProjectNames(
      pagedRows.map((row) => row.assignment.engagement.projectId),
    );
    const data = pagedRows.map((row) =>
      this.buildFlexiMemberListItem(row, projectNamesById),
    );

    return {
      data,
      page,
      perPage,
      total,
      totalPages: total ? Math.ceil(total / perPage) : 0,
    };
  }

  /**
   * Gets the Flexi Talent member right-rail detail payload.
   *
   * The method fetches all qualifying assignment history for a member, reuses
   * the member-list primary assignment selection, and enriches the chosen
   * assignment with project and skill names plus duration/timing derivations.
   *
   * @param memberId Member id whose detail should be returned.
   * @returns Flexi member detail read model.
   * @throws {NotFoundException} If the member has no qualifying assignment
   * history.
   */
  async getFlexiMemberDetail(memberId: string): Promise<FlexiMemberDetailDto> {
    this.logger.debug("Getting Flexi member detail", { memberId });

    const assignments = await this.getFlexiAssignmentsWithEngagements({
      memberId,
    });
    const primary = this.selectFlexiPrimaryAssignment(assignments);

    if (!primary) {
      throw new NotFoundException("Member assignment history not found.");
    }

    const assignment = primary.assignment;
    const engagement = assignment.engagement;
    const [projectNamesById, skillNamesById] = await Promise.all([
      this.getFlexiProjectNames([engagement.projectId]),
      this.getFlexiSkillNames(engagement.requiredSkills),
    ]);
    const projectName = this.normalizeProjectName(
      projectNamesById.get(engagement.projectId),
    );
    const timing = this.resolveFlexiTiming(assignment);

    return {
      memberId: assignment.memberId,
      handle: assignment.memberHandle,
      isCurrentlyAssigned: primary.isCurrentlyAssigned,
      assignmentId: assignment.id,
      projectId: engagement.projectId,
      ...(projectName ? { projectName } : {}),
      engagementId: engagement.id,
      engagementTitle: engagement.title,
      description: engagement.description,
      status: assignment.status,
      displayStatusLabel: this.getAssignmentDisplayStatusLabel(
        assignment.status,
      ),
      skills: this.buildFlexiSkillReferences(
        engagement.requiredSkills,
        skillNamesById,
      ),
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      ...timing,
      ...this.resolveFlexiDuration(assignment, engagement),
    };
  }

  /**
   * Gets the full unpaginated Flexi Talent assignment history for a member.
   *
   * Current assignments are ordered first by soonest ending assignment. Past
   * assignments follow newest first by resolved completion timestamp, with
   * project and skill names hydrated tolerantly.
   *
   * @param memberId Member id whose history should be returned.
   * @returns Flexi member history response.
   * @throws {NotFoundException} If the member has no qualifying assignment
   * history.
   */
  async getFlexiMemberHistory(
    memberId: string,
  ): Promise<FlexiMemberHistoryDto> {
    this.logger.debug("Getting Flexi member history", { memberId });

    const assignments = await this.getFlexiAssignmentsWithEngagements({
      memberId,
    });

    if (!assignments.length) {
      throw new NotFoundException("Member assignment history not found.");
    }

    const projectNamesById = await this.getFlexiProjectNames(
      assignments.map((assignment) => assignment.engagement.projectId),
    );
    const skillNamesById = await this.getFlexiSkillNames(
      assignments.flatMap((assignment) => assignment.engagement.requiredSkills),
    );
    const data = assignments
      .map((assignment) =>
        this.buildFlexiMemberHistoryItem(
          assignment,
          projectNamesById,
          skillNamesById,
        ),
      )
      .sort((left, right) => this.compareFlexiMemberHistoryRows(left, right));

    return {
      memberId,
      handle: assignments[0].memberHandle,
      data,
    };
  }

  async update(
    id: string,
    updateDto: UpdateEngagementDto,
    authUser: Record<string, any>,
  ): Promise<Engagement> {
    const userIdentifier = getUserIdentifier(authUser);
    this.logger.debug("Updating engagement", {
      id,
      userId: userIdentifier,
    });

    if (updateDto.title !== undefined) {
      this.assertNonBlankField(updateDto.title, "title");
    }
    if (updateDto.description !== undefined) {
      this.assertNonBlankField(updateDto.description, "description");
    }
    if (updateDto.timeZones !== undefined) {
      this.assertNonEmptyArrayField(updateDto.timeZones, "timeZones");
    }
    if (updateDto.countries !== undefined) {
      this.assertNonEmptyArrayField(updateDto.countries, "countries");
    }
    if (updateDto.requiredSkills !== undefined) {
      this.assertNonEmptyArrayField(updateDto.requiredSkills, "requiredSkills");
    }

    const existingEngagement = await this.findOne(id);

    if (updateDto.projectId) {
      const normalizedCurrentProjectId = this.normalizeProjectId(
        existingEngagement.projectId,
      );
      const normalizedUpdatedProjectId = this.normalizeProjectId(
        updateDto.projectId,
      );

      if (
        normalizedUpdatedProjectId &&
        normalizedUpdatedProjectId !== normalizedCurrentProjectId
      ) {
        await this.assertProjectReassignmentAllowed(
          existingEngagement.projectId,
        );
      }

      await this.assertProjectExists(updateDto.projectId);
    }

    if (updateDto.requiredSkills) {
      await this.assertSkillsValid(updateDto.requiredSkills);
    }

    const { durationValidation, assignmentDetails, ...payload } = updateDto;
    void durationValidation;

    const assignedMemberId = payload.assignedMemberId?.trim();
    if (payload.assignedMemberId !== undefined && !assignedMemberId) {
      throw new BadRequestException("Assigned member ID cannot be blank.");
    }

    const assignedMemberHandle = payload.assignedMemberHandle?.trim();
    if (payload.assignedMemberHandle !== undefined && !assignedMemberHandle) {
      throw new BadRequestException("Assigned member handle cannot be blank.");
    }

    const assignmentDetailsPayload =
      Array.isArray(assignmentDetails) && assignmentDetails.length
        ? assignmentDetails
        : undefined;
    const hasAssignmentArrayPayload =
      Boolean(assignmentDetailsPayload) ||
      Array.isArray(payload.assignedMemberIds) ||
      Array.isArray(payload.assignedMemberHandles);
    const assignmentDetailsList: ResolvedAssignmentDetails[] =
      assignmentDetailsPayload
        ? await this.resolveAssignmentDetailsList(assignmentDetailsPayload, {
            allowDuplicateMembers: true,
          })
        : hasAssignmentArrayPayload
          ? await this.resolveMultipleAssignmentDetails(
              payload.assignedMemberIds,
              payload.assignedMemberHandles,
              {
                allowDuplicateMembers: true,
              },
            )
          : [];

    const existingAssignments =
      (existingEngagement as { assignments?: EngagementAssignment[] })
        .assignments ?? [];
    const activeAssignmentCount = existingAssignments.filter((assignment) =>
      ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
    ).length;
    const assignmentMutationPlan =
      assignmentDetailsList.length > 0
        ? this.planAssignmentMutation(
            existingAssignments,
            assignmentDetailsList,
          )
        : undefined;
    const requiredMemberCount =
      payload.requiredMemberCount ??
      existingEngagement.requiredMemberCount ??
      undefined;

    if (payload.requiredMemberCount !== undefined) {
      const assignmentCountForValidation =
        assignmentMutationPlan?.activeAssignmentCount ?? activeAssignmentCount;

      if (assignmentCountForValidation > payload.requiredMemberCount) {
        throw new BadRequestException(
          "Assigned member count exceeds required member count.",
        );
      }
    }

    const shouldUpsertAssignment =
      !hasAssignmentArrayPayload &&
      (payload.assignedMemberId !== undefined ||
        payload.assignedMemberHandle !== undefined);
    const assignmentDetailsResult = shouldUpsertAssignment
      ? await this.resolveAssignmentDetails(
          assignedMemberId,
          assignedMemberHandle,
        )
      : null;

    const data: Prisma.EngagementUpdateInput = {
      updatedBy: userIdentifier,
    };

    if (payload.projectId !== undefined) {
      data.projectId = payload.projectId;
    }
    if (payload.title !== undefined) {
      data.title = payload.title;
    }
    if (payload.description !== undefined) {
      data.description = payload.description;
    }
    if (payload.durationStartDate !== undefined) {
      data.durationStartDate = this.normalizeDate(payload.durationStartDate);
    }
    if (payload.durationEndDate !== undefined) {
      data.durationEndDate = this.normalizeDate(payload.durationEndDate);
    }
    if (payload.durationWeeks !== undefined) {
      data.durationWeeks = payload.durationWeeks;
    }
    if (payload.durationMonths !== undefined) {
      data.durationMonths = payload.durationMonths;
    }
    if (payload.timeZones !== undefined) {
      data.timeZones = payload.timeZones;
    }
    if (payload.countries !== undefined) {
      data.countries = payload.countries;
    }
    if (payload.requiredSkills !== undefined) {
      data.requiredSkills = payload.requiredSkills;
    }
    if (payload.anticipatedStart !== undefined) {
      data.anticipatedStart = payload.anticipatedStart;
    }
    if (payload.status !== undefined) {
      data.status = payload.status;
    }
    if (payload.role !== undefined) {
      data.role = payload.role;
    }
    if (payload.workload !== undefined) {
      data.workload = payload.workload;
    }
    if (payload.compensationRange !== undefined) {
      data.compensationRange = payload.compensationRange;
    }
    if (payload.isPrivate !== undefined) {
      data.isPrivate = payload.isPrivate;
    }
    if (payload.requiredMemberCount !== undefined) {
      data.requiredMemberCount = payload.requiredMemberCount;
    }

    const updatedEngagement = await this.db.$transaction(async (tx) => {
      if (assignmentMutationPlan) {
        if (
          requiredMemberCount !== undefined &&
          assignmentMutationPlan.activeAssignmentCount > requiredMemberCount
        ) {
          throw new BadRequestException(
            "Assigned member count exceeds required member count.",
          );
        }

        await Promise.all(
          assignmentMutationPlan.assignmentsToUpdate.map(
            ({ assignment, details }) => {
              const assignmentUpdateData: Prisma.EngagementAssignmentUpdateInput =
                {
                  memberHandle: details.memberHandle,
                };

              if (details.startDate !== undefined) {
                assignmentUpdateData.startDate = details.startDate;
              }
              if (details.durationMonths !== undefined) {
                assignmentUpdateData.durationMonths = details.durationMonths;
              }
              if (details.ratePerHour !== undefined) {
                assignmentUpdateData.ratePerHour = details.ratePerHour;
              }
              if (details.paymentCycle !== undefined) {
                assignmentUpdateData.paymentCycle = details.paymentCycle;
              }
              if (details.standardHoursPerDay !== undefined) {
                assignmentUpdateData.standardHoursPerDay =
                  details.standardHoursPerDay;
              }
              if (details.agreementRate !== undefined) {
                assignmentUpdateData.agreementRate = details.agreementRate;
              }
              if (details.otherRemarks !== undefined) {
                assignmentUpdateData.otherRemarks = details.otherRemarks;
              }

              return tx.engagementAssignment.update({
                where: {
                  id: assignment.id,
                },
                data: assignmentUpdateData,
              });
            },
          ),
        );

        await Promise.all(
          assignmentMutationPlan.assignmentsToCreate.map((details) => {
            const assignmentCreateData: Prisma.EngagementAssignmentUncheckedCreateInput =
              {
                id: nanoid(),
                engagementId: id,
                memberId: details.memberId,
                memberHandle: details.memberHandle,
              };

            if (details.startDate !== undefined) {
              assignmentCreateData.startDate = details.startDate;
            }
            if (details.durationMonths !== undefined) {
              assignmentCreateData.durationMonths = details.durationMonths;
            }
            if (details.ratePerHour !== undefined) {
              assignmentCreateData.ratePerHour = details.ratePerHour;
            }
            assignmentCreateData.paymentCycle =
              details.paymentCycle ?? DEFAULT_PAYMENT_CYCLE;
            if (details.standardHoursPerDay !== undefined) {
              assignmentCreateData.standardHoursPerDay =
                details.standardHoursPerDay;
            }
            if (details.agreementRate !== undefined) {
              assignmentCreateData.agreementRate = details.agreementRate;
            }
            if (details.otherRemarks !== undefined) {
              assignmentCreateData.otherRemarks = details.otherRemarks;
            }

            return tx.engagementAssignment.create({
              data: assignmentCreateData,
            });
          }),
        );

        if (assignmentMutationPlan.assignmentsToTerminate.length > 0) {
          await tx.engagementAssignment.updateMany({
            where: {
              id: {
                in: assignmentMutationPlan.assignmentsToTerminate.map(
                  (assignment) => assignment.id,
                ),
              },
            },
            data: {
              status: AssignmentStatus.TERMINATED,
              endDate: new Date(),
            },
          });
        }
      } else if (shouldUpsertAssignment && assignmentDetailsResult) {
        if (requiredMemberCount !== undefined) {
          const existingAssignment = await tx.engagementAssignment.findFirst({
            where: {
              engagementId: id,
              memberId: assignmentDetailsResult.memberId,
              status: { in: ACTIVE_ASSIGNMENT_STATUSES },
            },
            orderBy: { createdAt: "desc" },
          });

          if (!existingAssignment) {
            const assignmentCount = await tx.engagementAssignment.count({
              where: {
                engagementId: id,
                status: { in: ACTIVE_ASSIGNMENT_STATUSES },
              },
            });
            if (assignmentCount >= requiredMemberCount) {
              throw new BadRequestException(
                "Assigned member count exceeds required member count.",
              );
            }
          }
        }

        const existingActiveAssignment =
          await tx.engagementAssignment.findFirst({
            where: {
              engagementId: id,
              memberId: assignmentDetailsResult.memberId,
              status: { in: ACTIVE_ASSIGNMENT_STATUSES },
            },
            orderBy: { createdAt: "desc" },
          });

        if (existingActiveAssignment) {
          await tx.engagementAssignment.update({
            where: { id: existingActiveAssignment.id },
            data: {
              memberHandle: assignmentDetailsResult.memberHandle,
            },
          });
        } else {
          await tx.engagementAssignment.create({
            data: {
              id: nanoid(),
              engagementId: id,
              memberId: assignmentDetailsResult.memberId,
              memberHandle: assignmentDetailsResult.memberHandle,
            },
          });
        }
      }

      return tx.engagement.update({
        where: { id },
        data,
        include: { assignments: true },
      });
    });

    const updatedAssignments = updatedEngagement.assignments ?? [];
    const existingAssignmentsById = new Map(
      existingAssignments.map((assignment) => [
        String(assignment.id),
        assignment,
      ]),
    );
    const newAssignments = updatedAssignments.filter(
      (assignment) =>
        !existingAssignmentsById.has(String(assignment.id)) &&
        ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
    );
    const updatedAssignmentsForEmail = updatedAssignments.filter(
      (assignment) => {
        const existingAssignment = existingAssignmentsById.get(
          String(assignment.id),
        );

        if (!existingAssignment) {
          return false;
        }

        return this.didAssignmentOfferDetailsChange(
          existingAssignment,
          assignment,
        );
      },
    );
    await this.sendAssignmentOfferEmails(updatedEngagement, newAssignments);
    await this.sendAssignmentUpdatedEmails(
      updatedEngagement,
      updatedAssignmentsForEmail,
    );

    const engagementWithFields = this.applyAssignmentFields(updatedEngagement);
    const [hydrated] = await this.hydrateCreatorEmails([engagementWithFields]);
    return (
      hydrated ?? {
        ...engagementWithFields,
        createdByEmail: null,
      }
    );
  }

  /**
   * Removes an engagement by UUID.
   *
   * Designed for Administrator-only use when an engagement was created in error
   * and has no assignment history.
   *
   * @param id Engagement UUID.
   * @throws {NotFoundException} If the engagement does not exist.
   * @throws {BadRequestException} If the engagement has any assignments.
   */
  async remove(id: string): Promise<void> {
    this.logger.debug("Removing engagement", { id });
    await this.findOne(id);

    const assignmentCount = await this.db.engagementAssignment.count({
      where: {
        engagementId: id,
      },
    });

    if (assignmentCount > 0) {
      throw new BadRequestException(ERROR_MESSAGES.EngagementHasMembers);
    }

    await this.db.engagement.delete({ where: { id } });
  }

  /**
   * Terminates an engagement assignment without deleting its historical row.
   *
   * Used by the assignment-removal endpoint and application unselection flow to
   * end the active assignment while preserving feedback, experience records,
   * and assignment audit history.
   *
   * @param engagementId Engagement UUID that owns the assignment.
   * @param assignmentId Assignment UUID to terminate.
   * @returns Resolves when the assignment has been terminated or was already terminal.
   * @throws {NotFoundException} If the engagement or assignment does not exist.
   * @throws {BadRequestException} If the assignment belongs to another engagement.
   */
  async removeAssignment(
    engagementId: string,
    assignmentId: string,
  ): Promise<void> {
    this.logger.debug("Terminating engagement assignment", {
      engagementId,
      assignmentId,
    });

    await this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.findUnique({
        where: { id: engagementId },
        include: { assignments: true },
      });

      if (!engagement) {
        throw new NotFoundException("Engagement not found.");
      }

      const assignment = await tx.engagementAssignment.findUnique({
        where: { id: assignmentId },
      });

      if (!assignment) {
        throw new NotFoundException(ERROR_MESSAGES.AssignmentNotFound);
      }

      if (assignment.engagementId !== engagementId) {
        throw new BadRequestException(
          ERROR_MESSAGES.AssignmentEngagementMismatch,
        );
      }

      const isActiveAssignment = ACTIVE_ASSIGNMENT_STATUSES.includes(
        assignment.status,
      );

      if (!isActiveAssignment) {
        return;
      }

      await tx.engagementAssignment.update({
        where: { id: assignmentId },
        data: {
          status: AssignmentStatus.TERMINATED,
          endDate: new Date(),
        },
      });
    });
  }

  updateAssignmentStatus(
    engagementId: string,
    assignmentId: string,
    status: AssignmentStatus,
    terminationReason?: string,
    otherRemarks?: string,
  ): Promise<EngagementAssignment> {
    this.logger.debug("Updating engagement assignment status", {
      engagementId,
      assignmentId,
      status,
    });

    return this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.findUnique({
        where: { id: engagementId },
        include: { assignments: true },
      });

      if (!engagement) {
        throw new NotFoundException("Engagement not found.");
      }

      const assignment = await tx.engagementAssignment.findUnique({
        where: { id: assignmentId },
      });

      if (!assignment) {
        throw new NotFoundException(ERROR_MESSAGES.AssignmentNotFound);
      }

      if (assignment.engagementId !== engagementId) {
        throw new BadRequestException(
          ERROR_MESSAGES.AssignmentEngagementMismatch,
        );
      }

      const normalizedReason =
        typeof terminationReason === "string"
          ? terminationReason.trim()
          : terminationReason;
      const normalizedRemarks =
        typeof otherRemarks === "string" ? otherRemarks.trim() : otherRemarks;
      const data: Prisma.EngagementAssignmentUpdateInput = { status };
      if (
        status === AssignmentStatus.TERMINATED ||
        status === AssignmentStatus.COMPLETED
      ) {
        data.endDate = new Date();
      }
      if (terminationReason !== undefined) {
        data.terminationReason = normalizedReason || null;
      }
      if (otherRemarks !== undefined) {
        data.otherRemarks = normalizedRemarks || null;
      }
      return tx.engagementAssignment.update({
        where: { id: assignmentId },
        data,
      });
    });
  }

  async acceptAssignmentOffer(
    engagementId: string,
    assignmentId: string,
    authUser: Record<string, any>,
  ): Promise<EngagementAssignment> {
    return this.respondToAssignmentOffer(
      engagementId,
      assignmentId,
      authUser,
      AssignmentStatus.ASSIGNED,
    );
  }

  async rejectAssignmentOffer(
    engagementId: string,
    assignmentId: string,
    authUser: Record<string, any>,
  ): Promise<EngagementAssignment> {
    return this.respondToAssignmentOffer(
      engagementId,
      assignmentId,
      authUser,
      AssignmentStatus.OFFER_REJECTED,
    );
  }

  private async respondToAssignmentOffer(
    engagementId: string,
    assignmentId: string,
    authUser: Record<string, any>,
    nextStatus: AssignmentStatus,
  ): Promise<EngagementAssignment> {
    this.logger.debug("Responding to assignment offer", {
      engagementId,
      assignmentId,
      nextStatus,
    });

    let projectId: string | null = null;
    let assignmentMemberId: string | null = null;
    let assignmentMemberHandle: string | null = null;
    let engagementTitle: string | null = null;

    const updatedAssignment = await this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.findUnique({
        where: { id: engagementId },
      });

      if (!engagement) {
        throw new NotFoundException("Engagement not found.");
      }

      const assignment = await tx.engagementAssignment.findUnique({
        where: { id: assignmentId },
      });

      if (!assignment) {
        throw new NotFoundException(ERROR_MESSAGES.AssignmentNotFound);
      }

      if (assignment.engagementId !== engagementId) {
        throw new BadRequestException(
          ERROR_MESSAGES.AssignmentEngagementMismatch,
        );
      }

      projectId = engagement.projectId;
      assignmentMemberId = assignment.memberId;
      assignmentMemberHandle = assignment.memberHandle;
      engagementTitle = engagement.title;

      this.assertMemberCanRespondToOffer(assignment, authUser);

      if (assignment.status !== AssignmentStatus.SELECTED) {
        throw new BadRequestException(
          "Only selected assignments can be accepted or rejected.",
        );
      }

      return tx.engagementAssignment.update({
        where: { id: assignmentId },
        data: { status: nextStatus },
      });
    });

    if (projectId) {
      try {
        await this.assignmentOfferResponseEmailService.sendAssignmentOfferResponseEmails(
          {
            projectId,
            assignmentMemberId,
            assignmentMemberHandle,
            accepted: nextStatus === AssignmentStatus.ASSIGNED,
            engagementId,
            engagementTitle,
          },
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "unknown error";
        this.logger.error(
          `Failed to send assignment offer response emails for engagement ${engagementId}: ${message}`,
        );
      }
    }

    return updatedAssignment;
  }

  private assertMemberCanRespondToOffer(
    assignment: EngagementAssignment,
    authUser: Record<string, any>,
  ) {
    if (authUser?.isMachine) {
      throw new ForbiddenException(
        "Machine tokens cannot accept or reject assignment offers.",
      );
    }

    const roles = getUserRoles(authUser);
    const isPrivileged = roles.some((role) =>
      this.privilegedRoles.has(role?.toLowerCase()),
    );
    if (isPrivileged) {
      throw new ForbiddenException(
        "Admins cannot accept or reject assignment offers.",
      );
    }

    const userIdentifier = getUserIdentifier(authUser);
    if (!userIdentifier || assignment.memberId !== userIdentifier) {
      throw new ForbiddenException(
        "You can only respond to your own assignment offer.",
      );
    }
  }

  /**
   * Lists public engagements that are currently OPEN.
   */
  async findAllActive(): Promise<Engagement[]> {
    this.logger.debug("Listing active engagements");
    const engagements = await this.db.engagement.findMany({
      where: {
        isPrivate: false,
        status: EngagementStatus.OPEN,
      },
      orderBy: { createdAt: "desc" },
    });
    const engagementsWithCreatorEmails =
      await this.hydrateCreatorEmails(engagements);
    return this.hydrateProjectDetails(engagementsWithCreatorEmails);
  }

  private normalizeAssignmentOfferDetails(details?: AssignmentDetailsDto): {
    startDate?: Date;
    durationMonths?: number;
    paymentCycle?: PaymentCycle;
    ratePerHour?: string;
    standardHoursPerDay?: number;
    agreementRate?: string;
    otherRemarks?: string;
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
    const durationMonths = details?.durationMonths;
    const paymentCycle = details?.paymentCycle ?? DEFAULT_PAYMENT_CYCLE;
    const ratePerHour =
      details?.ratePerHour !== undefined
        ? String(details.ratePerHour).trim()
        : undefined;
    const standardHoursPerDay = details?.standardHoursPerDay;
    const agreementRate = this.calculateAssignmentAgreementRate(
      ratePerHour,
      standardHoursPerDay,
      details?.agreementRate !== undefined
        ? String(details.agreementRate).trim()
        : undefined,
    );
    const otherRemarks =
      details?.otherRemarks !== undefined
        ? String(details.otherRemarks).trim()
        : undefined;

    return {
      startDate,
      durationMonths,
      paymentCycle,
      ratePerHour,
      standardHoursPerDay,
      agreementRate: agreementRate ? agreementRate : undefined,
      otherRemarks: otherRemarks ? otherRemarks : undefined,
    };
  }

  /**
   * Calculates the weekly assignment rate from hourly inputs used by assignment
   * creation and update flows, while preserving support for legacy payloads.
   *
   * @param ratePerHour - Assignment rate per hour from the incoming payload.
   * @param standardHoursPerDay - Standard hours per day from the incoming
   *   payload.
   * @param fallbackAgreementRate - Legacy assignment rate per week supplied by
   *   older clients.
   * @returns The normalized assignment rate per week string, or `undefined`
   *   when no rate fields were provided.
   * @throws BadRequestException When only one required field is provided or
   *   when the supplied values are not positive numbers.
   */
  private calculateAssignmentAgreementRate(
    ratePerHour?: string,
    standardHoursPerDay?: number,
    fallbackAgreementRate?: string,
  ): string | undefined {
    const hasRatePerHour = ratePerHour !== undefined;
    const resolvedStandardHoursPerWeek =
      standardHoursPerDay !== undefined
        ? Number((standardHoursPerDay * 5).toFixed(2))
        : undefined;
    const hasStandardHours = resolvedStandardHoursPerWeek !== undefined;

    if (hasRatePerHour !== hasStandardHours) {
      throw new BadRequestException(
        "ratePerHour and standardHoursPerDay must be provided together.",
      );
    }

    if (hasRatePerHour && hasStandardHours) {
      const parsedRatePerHour = Number(ratePerHour);
      const parsedStandardHours = Number(resolvedStandardHoursPerWeek);

      if (!Number.isFinite(parsedRatePerHour) || parsedRatePerHour <= 0) {
        throw new BadRequestException("ratePerHour must be a positive number.");
      }

      if (
        !Number.isFinite(parsedStandardHours) ||
        parsedStandardHours <= 0 ||
        !hasAtMostDecimalPlaces(
          parsedStandardHours,
          MAX_STANDARD_HOURS_DECIMAL_PLACES,
        )
      ) {
        throw new BadRequestException(
          "standardHoursPerDay must be a positive number with up to 2 decimal places.",
        );
      }

      return (parsedRatePerHour * parsedStandardHours).toFixed(2);
    }

    if (!fallbackAgreementRate) {
      return undefined;
    }

    const parsedAgreementRate = Number(fallbackAgreementRate);
    if (!Number.isFinite(parsedAgreementRate) || parsedAgreementRate <= 0) {
      throw new BadRequestException("agreementRate must be a positive number.");
    }

    return fallbackAgreementRate;
  }

  private async resolveAssignmentDetailsList(
    assignmentDetails: AssignmentDetailsDto[],
    options: {
      allowDuplicateMembers?: boolean;
    } = {},
  ): Promise<ResolvedAssignmentDetails[]> {
    if (!Array.isArray(assignmentDetails) || assignmentDetails.length === 0) {
      return [];
    }

    const results = await Promise.all(
      assignmentDetails.map(async (details, index) => {
        if (!details) {
          throw new BadRequestException(
            "Assignment details entries must be valid objects.",
          );
        }
        const memberId = details.memberId;
        const memberHandle = details.memberHandle;
        if (!memberId && !memberHandle) {
          throw new BadRequestException(
            `Assignment details at index ${index} must include memberId or memberHandle.`,
          );
        }

        const resolved = await this.resolveAssignmentDetails(
          memberId,
          memberHandle,
        );
        if (!resolved) {
          throw new BadRequestException(
            `Assignment details at index ${index} must include memberId or memberHandle.`,
          );
        }
        const normalized = this.normalizeAssignmentOfferDetails(details);
        return {
          ...resolved,
          ...normalized,
        };
      }),
    );

    if (!options.allowDuplicateMembers) {
      const memberIdSet = new Set<string>();
      const memberHandleSet = new Set<string>();
      results.forEach((details) => {
        if (memberIdSet.has(details.memberId)) {
          throw new BadRequestException("Assigned member IDs must be unique.");
        }
        memberIdSet.add(details.memberId);
        const handleKey = details.memberHandle.toLowerCase();
        if (memberHandleSet.has(handleKey)) {
          throw new BadRequestException(
            "Assigned member handles must be unique.",
          );
        }
        memberHandleSet.add(handleKey);
      });
    }

    return results;
  }

  private async resolveAssignmentDetails(
    assignedMemberId?: string,
    assignedMemberHandle?: string,
  ): Promise<{ memberId: string; memberHandle: string } | null> {
    const memberId = assignedMemberId?.trim();
    const memberHandle = assignedMemberHandle?.trim();

    if (assignedMemberId !== undefined && !memberId) {
      throw new BadRequestException("Assigned member ID cannot be blank.");
    }

    if (assignedMemberHandle !== undefined && !memberHandle) {
      throw new BadRequestException("Assigned member handle cannot be blank.");
    }

    if (!memberId && !memberHandle) {
      return null;
    }

    let resolvedMemberId = memberId ?? null;
    let resolvedMemberHandle = memberHandle ?? null;

    if (resolvedMemberId && resolvedMemberHandle) {
      const handleFromId =
        await this.memberService.getMemberHandleByUserId(resolvedMemberId);
      if (!handleFromId) {
        throw new BadRequestException("Assigned member ID not found.");
      }
      if (handleFromId.toLowerCase() !== resolvedMemberHandle.toLowerCase()) {
        throw new BadRequestException(
          "Assigned member ID and handle do not match.",
        );
      }

      return {
        memberId: resolvedMemberId,
        memberHandle: handleFromId,
      };
    }

    if (resolvedMemberId && !resolvedMemberHandle) {
      resolvedMemberHandle =
        await this.memberService.getMemberHandleByUserId(resolvedMemberId);
      if (!resolvedMemberHandle) {
        throw new BadRequestException("Assigned member ID not found.");
      }
    }

    if (resolvedMemberHandle && !resolvedMemberId) {
      resolvedMemberId =
        await this.memberService.getMemberUserIdByHandle(resolvedMemberHandle);
      if (!resolvedMemberId) {
        throw new BadRequestException("Assigned member handle not found.");
      }
    }

    return {
      memberId: resolvedMemberId as string,
      memberHandle: resolvedMemberHandle as string,
    };
  }

  private async resolveMultipleAssignmentDetails(
    assignedMemberIds?: string[],
    assignedMemberHandles?: string[],
    options: {
      allowDuplicateMembers?: boolean;
    } = {},
  ): Promise<Array<{ memberId: string; memberHandle: string }>> {
    const results: Array<{ memberId: string; memberHandle: string }> = [];

    const memberIds = assignedMemberIds
      ? assignedMemberIds.map((id) => {
          const trimmed = id?.trim();
          if (!trimmed) {
            throw new BadRequestException(
              "Assigned member IDs must not contain empty values.",
            );
          }
          return trimmed;
        })
      : [];
    const memberHandles = assignedMemberHandles
      ? assignedMemberHandles.map((handle) => {
          const trimmed = handle?.trim();
          if (!trimmed) {
            throw new BadRequestException(
              "Assigned member handles must not contain empty values.",
            );
          }
          return trimmed;
        })
      : [];

    if (
      memberIds.length > 0 &&
      memberHandles.length > 0 &&
      memberIds.length !== memberHandles.length
    ) {
      throw new BadRequestException(
        "Assigned member IDs and handles arrays must have the same length if both are provided.",
      );
    }

    if (!options.allowDuplicateMembers) {
      const memberIdSet = new Set<string>();
      for (const memberId of memberIds) {
        if (memberIdSet.has(memberId)) {
          throw new BadRequestException("Assigned member IDs must be unique.");
        }
        memberIdSet.add(memberId);
      }

      const memberHandleSet = new Set<string>();
      for (const memberHandle of memberHandles) {
        const normalizedHandle = memberHandle.toLowerCase();
        if (memberHandleSet.has(normalizedHandle)) {
          throw new BadRequestException(
            "Assigned member handles must be unique.",
          );
        }
        memberHandleSet.add(normalizedHandle);
      }
    }

    const maxLength = Math.max(memberIds.length, memberHandles.length);

    for (let i = 0; i < maxLength; i += 1) {
      const memberId = memberIds[i] ?? undefined;
      const memberHandle = memberHandles[i] ?? undefined;

      const details = await this.resolveAssignmentDetails(
        memberId,
        memberHandle,
      );
      if (details) {
        results.push(details);
      }
    }

    return results;
  }

  /**
   * Matches incoming private-assignment rows to persisted assignment rows by
   * member, preserving terminal history while creating or updating at most one
   * active assignment for each member.
   *
   * @param existingAssignments current assignments stored for the engagement.
   * @param assignmentDetailsList normalized assignment payload from the request.
   * @returns the create, update, and termination operations implied by the
   * request plus the resulting active-assignment count.
   * @throws {BadRequestException} when the request would leave more than one
   * active assignment for the same member.
   */
  private planAssignmentMutation(
    existingAssignments: EngagementAssignment[],
    assignmentDetailsList: ResolvedAssignmentDetails[],
  ): PlannedAssignmentMutation {
    const activeAssignmentsByMemberId = new Map<
      string,
      EngagementAssignment[]
    >();
    const terminalAssignmentsByMemberId = new Map<
      string,
      EngagementAssignment[]
    >();

    existingAssignments.forEach((assignment) => {
      const memberId = String(assignment.memberId);
      const assignmentsByMemberId = ACTIVE_ASSIGNMENT_STATUSES.includes(
        assignment.status,
      )
        ? activeAssignmentsByMemberId
        : terminalAssignmentsByMemberId;
      const currentAssignments = assignmentsByMemberId.get(memberId) ?? [];

      currentAssignments.push(assignment);
      assignmentsByMemberId.set(memberId, currentAssignments);
    });

    const assignmentDetailsByMemberId = new Map<
      string,
      ResolvedAssignmentDetails[]
    >();
    assignmentDetailsList.forEach((details) => {
      const currentDetails =
        assignmentDetailsByMemberId.get(details.memberId) ?? [];

      currentDetails.push(details);
      assignmentDetailsByMemberId.set(details.memberId, currentDetails);
    });

    const assignmentsToCreate: ResolvedAssignmentDetails[] = [];
    const assignmentsToUpdate: PlannedAssignmentMutation["assignmentsToUpdate"] =
      [];
    const activeAssignmentCountByMemberId = new Map<string, number>();
    const consumedAssignmentIds = new Set<string>();

    assignmentDetailsByMemberId.forEach((memberDetails, memberId) => {
      const activeAssignments = activeAssignmentsByMemberId.get(memberId) ?? [];
      const terminalAssignments =
        terminalAssignmentsByMemberId.get(memberId) ?? [];
      const activeAssignmentSlots = activeAssignments.length || 1;
      const terminalAssignmentCount = Math.min(
        terminalAssignments.length,
        Math.max(0, memberDetails.length - activeAssignmentSlots),
      );
      let detailIndex = 0;

      terminalAssignments
        .slice(0, terminalAssignmentCount)
        .forEach((assignment) => {
          const details = memberDetails[detailIndex];

          assignmentsToUpdate.push({
            assignment,
            details,
          });
          consumedAssignmentIds.add(assignment.id);
          detailIndex += 1;
        });

      activeAssignments.forEach((assignment) => {
        const details = memberDetails[detailIndex];

        if (!details) {
          return;
        }

        assignmentsToUpdate.push({
          assignment,
          details,
        });
        consumedAssignmentIds.add(assignment.id);
        activeAssignmentCountByMemberId.set(
          memberId,
          (activeAssignmentCountByMemberId.get(memberId) ?? 0) + 1,
        );
        detailIndex += 1;
      });

      memberDetails.slice(detailIndex).forEach((details) => {
        assignmentsToCreate.push(details);
        activeAssignmentCountByMemberId.set(
          memberId,
          (activeAssignmentCountByMemberId.get(memberId) ?? 0) + 1,
        );
      });
    });

    const duplicateActiveAssignment = Array.from(
      activeAssignmentCountByMemberId.values(),
    ).some((count) => count > 1);

    if (duplicateActiveAssignment) {
      throw new BadRequestException("Assigned member IDs must be unique.");
    }

    const assignmentsToTerminate = existingAssignments.filter(
      (assignment) =>
        ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status) &&
        !consumedAssignmentIds.has(assignment.id),
    );

    return {
      activeAssignmentCount: Array.from(
        activeAssignmentCountByMemberId.values(),
      ).reduce((sum, count) => sum + count, 0),
      assignmentsToCreate,
      assignmentsToTerminate,
      assignmentsToUpdate,
    };
  }

  /**
   * Normalizes Flexi engagement list filters once per request.
   *
   * Project-name search remains server-resolved through ProjectService, which
   * owns trimming, the three-character lookup gate, and result capping.
   *
   * @param query Flexi list query containing bucket and optional search text.
   * @returns Normalized filters shared by Prisma and SQL list paths.
   */
  private async resolveFlexiEngagementListFilters(
    query: FlexiEngagementListQueryDto,
  ): Promise<FlexiEngagementListFilters> {
    const searchText = query.searchText?.trim() || undefined;
    const projectIds = searchText
      ? (await this.projectService.searchFlexiProjectIdsByName(searchText))
          .map((projectId) => this.normalizeProjectId(projectId))
          .filter((projectId): projectId is string => {
            if (!projectId) {
              return false;
            }

            return !this.isFlexiTalentProjectIgnored(projectId);
          })
      : [];

    return {
      bucket: query.bucket,
      searchText,
      projectIds,
      ignoredProjectIds: this.flexiTalentIgnoredProjectIds,
    };
  }

  /**
   * Builds the Prisma where clause for Flexi Talent engagement lists.
   *
   * This remains the semantic source for bucket membership and title/project
   * search; SQL list helpers consume the same normalized filter object.
   *
   * @param filters Normalized Flexi engagement list filters.
   * @returns Engagement where clause using Flexi bucket and search semantics.
   */
  private buildFlexiEngagementWhere(
    filters: FlexiEngagementListFilters,
  ): Prisma.EngagementWhereInput {
    const where: Prisma.EngagementWhereInput = {};
    const andFilters: Prisma.EngagementWhereInput[] = [];

    if (filters.ignoredProjectIds.length) {
      where.projectId = { notIn: filters.ignoredProjectIds };
    }

    andFilters.push({
      status: { in: this.getFlexiEngagementStatusesForBucket(filters.bucket) },
    });

    if (filters.searchText) {
      const searchFilters: Prisma.EngagementWhereInput[] = [
        {
          title: {
            contains: filters.searchText,
            mode: "insensitive",
          },
        },
      ];

      if (filters.projectIds.length) {
        searchFilters.push({ projectId: { in: filters.projectIds } });
      }

      andFilters.push({ OR: searchFilters });
    }

    if (andFilters.length) {
      where.AND = andFilters;
    }

    return where;
  }

  /**
   * Fetches a database-paged Flexi engagement page for name sorting.
   *
   * The query pulls only list fields and a filtered active-assignment count,
   * preserving name sort plus stable id ties without hydrating assignment rows.
   *
   * @param filters Normalized Flexi engagement filters.
   * @param sortOrder Requested name sort direction.
   * @param skip Number of rows to skip.
   * @param take Number of rows to return.
   * @returns Page rows plus the total matching engagement count.
   */
  private async getFlexiEngagementRowsSortedByName(
    filters: FlexiEngagementListFilters,
    sortOrder: "asc" | "desc",
    skip: number,
    take: number,
  ): Promise<FlexiListPage<FlexiEngagementListRow>> {
    const where = this.buildFlexiEngagementWhere(filters);
    const [engagements, total] = await Promise.all([
      this.db.engagement.findMany({
        where,
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
          requiredMemberCount: true,
          _count: {
            select: {
              assignments: {
                where: {
                  status: { in: ACTIVE_ASSIGNMENT_STATUSES },
                },
              },
            },
          },
        },
        orderBy: [{ title: sortOrder }, { id: "asc" }],
        skip,
        take,
      }),
      this.db.engagement.count({ where }),
    ]);

    return {
      rows: engagements.map((engagement) => ({
        id: engagement.id,
        projectId: engagement.projectId,
        title: engagement.title,
        status: engagement.status,
        requiredMemberCount: engagement.requiredMemberCount,
        assignedMemberCount: engagement._count.assignments,
      })),
      total,
    };
  }

  /**
   * Fetches a database-paged Flexi engagement page for member-count sorting.
   *
   * The total uses the shared Prisma where builder so bucket counts stay aligned
   * with the summary endpoint. Raw SQL is limited to aggregate page ordering,
   * which Prisma cannot express without loading every candidate engagement.
   *
   * @param filters Normalized Flexi engagement filters.
   * @param sortOrder Requested member-count sort direction.
   * @param skip Number of rows to skip.
   * @param take Number of rows to return.
   * @returns Page rows plus the total matching engagement count.
   */
  private async getFlexiEngagementRowsSortedByMemberCount(
    filters: FlexiEngagementListFilters,
    sortOrder: "asc" | "desc",
    skip: number,
    take: number,
  ): Promise<FlexiListPage<FlexiEngagementListRow>> {
    const where = this.buildFlexiEngagementWhere(filters);
    const whereSql = this.buildFlexiEngagementWhereSql(filters);
    const sortDirectionSql = this.buildSqlSortDirection(sortOrder);
    const [total, rows] = await Promise.all([
      this.db.engagement.count({ where }),
      this.db.$queryRaw<FlexiEngagementListSqlRow[]>(
        Prisma.sql`
          SELECT
            e."id",
            e."projectId",
            e."title",
            e."status",
            e."requiredMemberCount",
            COUNT(a."id")::int AS "assignedMemberCount"
          FROM "Engagement" e
          LEFT JOIN "EngagementAssignment" a
            ON a."engagementId" = e."id"
           AND a."status" IN (${this.buildAssignmentStatusListSql(
             ACTIVE_ASSIGNMENT_STATUSES,
           )})
          ${whereSql}
          GROUP BY
            e."id",
            e."projectId",
            e."title",
            e."status",
            e."requiredMemberCount"
          ORDER BY
            "assignedMemberCount" ${sortDirectionSql},
            e."title" ASC,
            e."id" ASC
          OFFSET ${skip}
          LIMIT ${take}
        `,
      ),
    ]);

    return {
      rows: rows.map((row) => ({
        id: row.id,
        projectId: row.projectId,
        title: row.title,
        status: row.status,
        requiredMemberCount: row.requiredMemberCount,
        assignedMemberCount: this.coerceSqlNumber(row.assignedMemberCount),
      })),
      total,
    };
  }

  /**
   * Builds the SQL WHERE clause matching Flexi engagement list filters.
   *
   * @param filters Normalized filters also used by the Prisma where builder.
   * @returns Parameterized SQL predicate for aggregate engagement list queries.
   */
  private buildFlexiEngagementWhereSql(
    filters: FlexiEngagementListFilters,
  ): Prisma.Sql {
    const clauses: Prisma.Sql[] = [];

    if (filters.ignoredProjectIds.length) {
      clauses.push(
        Prisma.sql`e."projectId" NOT IN (${Prisma.join(
          filters.ignoredProjectIds,
        )})`,
      );
    }

    clauses.push(
      Prisma.sql`e."status" IN (${this.buildEngagementStatusListSql(
        this.getFlexiEngagementStatusesForBucket(filters.bucket),
      )})`,
    );

    if (filters.searchText) {
      const titlePattern = `%${filters.searchText}%`;
      const searchClauses: Prisma.Sql[] = [
        Prisma.sql`e."title" ILIKE ${titlePattern}`,
      ];

      if (filters.projectIds.length) {
        searchClauses.push(
          Prisma.sql`e."projectId" IN (${Prisma.join(filters.projectIds)})`,
        );
      }

      clauses.push(Prisma.sql`(${Prisma.join(searchClauses, " OR ")})`);
    }

    if (!clauses.length) {
      return Prisma.empty;
    }

    return Prisma.sql`WHERE ${Prisma.join(clauses, " AND ")}`;
  }

  /**
   * Assembles a Flexi engagement list item from an engagement row.
   *
   * @param engagement Narrow engagement list row with assigned-member count.
   * @param projectNamesById Hydrated project names keyed by project id.
   * @returns Flexi engagement list item.
   */
  private buildFlexiEngagementListItem(
    engagement: FlexiEngagementListRow,
    projectNamesById: Map<string, string>,
  ): FlexiEngagementListItemDto {
    const projectName = this.normalizeProjectName(
      projectNamesById.get(engagement.projectId),
    );

    return {
      engagementId: engagement.id,
      projectId: engagement.projectId,
      ...(projectName ? { projectName } : {}),
      engagementTitle: engagement.title,
      status: engagement.status,
      assignedMemberCount: engagement.assignedMemberCount,
      requiredMemberCount: engagement.requiredMemberCount,
    };
  }

  /**
   * Counts current Flexi assignment rows using shared active status semantics.
   *
   * @param assignments Assignment rows for one engagement.
   * @returns Number of assignments in ACTIVE_ASSIGNMENT_STATUSES.
   */
  private countCurrentFlexiAssignments(
    assignments: EngagementAssignment[],
  ): number {
    return assignments.filter((assignment) =>
      ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
    ).length;
  }

  /**
   * Hydrates project names for Flexi payloads through the existing project seam.
   *
   * @param projectIds Project ids to resolve.
   * @returns Project name map, or an empty map when hydration fails.
   */
  private async getFlexiProjectNames(
    projectIds: string[],
  ): Promise<Map<string, string>> {
    try {
      return await this.projectService.getProjectNamesByIds(projectIds);
    } catch (error) {
      this.logger.warn("Failed to hydrate Flexi project names.", {
        error: error instanceof Error ? error.message : error,
      });
      return new Map<string, string>();
    }
  }

  /**
   * Hydrates skill names for Flexi detail and history payloads.
   *
   * @param skillIds Skill ids from engagement.requiredSkills.
   * @returns Skill name map with raw-id fallbacks when hydration fails.
   */
  private async getFlexiSkillNames(
    skillIds: string[],
  ): Promise<Map<string, string>> {
    try {
      return await this.skillsService.getSkillNamesByIds(skillIds);
    } catch (error) {
      this.logger.warn("Failed to hydrate Flexi skill names.", {
        error: error instanceof Error ? error.message : error,
      });

      return new Map(
        Array.from(new Set(skillIds)).map((skillId) => [skillId, skillId]),
      );
    }
  }

  /**
   * Builds ordered skill references with display-name fallbacks.
   *
   * @param skillIds Raw required skill ids.
   * @param skillNamesById Hydrated skill names keyed by id.
   * @returns Skill reference DTOs preserving first-seen order.
   */
  private buildFlexiSkillReferences(
    skillIds: string[],
    skillNamesById: Map<string, string>,
  ): FlexiSkillReferenceDto[] {
    const seenSkillIds = new Set<string>();

    return skillIds
      .map((skillId) => skillId.trim())
      .filter((skillId) => {
        if (!skillId || seenSkillIds.has(skillId)) {
          return false;
        }

        seenSkillIds.add(skillId);
        return true;
      })
      .map((skillId) => ({
        id: skillId,
        name: skillNamesById.get(skillId) ?? skillId,
      }));
  }

  /**
   * Assembles an assignment row for Flexi engagement detail.
   *
   * @param assignment Assignment row to expose.
   * @param engagement Parent engagement used for project and duration fallback.
   * @returns Flexi engagement assignment row DTO.
   */
  private buildFlexiEngagementAssignmentRow(
    assignment: EngagementAssignment,
    engagement: Engagement,
  ): FlexiEngagementAssignmentRowDto {
    return {
      assignmentId: assignment.id,
      engagementId: engagement.id,
      projectId: engagement.projectId,
      memberId: assignment.memberId,
      memberHandle: assignment.memberHandle,
      status: assignment.status,
      displayStatusLabel: this.getAssignmentDisplayStatusLabel(
        assignment.status,
      ),
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      ...this.resolveFlexiTiming(assignment),
      ...this.resolveFlexiDuration(assignment, engagement),
    };
  }

  /**
   * Returns the shared current and completion statuses used by Flexi members.
   *
   * @returns Unique assignment statuses that qualify for member summary, list,
   * detail, and history payloads.
   */
  private getFlexiQualifyingAssignmentStatuses(): AssignmentStatus[] {
    return Array.from(
      new Set([
        ...ACTIVE_ASSIGNMENT_STATUSES,
        ...ASSIGNMENT_COMPLETION_STATUSES,
      ]),
    );
  }

  /**
   * Returns the engagement statuses that qualify for a Flexi engagement bucket.
   *
   * @param bucket Engagement bucket requested by a Flexi summary or list path.
   * @returns Engagement statuses that can contribute rows to the bucket.
   */
  private getFlexiEngagementStatusesForBucket(
    bucket: FlexiEngagementBucket,
  ): EngagementStatus[] {
    if (bucket === FlexiEngagementBucket.Active) {
      return FLEXI_ACTIVE_ENGAGEMENT_STATUSES;
    }

    if (bucket === FlexiEngagementBucket.Closed) {
      return FLEXI_CLOSED_ENGAGEMENT_STATUSES;
    }

    return FLEXI_QUALIFYING_ENGAGEMENT_STATUSES;
  }

  /**
   * Fetches a database-paged Flexi member list.
   *
   * The SQL is isolated to this list hot path because Prisma cannot express the
   * existing grouped primary-assignment selection, current/completed buckets,
   * time ordering, and stable assignment ties without reloading every row.
   *
   * @param query Flexi member list filters, sorting, and pagination.
   * @returns Page rows plus the total matching member count.
   */
  private async getPagedFlexiMemberListRows(
    query: FlexiMemberListQueryDto,
  ): Promise<FlexiListPage<FlexiMemberListPrimaryAssignment>> {
    const searchText = query.searchText?.trim() || undefined;
    const todayUtcDate = new Date(this.getUtcDateOnlyTime(new Date()))
      .toISOString()
      .slice(0, 10);
    const baseSql = this.buildFlexiMemberListBaseSql(
      query.bucket,
      searchText,
      todayUtcDate,
    );
    const orderSql = this.buildFlexiMemberListOrderSql(query);
    const skip = (query.page - 1) * query.perPage;
    const [countRows, rows] = await Promise.all([
      this.db.$queryRaw<Array<{ total: bigint | number | string }>>(
        Prisma.sql`
          ${baseSql}
          SELECT COUNT(*)::bigint AS "total"
          FROM member_flags
        `,
      ),
      this.db.$queryRaw<FlexiMemberListSqlRow[]>(
        Prisma.sql`
          ${baseSql},
          primary_assignments AS (
            SELECT
              s.*,
              mf."hasCurrent",
              ROW_NUMBER() OVER (
                PARTITION BY s."memberId"
                ORDER BY
                  CASE
                    WHEN mf."hasCurrent" AND s."isCurrent" THEN 0
                    WHEN NOT mf."hasCurrent" AND s."isCompletion" THEN 0
                    ELSE 1
                  END ASC,
                  CASE
                    WHEN mf."hasCurrent"
                     AND s."isCurrent"
                     AND s."status" = ${AssignmentStatus.ASSIGNED}::"AssignmentStatus" THEN 0
                    WHEN mf."hasCurrent"
                     AND s."isCurrent"
                     AND s."status" = ${AssignmentStatus.SELECTED}::"AssignmentStatus" THEN 1
                    ELSE 2
                  END ASC,
                  CASE
                    WHEN mf."hasCurrent"
                     AND s."isCurrent"
                     AND s."resolvedEndDate" IS NULL THEN 1
                    ELSE 0
                  END ASC,
                  CASE
                    WHEN mf."hasCurrent" AND s."isCurrent"
                      THEN s."resolvedEndDate"
                    ELSE NULL
                  END ASC,
                  CASE
                    WHEN NOT mf."hasCurrent" AND s."isCompletion"
                      THEN s."latestCompletedAt"
                    ELSE NULL
                  END DESC,
                  s."engagementTitle" ASC,
                  s."memberHandle" ASC,
                  s."memberId" ASC,
                  s."assignmentId" ASC
              ) AS "primaryRank"
            FROM scored_assignments s
            JOIN member_flags mf
              ON mf."memberId" = s."memberId"
            WHERE (mf."hasCurrent" AND s."isCurrent")
               OR (NOT mf."hasCurrent" AND s."isCompletion")
          )
          SELECT
            "assignmentId",
            "engagementId",
            "memberId",
            "memberHandle",
            "status",
            "engagementProjectId",
            "engagementTitle",
            "hasCurrent" AS "isCurrentlyAssigned",
            CASE
              WHEN "hasCurrent" THEN "daysRemaining"
              ELSE NULL
            END AS "daysRemaining",
            CASE
              WHEN "hasCurrent" THEN NULL
              ELSE "latestCompletedAt"
            END AS "latestCompletedAt"
          FROM primary_assignments
          WHERE "primaryRank" = 1
          ORDER BY ${orderSql}
          OFFSET ${skip}
          LIMIT ${query.perPage}
        `,
      ),
    ]);

    return {
      rows: rows.map((row) => this.mapFlexiMemberListSqlRow(row)),
      total: this.coerceSqlNumber(countRows[0]?.total),
    };
  }

  /**
   * Builds the shared CTE for Flexi member list count and page queries.
   *
   * The CTE filters assignment rows before grouping to preserve handle-search
   * semantics, mirrors setUTCMonth-style end-date overflow, and exposes bucket
   * membership through member_flags.
   *
   * @param bucket Requested member bucket.
   * @param searchText Optional trimmed member-handle search text.
   * @param todayUtcDate Current UTC date-only string used for day math.
   * @returns Parameterized SQL CTE for the member list helper.
   */
  private buildFlexiMemberListBaseSql(
    bucket: FlexiMemberBucket,
    searchText: string | undefined,
    todayUtcDate: string,
  ): Prisma.Sql {
    const searchSql = searchText
      ? Prisma.sql`AND a."memberHandle" ILIKE ${`%${searchText}%`}`
      : Prisma.empty;
    const ignoredProjectSql = this.flexiTalentIgnoredProjectIds.length
      ? Prisma.sql`AND e."projectId" NOT IN (${Prisma.join(
          this.flexiTalentIgnoredProjectIds,
        )})`
      : Prisma.empty;
    const engagementStatusSql = Prisma.sql`
      AND e."status" IN (${this.buildEngagementStatusListSql(
        FLEXI_QUALIFYING_ENGAGEMENT_STATUSES,
      )})
    `;

    return Prisma.sql`
      WITH filtered_assignments AS (
        SELECT
          a."id" AS "assignmentId",
          a."engagementId",
          a."memberId",
          a."memberHandle",
          a."status",
          a."updatedAt",
          e."projectId" AS "engagementProjectId",
          e."title" AS "engagementTitle",
          (
            a."status" IN (${this.buildAssignmentStatusListSql(
              ACTIVE_ASSIGNMENT_STATUSES,
            )})
          ) AS "isCurrent",
          (
            a."status" IN (${this.buildAssignmentStatusListSql(
              ASSIGNMENT_COMPLETION_STATUSES,
            )})
          ) AS "isCompletion",
          ${this.buildFlexiResolvedEndDateSql()} AS "resolvedEndDate"
        FROM "EngagementAssignment" a
        JOIN "Engagement" e
          ON e."id" = a."engagementId"
        WHERE a."status" IN (${this.buildAssignmentStatusListSql(
          this.getFlexiQualifyingAssignmentStatuses(),
        )})
        ${engagementStatusSql}
        ${ignoredProjectSql}
        ${searchSql}
      ),
      scored_assignments AS (
        SELECT
          *,
          CASE
            WHEN "resolvedEndDate" IS NULL THEN NULL
            ELSE ("resolvedEndDate"::date - ${todayUtcDate}::date)::int
          END AS "daysRemaining",
          COALESCE("resolvedEndDate", "updatedAt") AS "latestCompletedAt"
        FROM filtered_assignments
      ),
      member_flags AS (
        SELECT
          "memberId",
          BOOL_OR("isCurrent") AS "hasCurrent",
          BOOL_OR("isCompletion") AS "hasCompletion"
        FROM scored_assignments
        GROUP BY "memberId"
        HAVING ${this.buildFlexiMemberBucketHavingSql(bucket)}
      )
    `;
  }

  /**
   * Builds the member bucket HAVING predicate used after assignment grouping.
   *
   * @param bucket Requested Flexi member bucket.
   * @returns SQL predicate matching assigned, completed-only, or total groups.
   */
  private buildFlexiMemberBucketHavingSql(
    bucket: FlexiMemberBucket,
  ): Prisma.Sql {
    if (bucket === FlexiMemberBucket.Assigned) {
      return Prisma.sql`BOOL_OR("isCurrent")`;
    }

    if (bucket === FlexiMemberBucket.Completed) {
      return Prisma.sql`BOOL_OR("isCompletion") AND NOT BOOL_OR("isCurrent")`;
    }

    return Prisma.sql`BOOL_OR("isCurrent") OR BOOL_OR("isCompletion")`;
  }

  /**
   * Builds the final ORDER BY clause for Flexi member list pages.
   *
   * Handle sorting respects the requested direction; time sorting uses the
   * source hasCurrent flag to preserve current-first total grouping, nullable
   * day/date ordering, and the same final stable ties as
   * compareFlexiMemberListRows.
   *
   * @param query Flexi member list sort query.
   * @returns SQL ORDER BY fragment without the leading ORDER BY keyword.
   */
  private buildFlexiMemberListOrderSql(
    query: FlexiMemberListQueryDto,
  ): Prisma.Sql {
    const tieSql = Prisma.sql`
      "engagementTitle" ASC,
      "memberHandle" ASC,
      "memberId" ASC,
      "assignmentId" ASC
    `;

    if (query.sortBy === FlexiMemberSortBy.Handle) {
      return Prisma.sql`
        "memberHandle" ${this.buildSqlSortDirection(query.sortOrder)},
        ${tieSql}
      `;
    }

    const currentTimeDirectionSql = this.buildSqlSortDirection(query.sortOrder);
    const completedTimeDirectionSql = this.buildSqlSortDirection(
      query.sortOrder === "desc" ? "asc" : "desc",
    );
    const totalGroupingSql =
      query.bucket === FlexiMemberBucket.Total
        ? Prisma.sql`
          CASE WHEN "hasCurrent" THEN 0 ELSE 1 END ASC,
        `
        : Prisma.empty;

    return Prisma.sql`
      ${totalGroupingSql}
      CASE
        WHEN "hasCurrent" AND "daysRemaining" IS NULL THEN 1
        ELSE 0
      END ASC,
      CASE
        WHEN "hasCurrent" THEN "daysRemaining"
        ELSE NULL
      END ${currentTimeDirectionSql},
      CASE
        WHEN NOT "hasCurrent" AND "latestCompletedAt" IS NULL THEN 1
        ELSE 0
      END ASC,
      CASE
        WHEN NOT "hasCurrent" THEN "latestCompletedAt"
        ELSE NULL
      END ${completedTimeDirectionSql},
      ${tieSql}
    `;
  }

  /**
   * Builds SQL that mirrors resolveFlexiEndDate for assignment rows.
   *
   * The month expression intentionally starts from the first day of the month
   * and adds day/time offsets to reproduce JavaScript setUTCMonth overflow
   * behavior at month ends.
   *
   * @returns SQL expression resolving an assignment end timestamp or null.
   */
  private buildFlexiResolvedEndDateSql(): Prisma.Sql {
    return Prisma.sql`
      CASE
        WHEN a."endDate" IS NOT NULL THEN a."endDate"
        WHEN a."startDate" IS NOT NULL
         AND a."durationMonths" IS NOT NULL THEN
          date_trunc('month', a."startDate")
          + make_interval(months => a."durationMonths")
          + ((EXTRACT(DAY FROM a."startDate")::int - 1) * INTERVAL '1 day')
          + (a."startDate" - date_trunc('day', a."startDate"))
        ELSE NULL
      END
    `;
  }

  /**
   * Converts a raw member-list row into the narrow list item input shape.
   *
   * @param row SQL row for one selected primary assignment.
   * @returns Flexi member list primary assignment projection.
   */
  private mapFlexiMemberListSqlRow(
    row: FlexiMemberListSqlRow,
  ): FlexiMemberListPrimaryAssignment {
    return {
      assignment: {
        id: row.assignmentId,
        engagementId: row.engagementId,
        memberId: row.memberId,
        memberHandle: row.memberHandle,
        status: row.status,
        engagement: {
          id: row.engagementId,
          projectId: row.engagementProjectId,
          title: row.engagementTitle,
        },
      },
      isCurrentlyAssigned: row.isCurrentlyAssigned,
      daysRemaining:
        row.daysRemaining === null
          ? null
          : this.coerceSqlNumber(row.daysRemaining),
      latestCompletedAt: row.latestCompletedAt,
    };
  }

  /**
   * Builds a parameterized AssignmentStatus list with explicit enum casts.
   *
   * @param statuses Assignment statuses to embed in an IN predicate.
   * @returns SQL list fragment suitable for raw Postgres enum comparisons.
   */
  private buildAssignmentStatusListSql(
    statuses: AssignmentStatus[],
  ): Prisma.Sql {
    return Prisma.join(
      statuses.map((status) => Prisma.sql`${status}::"AssignmentStatus"`),
    );
  }

  /**
   * Builds a parameterized EngagementStatus list with explicit enum casts.
   *
   * @param statuses Engagement statuses to embed in an IN predicate.
   * @returns SQL list fragment suitable for raw Postgres enum comparisons.
   */
  private buildEngagementStatusListSql(
    statuses: EngagementStatus[],
  ): Prisma.Sql {
    return Prisma.join(
      statuses.map((status) => Prisma.sql`${status}::"EngagementStatus"`),
    );
  }

  /**
   * Builds a trusted SQL sort direction from a validated query value.
   *
   * @param sortOrder Validated ascending or descending sort order.
   * @returns SQL ASC or DESC keyword fragment.
   */
  private buildSqlSortDirection(sortOrder: "asc" | "desc"): Prisma.Sql {
    return sortOrder === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`;
  }

  /**
   * Converts numeric values returned by raw SQL into JavaScript numbers.
   *
   * @param value Raw SQL numeric result from count or integer expressions.
   * @returns Numeric value, defaulting missing values to zero.
   */
  private coerceSqlNumber(value?: number | bigint | string | null): number {
    if (value === null || value === undefined) {
      return 0;
    }

    return typeof value === "bigint" ? Number(value) : Number(value);
  }

  /**
   * Fetches qualifying assignment rows with linked engagements.
   *
   * @param options Optional member id and member-handle search filters.
   * @returns Assignment rows joined with their engagement.
   */
  private getFlexiAssignmentsWithEngagements(options: {
    memberId?: string;
    searchText?: string;
  }): Promise<FlexiAssignmentWithEngagement[]> {
    const where: Prisma.EngagementAssignmentWhereInput = {
      status: { in: this.getFlexiQualifyingAssignmentStatuses() },
      ...this.buildFlexiTalentAssignmentEngagementWhere(),
    };
    const searchText = options.searchText?.trim();

    if (options.memberId) {
      where.memberId = options.memberId;
    }
    if (searchText) {
      where.memberHandle = {
        contains: searchText,
        mode: "insensitive",
      };
    }

    return this.db.engagementAssignment.findMany({
      where,
      include: {
        engagement: true,
      },
    });
  }

  /**
   * Parses a comma-separated project ignore list from configuration.
   *
   * Flexi Talent engagement and member read paths use the returned project IDs
   * to hide data for ignored Work projects. Blank entries and duplicate project
   * IDs are ignored; the parser is tolerant and does not throw.
   *
   * @param rawValue Raw environment value from `FLEXI_TALENT_IGNORED_PROJECT_IDS`.
   * @returns Normalized project IDs that should be excluded from Flexi payloads.
   */
  private parseConfiguredProjectIds(rawValue?: string): string[] {
    return Array.from(
      new Set(
        (rawValue ?? "")
          .split(",")
          .map((projectId) => this.normalizeProjectId(projectId))
          .filter((projectId): projectId is string => Boolean(projectId)),
      ),
    );
  }

  /**
   * Builds the assignment relation filter for qualifying Flexi engagements.
   *
   * Member summary, detail, and history queries merge this condition into
   * assignment filters so only assignments from ACTIVE or CLOSED engagements
   * outside ignored projects can select or count a member row.
   *
   * @returns Assignment where fragment matching qualifying parent engagements.
   */
  private buildFlexiTalentAssignmentEngagementWhere(): Prisma.EngagementAssignmentWhereInput {
    const engagementWhere: Prisma.EngagementWhereInput = {
      status: {
        in: FLEXI_QUALIFYING_ENGAGEMENT_STATUSES,
      },
    };

    if (this.flexiTalentIgnoredProjectIds.length) {
      engagementWhere.projectId = {
        notIn: this.flexiTalentIgnoredProjectIds,
      };
    }

    return {
      engagement: {
        ...engagementWhere,
      },
    };
  }

  /**
   * Checks whether Flexi Talent should hide a project.
   *
   * Direct engagement detail lookups use this after fetching by engagement id so
   * ignored-project engagements are reported the same way as missing rows.
   *
   * @param projectId Project id from an engagement row.
   * @returns True when the project id is configured for Flexi Talent exclusion.
   */
  private isFlexiTalentProjectIgnored(projectId: string): boolean {
    return this.flexiTalentIgnoredProjectIds.includes(projectId);
  }

  /**
   * Groups qualifying assignments by member id.
   *
   * @param assignments Assignment rows with engagements.
   * @returns Member assignment groups keyed by memberId.
   */
  private groupFlexiAssignmentsByMember(
    assignments: FlexiAssignmentWithEngagement[],
  ): FlexiMemberAssignmentGroup[] {
    const groupsByMemberId = new Map<string, FlexiAssignmentWithEngagement[]>();

    assignments.forEach((assignment) => {
      const group = groupsByMemberId.get(assignment.memberId) ?? [];

      group.push(assignment);
      groupsByMemberId.set(assignment.memberId, group);
    });

    return Array.from(groupsByMemberId.entries()).map(
      ([memberId, groupAssignments]) => ({
        memberId,
        assignments: groupAssignments,
      }),
    );
  }

  /**
   * Applies Flexi member bucket rules to grouped assignment rows.
   *
   * @param groups Member assignment groups.
   * @param bucket Requested member bucket.
   * @returns Groups matching the assigned/completed/total bucket semantics.
   */
  private filterFlexiMemberGroupsByBucket(
    groups: FlexiMemberAssignmentGroup[],
    bucket: FlexiMemberBucket,
  ): FlexiMemberAssignmentGroup[] {
    return groups.filter((group) => {
      const hasCurrent = group.assignments.some((assignment) =>
        ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
      );
      const hasCompletion = group.assignments.some((assignment) =>
        ASSIGNMENT_COMPLETION_STATUSES.includes(assignment.status),
      );

      if (bucket === FlexiMemberBucket.Assigned) {
        return hasCurrent;
      }

      if (bucket === FlexiMemberBucket.Completed) {
        return hasCompletion && !hasCurrent;
      }

      return hasCurrent || hasCompletion;
    });
  }

  /**
   * Selects the primary assignment for a Flexi member row or detail view.
   *
   * Current members choose assigned assignments before selected assignments,
   * then the current assignment ending soonest. Completed-only members choose
   * the latest completion-status assignment.
   *
   * @param assignments Assignment history for one member.
   * @returns Primary assignment selection, or undefined when none qualify.
   */
  private selectFlexiPrimaryAssignment(
    assignments: FlexiAssignmentWithEngagement[],
  ): FlexiPrimaryAssignment | undefined {
    const currentAssignments = assignments
      .filter((assignment) =>
        ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
      )
      .sort((left, right) =>
        this.compareFlexiAssignmentsEndingSoonest(left, right),
      );

    if (currentAssignments.length) {
      const assignment = currentAssignments[0];
      const timing = this.resolveFlexiTiming(assignment);

      return {
        assignment,
        isCurrentlyAssigned: true,
        daysRemaining: timing.timeLeftDays ?? null,
        latestCompletedAt: null,
      };
    }

    const completedAssignments = assignments
      .filter((assignment) =>
        ASSIGNMENT_COMPLETION_STATUSES.includes(assignment.status),
      )
      .sort((left, right) =>
        this.compareFlexiAssignmentsByCompletionDesc(left, right),
      );

    if (!completedAssignments.length) {
      return undefined;
    }

    const assignment = completedAssignments[0];

    return {
      assignment,
      isCurrentlyAssigned: false,
      daysRemaining: null,
      latestCompletedAt: this.resolveFlexiCompletionTimestamp(assignment),
    };
  }

  /**
   * Compares current assignments by status priority, then soonest resolved end date.
   *
   * @param left Left assignment with engagement.
   * @param right Right assignment with engagement.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiAssignmentsEndingSoonest(
    left: FlexiAssignmentWithEngagement,
    right: FlexiAssignmentWithEngagement,
  ): number {
    const statusComparison = this.compareFlexiCurrentAssignmentStatus(
      left.status,
      right.status,
    );

    if (statusComparison !== 0) {
      return statusComparison;
    }

    const leftEndTime =
      this.resolveFlexiEndDate(left)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const rightEndTime =
      this.resolveFlexiEndDate(right)?.getTime() ?? Number.MAX_SAFE_INTEGER;

    if (leftEndTime !== rightEndTime) {
      return leftEndTime - rightEndTime;
    }

    return this.compareFlexiAssignmentTies(left, right);
  }

  /**
   * Returns the Flexi priority for active assignment statuses.
   *
   * @param status Assignment status to rank.
   * @returns Lower value for statuses that should appear first.
   */
  private getFlexiCurrentStatusPriority(status: AssignmentStatus): number {
    switch (status) {
      case AssignmentStatus.ASSIGNED:
        return 0;
      case AssignmentStatus.SELECTED:
        return 1;
      default:
        return 2;
    }
  }

  /**
   * Compares active assignment statuses using Flexi primary-assignment priority.
   *
   * @param left Left assignment status.
   * @param right Right assignment status.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiCurrentAssignmentStatus(
    left: AssignmentStatus,
    right: AssignmentStatus,
  ): number {
    return (
      this.getFlexiCurrentStatusPriority(left) -
      this.getFlexiCurrentStatusPriority(right)
    );
  }

  /**
   * Compares completion assignments by newest resolved completion timestamp.
   *
   * @param left Left assignment with engagement.
   * @param right Right assignment with engagement.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiAssignmentsByCompletionDesc(
    left: FlexiAssignmentWithEngagement,
    right: FlexiAssignmentWithEngagement,
  ): number {
    const leftCompletedAt = this.resolveFlexiCompletionTimestamp(left);
    const rightCompletedAt = this.resolveFlexiCompletionTimestamp(right);
    const timestampComparison =
      rightCompletedAt.getTime() - leftCompletedAt.getTime();

    if (timestampComparison !== 0) {
      return timestampComparison;
    }

    return this.compareFlexiAssignmentTies(left, right);
  }

  /**
   * Provides stable assignment tie-breakers for Flexi sorting.
   *
   * @param left Left assignment.
   * @param right Right assignment.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiAssignmentTies(
    left: FlexiAssignmentTieRow,
    right: FlexiAssignmentTieRow,
  ): number {
    const titleComparison = left.engagement.title.localeCompare(
      right.engagement.title,
    );
    if (titleComparison !== 0) {
      return titleComparison;
    }

    const handleComparison = left.memberHandle.localeCompare(
      right.memberHandle,
    );
    if (handleComparison !== 0) {
      return handleComparison;
    }

    const memberIdComparison = left.memberId.localeCompare(right.memberId);
    if (memberIdComparison !== 0) {
      return memberIdComparison;
    }

    return left.id.localeCompare(right.id);
  }

  /**
   * Compares derived Flexi member list rows.
   *
   * @param left Left primary assignment selection.
   * @param right Right primary assignment selection.
   * @param query Sort query.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiMemberListRows(
    left: FlexiPrimaryAssignment,
    right: FlexiPrimaryAssignment,
    query: FlexiMemberListQueryDto,
  ): number {
    if (query.sortBy === FlexiMemberSortBy.Handle) {
      const direction = query.sortOrder === "desc" ? -1 : 1;
      const handleComparison = left.assignment.memberHandle.localeCompare(
        right.assignment.memberHandle,
      );

      if (handleComparison !== 0) {
        return handleComparison * direction;
      }
    } else {
      const timeComparison = this.compareFlexiMemberRowsByTime(
        left,
        right,
        query.bucket,
        query.sortOrder,
      );

      if (timeComparison !== 0) {
        return timeComparison;
      }
    }

    return this.compareFlexiAssignmentTies(left.assignment, right.assignment);
  }

  /**
   * Applies the Flexi time sort rules for member list rows.
   *
   * @param left Left primary assignment selection.
   * @param right Right primary assignment selection.
   * @param bucket Active bucket controls current/completed grouping rules.
   * @param sortOrder Requested time sort order within each member group.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiMemberRowsByTime(
    left: FlexiPrimaryAssignment,
    right: FlexiPrimaryAssignment,
    bucket: FlexiMemberBucket,
    sortOrder: "asc" | "desc",
  ): number {
    if (
      bucket === FlexiMemberBucket.Total &&
      left.isCurrentlyAssigned !== right.isCurrentlyAssigned
    ) {
      return left.isCurrentlyAssigned ? -1 : 1;
    }

    if (left.isCurrentlyAssigned && right.isCurrentlyAssigned) {
      return sortOrder === "desc"
        ? this.compareNullableNumbersDesc(
            left.daysRemaining,
            right.daysRemaining,
          )
        : this.compareNullableNumbersAsc(
            left.daysRemaining,
            right.daysRemaining,
          );
    }

    return sortOrder === "desc"
      ? this.compareNullableDatesAsc(
          left.latestCompletedAt,
          right.latestCompletedAt,
        )
      : this.compareNullableDatesDesc(
          left.latestCompletedAt,
          right.latestCompletedAt,
        );
  }

  /**
   * Assembles a Flexi member list item from a primary assignment.
   *
   * @param row Primary assignment selection.
   * @param projectNamesById Hydrated project names keyed by project id.
   * @returns Flexi member list item.
   */
  private buildFlexiMemberListItem(
    row: FlexiMemberListPrimaryAssignment,
    projectNamesById: Map<string, string>,
  ): FlexiMemberListItemDto {
    const assignment = row.assignment;
    const engagement = assignment.engagement;
    const projectName = this.normalizeProjectName(
      projectNamesById.get(engagement.projectId),
    );

    return {
      memberId: assignment.memberId,
      handle: assignment.memberHandle,
      assignmentId: assignment.id,
      primaryProjectId: engagement.projectId,
      ...(projectName ? { primaryProjectName: projectName } : {}),
      primaryEngagementId: engagement.id,
      primaryEngagementTitle: engagement.title,
      isCurrentlyAssigned: row.isCurrentlyAssigned,
      daysRemaining: row.daysRemaining ?? null,
      latestCompletedAt: row.latestCompletedAt ?? null,
      status: assignment.status,
      displayStatusLabel: this.getAssignmentDisplayStatusLabel(
        assignment.status,
      ),
    };
  }

  /**
   * Assembles one Flexi member history item.
   *
   * @param assignment Assignment with linked engagement.
   * @param projectNamesById Hydrated project names keyed by project id.
   * @param skillNamesById Hydrated skill names keyed by skill id.
   * @returns Flexi member history item.
   */
  private buildFlexiMemberHistoryItem(
    assignment: FlexiAssignmentWithEngagement,
    projectNamesById: Map<string, string>,
    skillNamesById: Map<string, string>,
  ): FlexiMemberHistoryItemDto {
    const engagement = assignment.engagement;
    const projectName = this.normalizeProjectName(
      projectNamesById.get(engagement.projectId),
    );
    const isCurrent = ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status);

    return {
      assignmentId: assignment.id,
      memberId: assignment.memberId,
      memberHandle: assignment.memberHandle,
      projectId: engagement.projectId,
      ...(projectName ? { projectName } : {}),
      engagementId: engagement.id,
      engagementTitle: engagement.title,
      status: assignment.status,
      displayStatusLabel: this.getAssignmentDisplayStatusLabel(
        assignment.status,
      ),
      isCurrent,
      skills: this.buildFlexiSkillReferences(
        engagement.requiredSkills,
        skillNamesById,
      ),
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      ...this.resolveFlexiTiming(assignment),
      completedAt: isCurrent
        ? null
        : this.resolveFlexiCompletionTimestamp(assignment),
      ...this.resolveFlexiDuration(assignment, engagement),
    };
  }

  /**
   * Compares Flexi member history rows with current rows first.
   *
   * @param left Left history item.
   * @param right Right history item.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareFlexiMemberHistoryRows(
    left: FlexiMemberHistoryItemDto,
    right: FlexiMemberHistoryItemDto,
  ): number {
    if (left.isCurrent !== right.isCurrent) {
      return left.isCurrent ? -1 : 1;
    }

    if (left.isCurrent && right.isCurrent) {
      const statusComparison = this.compareFlexiCurrentAssignmentStatus(
        left.status,
        right.status,
      );

      if (statusComparison !== 0) {
        return statusComparison;
      }

      const endComparison = this.compareNullableDatesAsc(
        left.resolvedEndDate,
        right.resolvedEndDate,
      );

      if (endComparison !== 0) {
        return endComparison;
      }
    } else {
      const completedComparison = this.compareNullableDatesDesc(
        left.completedAt,
        right.completedAt,
      );

      if (completedComparison !== 0) {
        return completedComparison;
      }
    }

    const titleComparison = left.engagementTitle.localeCompare(
      right.engagementTitle,
    );
    if (titleComparison !== 0) {
      return titleComparison;
    }

    const handleComparison = left.memberHandle.localeCompare(
      right.memberHandle,
    );
    if (handleComparison !== 0) {
      return handleComparison;
    }

    return left.assignmentId.localeCompare(right.assignmentId);
  }

  /**
   * Maps raw assignment status to the Flexi UI display label.
   *
   * @param status Raw assignment status.
   * @returns Human-readable display label.
   */
  private getAssignmentDisplayStatusLabel(status: AssignmentStatus): string {
    switch (status) {
      case AssignmentStatus.SELECTED:
        return "Selected";
      case AssignmentStatus.OFFER_REJECTED:
        return "Offer Rejected";
      case AssignmentStatus.ASSIGNED:
        return "Assigned";
      case AssignmentStatus.COMPLETED:
        return "Completed";
      case AssignmentStatus.TERMINATED:
        return "Terminated";
      default:
        return status;
    }
  }

  /**
   * Resolves normalized duration fields for Flexi rows.
   *
   * Assignment durationMonths takes precedence. When absent, the linked
   * engagement duration fields are used so the UI can render duration text
   * without another lookup.
   *
   * @param assignment Optional assignment row.
   * @param engagement Linked engagement.
   * @returns Duration fields and display label.
   */
  private resolveFlexiDuration(
    assignment: EngagementAssignment | undefined,
    engagement: Engagement,
  ): FlexiDurationFields {
    const durationMonths =
      assignment?.durationMonths ?? engagement.durationMonths ?? null;
    const durationWeeks =
      durationMonths === null ? (engagement.durationWeeks ?? null) : null;
    const durationStartDate = engagement.durationStartDate ?? null;
    const durationEndDate = engagement.durationEndDate ?? null;

    if (durationMonths !== null) {
      return {
        durationMonths,
        durationWeeks: null,
        durationStartDate,
        durationEndDate,
        durationLabel: this.formatFlexiDurationLabel(durationMonths, "month"),
      };
    }

    if (durationWeeks !== null) {
      return {
        durationMonths: null,
        durationWeeks,
        durationStartDate,
        durationEndDate,
        durationLabel: this.formatFlexiDurationLabel(durationWeeks, "week"),
      };
    }

    if (durationStartDate && durationEndDate) {
      return {
        durationMonths: null,
        durationWeeks: null,
        durationStartDate,
        durationEndDate,
        durationLabel: `${this.formatDateOnly(durationStartDate)} to ${this.formatDateOnly(durationEndDate)}`,
      };
    }

    return {
      durationMonths: null,
      durationWeeks: null,
      durationStartDate,
      durationEndDate,
      durationLabel: null,
    };
  }

  /**
   * Resolves assignment timing fields for Flexi payloads.
   *
   * @param assignment Assignment row.
   * @returns Resolved end date, whole days remaining, and overdue flag.
   */
  private resolveFlexiTiming(
    assignment: EngagementAssignment,
  ): FlexiTimingFields {
    const resolvedEndDate = this.resolveFlexiEndDate(assignment);
    const timeLeftDays = resolvedEndDate
      ? this.calculateFlexiTimeLeftDays(resolvedEndDate)
      : null;

    return {
      resolvedEndDate,
      timeLeftDays,
      isOverdue: timeLeftDays !== null && timeLeftDays < 0,
    };
  }

  /**
   * Resolves assignment end date for Flexi timing.
   *
   * Explicit assignment endDate wins. Otherwise, startDate plus assignment
   * durationMonths is used.
   *
   * @param assignment Assignment row.
   * @returns Resolved end date or null.
   */
  private resolveFlexiEndDate(assignment: EngagementAssignment): Date | null {
    if (assignment.endDate) {
      return assignment.endDate;
    }

    const durationMonths = assignment.durationMonths ?? null;

    if (!assignment.startDate || durationMonths === null) {
      return null;
    }

    const resolvedEndDate = new Date(assignment.startDate.getTime());
    resolvedEndDate.setUTCMonth(resolvedEndDate.getUTCMonth() + durationMonths);

    return resolvedEndDate;
  }

  /**
   * Resolves completion timestamp for past Flexi assignments.
   *
   * @param assignment Assignment row.
   * @returns Explicit or derived end date, otherwise updatedAt.
   */
  private resolveFlexiCompletionTimestamp(
    assignment: EngagementAssignment,
  ): Date {
    return this.resolveFlexiEndDate(assignment) ?? assignment.updatedAt;
  }

  /**
   * Calculates whole days left from today to a resolved end date.
   *
   * @param resolvedEndDate End date to compare against today's UTC date.
   * @returns Whole-day integer that may be negative.
   */
  private calculateFlexiTimeLeftDays(resolvedEndDate: Date): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    return Math.round(
      (this.getUtcDateOnlyTime(resolvedEndDate) -
        this.getUtcDateOnlyTime(new Date())) /
        millisecondsPerDay,
    );
  }

  /**
   * Converts a date to a UTC date-only timestamp.
   *
   * @param date Date to normalize.
   * @returns Milliseconds at UTC midnight for the same calendar date.
   */
  private getUtcDateOnlyTime(date: Date): number {
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );
  }

  /**
   * Formats a plural duration label.
   *
   * @param value Duration number.
   * @param unit Singular unit name.
   * @returns Display label such as `1 month` or `3 months`.
   */
  private formatFlexiDurationLabel(value: number, unit: string): string {
    return `${value} ${unit}${value === 1 ? "" : "s"}`;
  }

  /**
   * Formats date-only values for duration labels.
   *
   * @param date Date to format.
   * @returns ISO date string without time.
   */
  private formatDateOnly(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  /**
   * Compares nullable day counts ascending with nulls last.
   *
   * @param left Left numeric value.
   * @param right Right numeric value.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareNullableNumbersAsc(
    left?: number | null,
    right?: number | null,
  ): number {
    if (left === null || left === undefined) {
      return right === null || right === undefined ? 0 : 1;
    }
    if (right === null || right === undefined) {
      return -1;
    }

    return left - right;
  }

  /**
   * Compares nullable day counts descending with nulls last.
   *
   * @param left Left numeric value.
   * @param right Right numeric value.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareNullableNumbersDesc(
    left?: number | null,
    right?: number | null,
  ): number {
    if (left === null || left === undefined) {
      return right === null || right === undefined ? 0 : 1;
    }
    if (right === null || right === undefined) {
      return -1;
    }

    return right - left;
  }

  /**
   * Compares nullable dates ascending with nulls last.
   *
   * @param left Left date.
   * @param right Right date.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareNullableDatesAsc(
    left?: Date | null,
    right?: Date | null,
  ): number {
    if (!left) {
      return right ? 1 : 0;
    }
    if (!right) {
      return -1;
    }

    return left.getTime() - right.getTime();
  }

  /**
   * Compares nullable dates descending with nulls last.
   *
   * @param left Left date.
   * @param right Right date.
   * @returns Negative, positive, or zero comparison result.
   */
  private compareNullableDatesDesc(
    left?: Date | null,
    right?: Date | null,
  ): number {
    if (!left) {
      return right ? 1 : 0;
    }
    if (!right) {
      return -1;
    }

    return right.getTime() - left.getTime();
  }

  private applyAssignmentFields<
    T extends {
      assignments?: EngagementAssignment[];
    },
  >(
    engagement: T,
  ): T & {
    assignedMemberId?: string;
    assignedMemberHandle?: string;
    assignedMembers?: string[];
    assignedMemberHandles?: string[];
  } {
    if (!engagement.assignments?.length) {
      return engagement;
    }

    const activeAssignments = engagement.assignments.filter((assignment) =>
      ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status),
    );

    if (!activeAssignments.length) {
      return engagement;
    }

    const sortedActiveAssignments = [...activeAssignments].sort((a, b) => {
      const timeA = a.createdAt.getTime();
      const timeB = b.createdAt.getTime();
      if (timeA !== timeB) {
        return timeA - timeB;
      }
      return a.id.localeCompare(b.id);
    });

    return {
      ...engagement,
      assignedMemberId: sortedActiveAssignments[0]?.memberId,
      assignedMemberHandle: sortedActiveAssignments[0]?.memberHandle,
      assignedMembers: sortedActiveAssignments.map(
        (assignment) => assignment.memberId,
      ),
      assignedMemberHandles: sortedActiveAssignments.map(
        (assignment) => assignment.memberHandle,
      ),
    };
  }

  private normalizeCreatorUserId(value?: string | null): string | undefined {
    if (!value) {
      return undefined;
    }

    const normalized = value.trim();
    if (!normalized || !USER_ID_PATTERN.test(normalized)) {
      return undefined;
    }

    return normalized;
  }

  private async hydrateCreatorEmails<T extends Engagement>(
    engagements: T[],
  ): Promise<Array<T & { createdByEmail: string | null }>> {
    if (!engagements.length) {
      return engagements as Array<T & { createdByEmail: string | null }>;
    }

    const userIds = Array.from(
      new Set(
        engagements
          .map((engagement) =>
            this.normalizeCreatorUserId(engagement.createdBy),
          )
          .filter((value): value is string => Boolean(value)),
      ),
    );

    let emailByUserId = new Map<string, string>();
    if (userIds.length) {
      try {
        emailByUserId =
          await this.memberService.getMemberEmailsByUserIds(userIds);
      } catch (error) {
        this.logger.warn("Failed to hydrate engagement creator emails.", {
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    return engagements.map((engagement) => {
      const existingEmail = (engagement as { createdByEmail?: string | null })
        .createdByEmail;
      if (typeof existingEmail === "string" && existingEmail.trim()) {
        return { ...engagement, createdByEmail: existingEmail };
      }

      const normalizedCreatedBy = this.normalizeCreatorUserId(
        engagement.createdBy,
      );
      const createdByEmail = normalizedCreatedBy
        ? (emailByUserId.get(normalizedCreatedBy) ?? null)
        : null;

      return { ...engagement, createdByEmail };
    });
  }

  private normalizeProjectId(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }

    const normalizedProjectId = value.trim();
    return normalizedProjectId || undefined;
  }

  private normalizeProjectName(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }

    const normalizedProjectName = value.trim();
    return normalizedProjectName || undefined;
  }

  private async hydrateProjectDetails<
    T extends {
      project?: {
        id?: string | null;
        name?: string | null;
      };
      projectId: string;
      projectName?: string | null;
    },
  >(
    engagements: T[],
  ): Promise<
    Array<
      T & {
        project: EngagementProjectReference;
        projectName?: string;
      }
    >
  > {
    if (!engagements.length) {
      return engagements as Array<
        T & {
          project: EngagementProjectReference;
          projectName?: string;
        }
      >;
    }

    const projectIds = Array.from(
      new Set(
        engagements
          .map((engagement) => this.normalizeProjectId(engagement.projectId))
          .filter((value): value is string => Boolean(value)),
      ),
    );

    if (!projectIds.length) {
      return engagements as Array<
        T & {
          project: EngagementProjectReference;
          projectName?: string;
        }
      >;
    }

    let projectNameByProjectId = new Map<string, string>();

    try {
      projectNameByProjectId =
        await this.projectService.getProjectNamesByIds(projectIds);
    } catch (error) {
      this.logger.warn("Failed to hydrate engagement project names.", {
        error: error instanceof Error ? error.message : error,
      });
    }

    return engagements.map((engagement) => {
      const normalizedProjectId = this.normalizeProjectId(engagement.projectId);
      if (!normalizedProjectId) {
        return engagement as T & {
          project: EngagementProjectReference;
          projectName?: string;
        };
      }

      const existingProject = engagement.project;
      const existingProjectName =
        this.normalizeProjectName(engagement.projectName) ??
        this.normalizeProjectName(existingProject?.name);
      const resolvedProjectName =
        existingProjectName ??
        this.normalizeProjectName(
          projectNameByProjectId.get(normalizedProjectId),
        );

      const project: EngagementProjectReference = {
        id: this.normalizeProjectId(existingProject?.id) ?? normalizedProjectId,
      };

      if (resolvedProjectName) {
        project.name = resolvedProjectName;
      }

      return {
        ...engagement,
        project,
        ...(resolvedProjectName ? { projectName: resolvedProjectName } : {}),
      };
    });
  }

  private assertNonBlankField(value: unknown, fieldName: string): void {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new BadRequestException(
        `${fieldName} cannot be empty or contain only whitespace.`,
      );
    }
  }

  private assertNonEmptyArrayField(value: unknown, fieldName: string): void {
    if (!Array.isArray(value) || value.length === 0) {
      throw new BadRequestException(
        `${fieldName} must contain at least one item.`,
      );
    }
  }

  private async assertProjectExists(projectId: string): Promise<void> {
    const exists = await this.projectService.validateProjectExists(projectId);
    if (!exists) {
      throw new NotFoundException(ERROR_MESSAGES.ProjectNotFound);
    }
  }

  /**
   * Ensures engagement project reassignment is allowed for the current project.
   *
   * Project reassignment is blocked when the current project already has a
   * billing account, because that project is financially bound.
   *
   * @param currentProjectId Existing project id on the engagement.
   * @returns Resolves when the engagement project can be changed.
   * @throws BadRequestException When the current project has a billing account.
   */
  private async assertProjectReassignmentAllowed(
    currentProjectId: string,
  ): Promise<void> {
    const hasBillingAccount =
      await this.projectService.hasBillingAccountAssigned(currentProjectId);

    if (hasBillingAccount) {
      throw new BadRequestException(
        ERROR_MESSAGES.ProjectChangeBlockedByBillingAccount,
      );
    }
  }

  private async assertSkillsValid(skillIds: string[]): Promise<void> {
    const { invalid } = await this.skillsService.validateSkillsExist(skillIds);
    if (invalid.length) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.InvalidSkills}: ${invalid.join(", ")}`,
      );
    }
  }

  private normalizeDate(dateValue?: string | Date): Date | undefined {
    if (!dateValue) {
      return undefined;
    }

    return new Date(dateValue);
  }

  private emptyPaginatedResponse(
    page: number,
    perPage: number,
  ): PaginatedResponse<Engagement> {
    return {
      data: [],
      meta: {
        page,
        perPage,
        totalCount: 0,
        totalPages: 0,
      },
    };
  }

  private resolveProjectScope(query: EngagementQueryDto): {
    projectId?: string;
    projectIds?: string[];
    isEmpty: boolean;
  } {
    const normalizedProjectId = this.normalizeProjectId(query.projectId);
    const normalizedProjectIds = Array.from(
      new Set(
        (query.projectIds ?? [])
          .map((projectId) => this.normalizeProjectId(projectId))
          .filter((value): value is string => Boolean(value)),
      ),
    );

    return {
      projectId: normalizedProjectId,
      projectIds: normalizedProjectIds.length
        ? normalizedProjectIds
        : undefined,
      isEmpty: false,
    };
  }
}
