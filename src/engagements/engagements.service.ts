import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  Engagement,
  EngagementAssignment,
  EngagementStatus,
  Role,
  Prisma,
  Workload,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { MemberService } from "../integrations/member.service";
import { ProjectService } from "../integrations/project.service";
import { SkillsService } from "../integrations/skills.service";
import {
  CreateEngagementDto,
  ENGAGEMENT_SORT_FIELDS,
  EngagementQueryDto,
  EngagementSortBy,
  PaginatedResponse,
  UpdateEngagementDto,
} from "./dto";
import { ERROR_MESSAGES } from "../common/constants";
import { getUserIdentifier } from "../common/user.util";

@Injectable()
export class EngagementsService {
  private readonly logger = new Logger(EngagementsService.name);

  constructor(
    private readonly db: DbService,
    private readonly projectService: ProjectService,
    private readonly skillsService: SkillsService,
    private readonly memberService: MemberService,
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

    await this.assertProjectExists(createDto.projectId);
    await this.assertSkillsValid(createDto.requiredSkills);

    const applicationDeadline = this.ensureFutureDate(
      createDto.applicationDeadline,
    );

    const {
      durationValidation: _durationValidation,
      assignedMemberId: _assignedMemberId,
      assignedMemberHandle: _assignedMemberHandle,
      ...payload
    } = createDto;

    const assignmentDetails = createDto.isPrivate
      ? await this.resolveAssignmentDetails(
          createDto.assignedMemberId,
          createDto.assignedMemberHandle,
        )
      : null;

    if (createDto.isPrivate) {
      if (!assignmentDetails) {
        throw new BadRequestException(
          "Private engagements must have at least one assigned member",
        );
      }
    }

    return this.db.$transaction(async (tx) => {
      const engagement = await tx.engagement.create({
        data: {
          id: nanoid(),
          ...payload,
          durationStartDate: this.normalizeDate(payload.durationStartDate),
          durationEndDate: this.normalizeDate(payload.durationEndDate),
          applicationDeadline,
          createdBy: userIdentifier,
        },
      });

      if (createDto.isPrivate && assignmentDetails) {
        await tx.engagementAssignment.create({
          data: {
            id: nanoid(),
            engagementId: engagement.id,
            memberId: assignmentDetails.memberId,
            memberHandle: assignmentDetails.memberHandle,
          },
        });

        const assignmentCount = await tx.engagementAssignment.count({
          where: { engagementId: engagement.id },
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

      const engagementWithAssignments = await tx.engagement.findUnique({
        where: { id: engagement.id },
        include: { assignments: true },
      });

      if (!engagementWithAssignments) {
        throw new NotFoundException("Engagement not found.");
      }

      return this.applyAssignmentFields(engagementWithAssignments);
    });
  }

  async findAll(
    query: EngagementQueryDto,
  ): Promise<PaginatedResponse<Engagement>> {
    this.logger.debug("Listing engagements", {
      projectId: query.projectId,
      status: query.status,
      search: query.search,
    });

    const where: Prisma.EngagementWhereInput = { isPrivate: false };
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
    if (query.countries?.length) {
      locationFilters.push({ countries: { hasSome: query.countries } });
    }
    if (query.timeZones?.length) {
      locationFilters.push({ timeZones: { hasSome: query.timeZones } });
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
          assignments: true,
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

    return {
      data: engagements,
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
      assignments: { some: { memberId: userIdentifier } },
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
    if (query.countries?.length) {
      locationFilters.push({ countries: { hasSome: query.countries } });
    }
    if (query.timeZones?.length) {
      locationFilters.push({ timeZones: { hasSome: query.timeZones } });
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
          assignments: true,
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

    return {
      data: engagements,
      meta: {
        page,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<Engagement> {
    const engagement = await this.db.engagement.findUnique({
      where: { id },
      include: { assignments: true },
    });
    if (!engagement) {
      throw new NotFoundException("Engagement not found.");
    }

    this.logger.debug("Raw engagement", engagement);

    const engagementWithAssignments =
      this.applyAssignmentFields(engagement);

    return {
      ...engagementWithAssignments,
      role: engagementWithAssignments.role
        ? (engagementWithAssignments.role.toString() as Role)
        : null,
      workload: engagementWithAssignments.workload
        ? (engagementWithAssignments.workload.toString() as Workload)
        : null,
      compensationRange:
        engagementWithAssignments.compensationRange ?? null,
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
    const existingEngagement = await this.findOne(id);

    if (updateDto.projectId) {
      await this.assertProjectExists(updateDto.projectId);
    }

    if (updateDto.requiredSkills) {
      await this.assertSkillsValid(updateDto.requiredSkills);
    }

    const { durationValidation: _durationValidation, ...payload } = updateDto;

    const assignedMemberId = payload.assignedMemberId?.trim();
    if (payload.assignedMemberId !== undefined && !assignedMemberId) {
      throw new BadRequestException("Assigned member ID cannot be blank.");
    }

    const assignedMemberHandle = payload.assignedMemberHandle?.trim();
    if (payload.assignedMemberHandle !== undefined && !assignedMemberHandle) {
      throw new BadRequestException("Assigned member handle cannot be blank.");
    }

    const existingAssignments =
      (
        existingEngagement as Engagement & {
          assignments?: EngagementAssignment[];
        }
      ).assignments ?? [];
    const existingAssignmentCount = existingAssignments.length;
    const requiredMemberCount =
      payload.requiredMemberCount ??
      existingEngagement.requiredMemberCount ??
      undefined;

    if (
      payload.requiredMemberCount !== undefined &&
      existingAssignmentCount > payload.requiredMemberCount
    ) {
      throw new BadRequestException(
        "Assigned member count exceeds required member count.",
      );
    }

    const willBePrivate =
      payload.isPrivate === true ||
      (payload.isPrivate === undefined && existingEngagement.isPrivate === true);

    if (willBePrivate) {
      const hasAssignedMember =
        Boolean(assignedMemberId) ||
        Boolean(assignedMemberHandle) ||
        (payload.assignedMemberId === undefined &&
          payload.assignedMemberHandle === undefined &&
          existingAssignmentCount > 0);

      if (!hasAssignedMember) {
        throw new BadRequestException(
          "Private engagements must have at least one assigned member",
        );
      }
    }

    const shouldUpsertAssignment =
      willBePrivate &&
      (payload.assignedMemberId !== undefined ||
        payload.assignedMemberHandle !== undefined);
    const assignmentDetails = shouldUpsertAssignment
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
    if (payload.applicationDeadline !== undefined) {
      data.applicationDeadline = this.ensureFutureDate(
        payload.applicationDeadline,
      );
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
      if (shouldUpsertAssignment && assignmentDetails) {
        if (requiredMemberCount !== undefined) {
          const existingAssignment = await tx.engagementAssignment.findUnique({
            where: {
              engagementId_memberId: {
                engagementId: id,
                memberId: assignmentDetails.memberId,
              },
            },
          });

          if (!existingAssignment) {
            const assignmentCount = await tx.engagementAssignment.count({
              where: { engagementId: id },
            });
            if (assignmentCount >= requiredMemberCount) {
              throw new BadRequestException(
                "Assigned member count exceeds required member count.",
              );
            }
          }
        }

        await tx.engagementAssignment.upsert({
          where: {
            engagementId_memberId: {
              engagementId: id,
              memberId: assignmentDetails.memberId,
            },
          },
          create: {
            id: nanoid(),
            engagementId: id,
            memberId: assignmentDetails.memberId,
            memberHandle: assignmentDetails.memberHandle,
          },
          update: {
            memberHandle: assignmentDetails.memberHandle,
          },
        });
      }

      return tx.engagement.update({
        where: { id },
        data,
        include: { assignments: true },
      });
    });

    return this.applyAssignmentFields(updatedEngagement);
  }

  async remove(id: string): Promise<void> {
    this.logger.debug("Removing engagement", { id });
    await this.findOne(id);
    await this.db.engagement.delete({ where: { id } });
  }

  async removeAssignment(
    engagementId: string,
    assignmentId: string,
  ): Promise<void> {
    this.logger.debug("Removing engagement assignment", {
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

      if (engagement.isPrivate && engagement.assignments.length <= 1) {
        throw new BadRequestException(
          "Private engagements must have at least one assigned member",
        );
      }

      await tx.engagementAssignment.delete({ where: { id: assignmentId } });
    });
  }

  async findAllActive(): Promise<Engagement[]> {
    this.logger.debug("Listing active engagements");
    const engagements = await this.db.engagement.findMany({
      where: {
        isPrivate: false,
        status: EngagementStatus.OPEN,
        applicationDeadline: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
      include: { assignments: true },
    });

    return engagements.map((engagement) =>
      this.applyAssignmentFields(engagement),
    );
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

  private applyAssignmentFields<T extends Engagement & {
    assignments?: EngagementAssignment[];
  }>(
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

    const sortedAssignments = [...engagement.assignments].sort((a, b) => {
      const timeA = a.createdAt.getTime();
      const timeB = b.createdAt.getTime();
      if (timeA !== timeB) {
        return timeA - timeB;
      }
      return a.id.localeCompare(b.id);
    });

    return {
      ...engagement,
      assignedMemberId: sortedAssignments[0]?.memberId,
      assignedMemberHandle: sortedAssignments[0]?.memberHandle,
      assignedMembers: sortedAssignments.map(
        (assignment) => assignment.memberId,
      ),
      assignedMemberHandles: sortedAssignments.map(
        (assignment) => assignment.memberHandle,
      ),
    };
  }

  private async assertProjectExists(projectId: string): Promise<void> {
    const exists = await this.projectService.validateProjectExists(projectId);
    if (!exists) {
      throw new NotFoundException(ERROR_MESSAGES.ProjectNotFound);
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

  private ensureFutureDate(dateValue: string | Date): Date {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
      throw new BadRequestException(ERROR_MESSAGES.ApplicationDeadlineInPast);
    }

    return parsedDate;
  }

  private normalizeDate(dateValue?: string | Date): Date | undefined {
    if (!dateValue) {
      return undefined;
    }

    return new Date(dateValue);
  }
}
