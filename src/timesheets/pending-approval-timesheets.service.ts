import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Prisma, TimesheetEntryStatus } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/constants";
import { getTestProjectIds } from "../common/project-ids.util";
import { DbService } from "../db/db.service";
import {
  PendingApprovalReminderRecipientDto,
  PendingApprovalTimesheetListResponseDto,
  PendingApprovalTimesheetQueryDto,
  PendingApprovalTimesheetRowDto,
  SendPendingApprovalRemindersDto,
  SendPendingApprovalRemindersResponseDto,
} from "./dto";
import {
  EngagementManagerSummary,
  TimesheetAccessService,
} from "./timesheet-access.service";
import { TimesheetEmailService } from "./timesheet-email.service";
import { parseWorkDateFilter, toWorkDateString } from "./timesheet-dates.util";

const submittedEntrySelect = {
  id: true,
  workDate: true,
  hoursWorked: true,
  submittedAt: true,
  submittedBy: true,
  assignment: {
    select: {
      id: true,
      engagementId: true,
      memberId: true,
      memberHandle: true,
      engagement: { select: { title: true, projectId: true } },
    },
  },
} satisfies Prisma.EngagementTimesheetEntrySelect;

type SubmittedEntry = Prisma.EngagementTimesheetEntryGetPayload<{
  select: typeof submittedEntrySelect;
}>;

interface SubmissionGroup {
  id: string;
  assignment: SubmittedEntry["assignment"];
  entries: SubmittedEntry[];
}

/**
 * The submitted-but-unapproved timesheets behind the Work App's Pending Timesheet Approvals tab, and
 * the reminder emails an administrator sends from it to the engagements' managers.
 */
@Injectable()
export class PendingApprovalTimesheetsService {
  private readonly logger = new Logger(PendingApprovalTimesheetsService.name);

  constructor(
    private readonly db: DbService,
    private readonly access: TimesheetAccessService,
    private readonly emailService: TimesheetEmailService,
  ) {}

  /**
   * One row per submission: the entries a member submitted together on one assignment that are still
   * waiting for approval. Entries submitted in one action share a `submittedAt`, so that is what
   * groups them. Administrators only.
   */
  async findPendingApprovals(
    query: PendingApprovalTimesheetQueryDto,
    authUser?: Record<string, any>,
  ): Promise<PendingApprovalTimesheetListResponseDto> {
    this.assertAdministrator(authUser);

    const page = query.page;
    const perPage = query.perPage;
    const fromDate = query.fromDate
      ? parseWorkDateFilter(query.fromDate, "fromDate")
      : undefined;
    const toDate = query.toDate
      ? parseWorkDateFilter(query.toDate, "toDate")
      : undefined;

    if (fromDate && toDate && toDate.getTime() < fromDate.getTime()) {
      throw new BadRequestException(ERROR_MESSAGES.TimesheetRangeInverted);
    }

    const engagementFilters: Prisma.EngagementWhereInput = {};
    if (query.engagement) {
      engagementFilters.title = {
        contains: query.engagement,
        mode: "insensitive",
      };
    }
    const testProjectIds = query.excludeTestProjects ? getTestProjectIds() : [];
    if (testProjectIds.length) {
      engagementFilters.projectId = { notIn: testProjectIds };
    }

    // Submitted entries are a short-lived backlog - they leave this list once approved - so the whole
    // filtered set is grouped in memory; rows cannot be paginated before they are grouped.
    const entries = await this.db.engagementTimesheetEntry.findMany({
      where: {
        status: TimesheetEntryStatus.SUBMITTED,
        ...(fromDate || toDate
          ? {
              workDate: {
                ...(fromDate ? { gte: fromDate } : {}),
                ...(toDate ? { lte: toDate } : {}),
              },
            }
          : {}),
        ...(Object.keys(engagementFilters).length
          ? { assignment: { engagement: engagementFilters } }
          : {}),
      },
      select: submittedEntrySelect,
      orderBy: { workDate: "asc" },
    });

    const groups = this.groupBySubmission(entries);
    const pageGroups = groups.slice((page - 1) * perPage, page * perPage);
    const data = await this.toRows(pageGroups);

    return {
      data,
      meta: {
        page,
        perPage,
        totalCount: groups.length,
        totalPages: Math.ceil(groups.length / perPage) || 0,
      },
    };
  }

  /**
   * Emails every current manager of the selected assignments' engagements, once each, asking them to
   * review what is waiting for their approval. Assignments that no longer have anything submitted are
   * skipped, so a stale selection cannot nag a manager who already cleared their queue.
   */
  async sendReminders(
    body: SendPendingApprovalRemindersDto,
    authUser?: Record<string, any>,
  ): Promise<SendPendingApprovalRemindersResponseDto> {
    this.assertAdministrator(authUser);

    if (!this.emailService.isApprovalReminderConfigured()) {
      throw new ServiceUnavailableException(
        ERROR_MESSAGES.PendingApprovalRemindersNotConfigured,
      );
    }

    const requestedIds = Array.from(
      new Set(body.assignmentIds.map((id) => id.trim()).filter(Boolean)),
    );
    const assignments = await this.db.engagementAssignment.findMany({
      where: {
        id: { in: requestedIds },
        timesheetEntries: {
          some: { status: TimesheetEntryStatus.SUBMITTED },
        },
      },
      select: {
        id: true,
        engagementId: true,
        engagement: { select: { title: true } },
      },
    });

    const pendingIds = new Set(assignments.map((assignment) => assignment.id));
    const skippedAssignmentIds = requestedIds.filter(
      (id) => !pendingIds.has(id),
    );

    const engagementTitles = new Map(
      assignments.map((assignment) => [
        assignment.engagementId,
        assignment.engagement.title,
      ]),
    );
    const managersByEngagement = await this.access.findActiveManagers(
      Array.from(engagementTitles.keys()),
    );

    const engagementsWithoutManagers = Array.from(engagementTitles.entries())
      .filter(
        ([engagementId]) => !managersByEngagement.get(engagementId)?.length,
      )
      .map(([engagementId, engagementTitle]) => ({
        engagementId,
        engagementTitle,
      }));

    // A manager of several selected engagements gets a single reminder: the link lists all of them.
    const managers = new Map<string, EngagementManagerSummary>();
    managersByEngagement.forEach((engagementManagers) =>
      engagementManagers.forEach((manager) => {
        if (!managers.has(manager.userId)) {
          managers.set(manager.userId, manager);
        }
      }),
    );

    const recipients: PendingApprovalReminderRecipientDto[] = await Promise.all(
      Array.from(managers.values()).map(async (manager) => ({
        userId: manager.userId,
        handle: manager.handle,
        sent: await this.emailService.sendApprovalReminderEmail(manager),
      })),
    );
    const sentCount = recipients.filter((recipient) => recipient.sent).length;

    this.logger.log(
      `Timesheet approval reminders requested by ${authUser?.userId ?? "unknown"}: ` +
        `${sentCount}/${recipients.length} managers reminded across ${engagementTitles.size} engagements.`,
    );

    return {
      sentCount,
      recipients,
      engagementsWithoutManagers,
      skippedAssignmentIds,
    };
  }

  private assertAdministrator(authUser?: Record<string, any>): void {
    if (!this.access.isTimesheetAdmin(authUser)) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedPendingApprovalTimesheets,
      );
    }
  }

  private groupBySubmission(entries: SubmittedEntry[]): SubmissionGroup[] {
    const groupsById = new Map<string, SubmissionGroup>();

    entries.forEach((entry) => {
      const assignment = entry.assignment;
      // Submitting always stamps both columns. An entry missing them (written outside the submit
      // flow) has no submission to share, so it stays a row of its own rather than merging into a
      // made-up one.
      const id = entry.submittedAt
        ? [
            assignment.id,
            entry.submittedAt.toISOString(),
            entry.submittedBy ?? "",
          ].join(":")
        : [assignment.id, "entry", entry.id].join(":");
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
    groups: SubmissionGroup[],
  ): Promise<PendingApprovalTimesheetRowDto[]> {
    if (!groups.length) {
      return [];
    }

    const managersByEngagement = await this.access.findActiveManagers(
      groups.map((group) => group.assignment.engagementId),
    );

    return groups.map((group) => {
      const { assignment, entries } = group;
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
        assignmentId: assignment.id,
        assigneeId: assignment.memberId,
        assigneeHandle: assignment.memberHandle,
        workPeriodStart: toWorkDateString(entries[0].workDate),
        workPeriodEnd: toWorkDateString(entries[entries.length - 1].workDate),
        submittedAt: entries[0].submittedAt ?? null,
        hours: hundredths / 100,
        entryIds: entries.map((entry) => entry.id),
        approvers: managersByEngagement.get(assignment.engagementId) ?? [],
      };
    });
  }
}
