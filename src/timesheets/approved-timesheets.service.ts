import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { Prisma, TimesheetEntryStatus } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/constants";
import { getTestProjectIds } from "../common/project-ids.util";
import { DbService } from "../db/db.service";
import { FinanceService } from "../integrations/finance.service";
import { MemberService } from "../integrations/member.service";
import { ProjectService } from "../integrations/project.service";
import {
  ApprovedTimesheetListResponseDto,
  ApprovedTimesheetQueryDto,
  ApprovedTimesheetRowDto,
} from "./dto";
import { TimesheetAccessService } from "./timesheet-access.service";

const approvedEntrySelect = {
  id: true,
  workDate: true,
  hoursWorked: true,
  approvedAt: true,
  approvedBy: true,
  approvedByHandle: true,
  approvalComment: true,
  assignment: {
    select: {
      id: true,
      engagementId: true,
      memberId: true,
      memberHandle: true,
      agreementRate: true,
      ratePerHour: true,
      paymentCycle: true,
      standardHoursPerDay: true,
      standardHoursPerWeek: true,
      totalHours: true,
      engagement: { select: { title: true, projectId: true } },
    },
  },
} satisfies Prisma.EngagementTimesheetEntrySelect;

type ApprovedEntry = Prisma.EngagementTimesheetEntryGetPayload<{
  select: typeof approvedEntrySelect;
}>;

type ApprovedEntryAssignment = ApprovedEntry["assignment"];

interface ApprovalGroup {
  id: string;
  assignment: ApprovedEntryAssignment;
  entries: ApprovedEntry[];
}

/** Formats a stored date column back to the YYYY-MM-DD the API speaks. */
function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

/**
 * The approved-but-unpaid timesheet list behind the Work App's Approved Timesheets tab, which is
 * where Admins and TMs pick timesheets to pay across engagements.
 */
@Injectable()
export class ApprovedTimesheetsService {
  private readonly logger = new Logger(ApprovedTimesheetsService.name);

  constructor(
    private readonly db: DbService,
    private readonly access: TimesheetAccessService,
    private readonly memberService: MemberService,
    private readonly financeService: FinanceService,
    private readonly projectService: ProjectService,
  ) {}

  /**
   * One row per approval: the unpaid entries an approver approved together on one assignment. Entries
   * approved in one action share an `approvedAt`, so that is what groups them.
   *
   * An administrator sees every engagement. A TM sees only engagements on projects they are a member
   * of, resolved with their own token so the projects API applies its own membership rules.
   */
  async findApprovedTimesheets(
    query: ApprovedTimesheetQueryDto,
    authUser?: Record<string, any>,
    authorizationHeader?: string | string[],
  ): Promise<ApprovedTimesheetListResponseDto> {
    const page = query.page;
    const perPage = query.perPage;
    const isAdministrator = this.access.isTimesheetAdmin(authUser);

    if (!isAdministrator && !this.access.isTimesheetTm(authUser)) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedApprovedTimesheetList,
      );
    }

    let projectIds: string[] | undefined;
    if (!isAdministrator) {
      projectIds =
        await this.projectService.getMemberProjectIdsForUser(
          authorizationHeader,
        );

      // Fails closed: a TM whose projects could not be read sees nothing rather than everything.
      if (!projectIds.length) {
        return this.toResponse([], 0, page, perPage);
      }
    }

    const engagementFilters: Prisma.EngagementWhereInput = {};
    if (query.engagement) {
      engagementFilters.title = {
        contains: query.engagement,
        mode: "insensitive",
      };
    }
    const testProjectIds = query.excludeTestProjects ? getTestProjectIds() : [];
    if (projectIds || testProjectIds.length) {
      engagementFilters.projectId = {
        ...(projectIds ? { in: projectIds } : {}),
        ...(testProjectIds.length ? { notIn: testProjectIds } : {}),
      };
    }

    const assignmentFilters: Prisma.EngagementAssignmentWhereInput = {};
    if (query.assignee) {
      assignmentFilters.memberHandle = {
        contains: query.assignee,
        mode: "insensitive",
      };
    }
    if (Object.keys(engagementFilters).length) {
      assignmentFilters.engagement = engagementFilters;
    }

    // Unpaid approved entries are a short-lived backlog - they leave this list once paid - so the
    // whole filtered set is grouped in memory; rows cannot be paginated before they are grouped.
    const entries = await this.db.engagementTimesheetEntry.findMany({
      where: {
        status: TimesheetEntryStatus.APPROVED,
        paidPaymentReference: null,
        ...(Object.keys(assignmentFilters).length
          ? { assignment: assignmentFilters }
          : {}),
      },
      select: approvedEntrySelect,
      orderBy: { workDate: "asc" },
    });

    const groups = this.groupByApproval(entries);
    const pageGroups = groups.slice((page - 1) * perPage, page * perPage);
    const data = await this.toRows(pageGroups);

    return this.toResponse(data, groups.length, page, perPage);
  }

  private groupByApproval(entries: ApprovedEntry[]): ApprovalGroup[] {
    const groupsById = new Map<string, ApprovalGroup>();

    entries.forEach((entry) => {
      const assignment = entry.assignment;
      const id = [
        assignment.id,
        entry.approvedAt?.toISOString() ?? "",
        entry.approvedBy ?? "",
      ].join(":");
      const group = groupsById.get(id);

      if (group) {
        group.entries.push(entry);
      } else {
        groupsById.set(id, { id, assignment, entries: [entry] });
      }
    });

    return Array.from(groupsById.values()).sort(
      (left, right) =>
        left.assignment.engagement.title.localeCompare(
          right.assignment.engagement.title,
        ) ||
        left.assignment.memberHandle.localeCompare(
          right.assignment.memberHandle,
        ) ||
        left.entries[0].workDate.getTime() -
          right.entries[0].workDate.getTime(),
    );
  }

  private async toRows(
    groups: ApprovalGroup[],
  ): Promise<ApprovedTimesheetRowDto[]> {
    if (!groups.length) {
      return [];
    }

    const assignments = new Map(
      groups.map((group) => [group.assignment.id, group.assignment]),
    );
    const approverIds = groups
      .map((group) => group.entries[0].approvedBy)
      .filter((userId): userId is string => Boolean(userId));
    const [approverNames, projectNames, hoursLeftByAssignment] =
      await Promise.all([
        this.resolveMemberNames(approverIds),
        this.resolveProjectNames(
          Array.from(assignments.values()).map(
            (assignment) => assignment.engagement.projectId,
          ),
        ),
        this.resolveHoursLeft(Array.from(assignments.values())),
      ]);

    return groups.map((group) => {
      const { assignment, entries } = group;
      const approval = entries[0];
      // Summed in hundredths so float drift cannot leak into an hours figure.
      const hundredths = entries.reduce(
        (total, entry) =>
          total + Math.round(Number(entry.hoursWorked.toString()) * 100),
        0,
      );

      return {
        id: group.id,
        engagementId: assignment.engagementId,
        engagementTitle: assignment.engagement.title,
        projectId: assignment.engagement.projectId,
        projectName: projectNames.get(assignment.engagement.projectId) ?? null,
        assignmentId: assignment.id,
        assigneeId: assignment.memberId,
        assigneeHandle: assignment.memberHandle,
        agreementRate: assignment.agreementRate ?? null,
        ratePerHour: assignment.ratePerHour ?? null,
        paymentCycle: assignment.paymentCycle,
        standardHoursPerDay: assignment.standardHoursPerDay ?? null,
        standardHoursPerWeek: assignment.standardHoursPerWeek ?? null,
        hoursLeft: hoursLeftByAssignment.get(assignment.id) ?? null,
        workPeriodStart: toDateString(entries[0].workDate),
        workPeriodEnd: toDateString(entries[entries.length - 1].workDate),
        hours: hundredths / 100,
        entryIds: entries.map((entry) => entry.id),
        approvedAt: approval.approvedAt as Date,
        approvedBy: approval.approvedBy ?? null,
        approvedByHandle: approval.approvedByHandle ?? null,
        approvedByName: approval.approvedBy
          ? (approverNames.get(approval.approvedBy) ?? null)
          : null,
        approvalComment: approval.approvalComment ?? null,
      };
    });
  }

  /**
   * Total hours minus processed payment hours, per assignment on the page. Mirrors the hours left the
   * timesheet view and the Work App's Assignees page show.
   */
  private async resolveHoursLeft(
    assignments: ApprovedEntryAssignment[],
  ): Promise<Map<string, number>> {
    const hoursLeft = new Map<string, number>();

    await Promise.all(
      assignments.map(async (assignment) => {
        const totalHours = assignment.totalHours;
        if (!totalHours || totalHours <= 0) {
          return;
        }

        const processedHours =
          await this.financeService.getProcessedPaymentHours(assignment.id);
        if (processedHours !== null) {
          hoursLeft.set(
            assignment.id,
            Math.round((totalHours - processedHours) * 100) / 100,
          );
        }
      }),
    );

    return hoursLeft;
  }

  private async resolveMemberNames(
    userIds: string[],
  ): Promise<Map<string, string>> {
    try {
      return await this.memberService.getMemberNamesByUserIds(userIds);
    } catch (error) {
      // A display name is not worth failing the list over; the client falls back to the handle.
      this.logger.warn(
        `Failed to resolve approver names: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return new Map();
    }
  }

  private async resolveProjectNames(
    projectIds: string[],
  ): Promise<Map<string, string>> {
    try {
      return await this.projectService.getProjectNamesByIds(projectIds);
    } catch (error) {
      this.logger.warn(
        `Failed to resolve project names: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return new Map();
    }
  }

  private toResponse(
    data: ApprovedTimesheetRowDto[],
    totalCount: number,
    page: number,
    perPage: number,
  ): ApprovedTimesheetListResponseDto {
    return {
      data,
      meta: {
        page,
        perPage,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage) || 0,
      },
    };
  }
}
