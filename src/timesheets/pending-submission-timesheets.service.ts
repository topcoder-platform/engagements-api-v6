import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { AssignmentStatus, Prisma, TimesheetEntryStatus } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/constants";
import { getTestProjectIds } from "../common/project-ids.util";
import { DbService } from "../db/db.service";
import {
  PendingSubmissionReminderRecipientDto,
  PendingSubmissionTimesheetListResponseDto,
  PendingSubmissionTimesheetQueryDto,
  PendingSubmissionTimesheetRowDto,
  PendingSubmissionWorkPeriodDto,
  SendPendingSubmissionRemindersDto,
  SendPendingSubmissionRemindersResponseDto,
} from "./dto";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TIMESHEET_MAX_RANGE_DAYS } from "./timesheet-constants";
import {
  addWorkDays,
  countWorkDays,
  parseWorkDateFilter,
  toWorkDateString,
  toWorkDay,
} from "./timesheet-dates.util";
import { TimesheetEmailService } from "./timesheet-email.service";

/** Entries in these statuses count as submitted: waiting for approval, or already approved. */
const SUBMITTED_STATUSES: TimesheetEntryStatus[] = [
  TimesheetEntryStatus.SUBMITTED,
  TimesheetEntryStatus.APPROVED,
];

const pendingAssignmentSelect = {
  id: true,
  engagementId: true,
  memberId: true,
  memberHandle: true,
  candidateWiproId: true,
  startDate: true,
  endDate: true,
  engagement: { select: { title: true, projectId: true } },
} satisfies Prisma.EngagementAssignmentSelect;

type PendingAssignment = Prisma.EngagementAssignmentGetPayload<{
  select: typeof pendingAssignmentSelect;
}>;

interface WorkPeriod {
  fromDate: Date;
  toDate: Date;
}

/**
 * The timesheets nobody has submitted yet behind the Work App's Pending Timesheet Submissions tab,
 * and the reminder emails an administrator sends from it to the members.
 *
 * "Not submitted" is judged per work period: an active assignment is pending when none of its entries
 * dated inside the period has been submitted or approved. Drafts do not count - saved hours are not a
 * timesheet the manager can act on until they are submitted.
 */
@Injectable()
export class PendingSubmissionTimesheetsService {
  private readonly logger = new Logger(PendingSubmissionTimesheetsService.name);

  constructor(
    private readonly db: DbService,
    private readonly access: TimesheetAccessService,
    private readonly emailService: TimesheetEmailService,
  ) {}

  /**
   * One row per assignment with nothing submitted for the work period. Administrators only.
   */
  async findPendingSubmissions(
    query: PendingSubmissionTimesheetQueryDto,
    authUser?: Record<string, any>,
  ): Promise<PendingSubmissionTimesheetListResponseDto> {
    this.assertAdministrator(authUser);

    const period = this.parsePeriod(query);
    const page = query.page;
    const perPage = query.perPage;

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
    // Same managers as the Approver column: removed ones do not count.
    if (query.managerAssigned) {
      engagementFilters.managers = { some: { removedAt: null } };
    }

    const where: Prisma.EngagementAssignmentWhereInput = {
      ...this.pendingInPeriod(period),
      ...(Object.keys(engagementFilters).length
        ? { engagement: engagementFilters }
        : {}),
    };

    const [assignments, totalCount] = await Promise.all([
      this.db.engagementAssignment.findMany({
        where,
        select: pendingAssignmentSelect,
        orderBy: [
          { engagement: { title: "asc" } },
          { memberHandle: "asc" },
          { id: "asc" },
        ],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.db.engagementAssignment.count({ where }),
    ]);

    return {
      data: await this.toRows(assignments, period),
      meta: {
        page,
        perPage,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage) || 0,
      },
    };
  }

  /**
   * Emails each selected member, once per assignment, to submit their timesheet for the work period.
   * Assignments that are no longer pending for it are skipped, so a stale selection cannot nag a
   * member who has submitted since the list was loaded.
   */
  async sendReminders(
    body: SendPendingSubmissionRemindersDto,
    authUser?: Record<string, any>,
  ): Promise<SendPendingSubmissionRemindersResponseDto> {
    this.assertAdministrator(authUser);

    if (!this.emailService.isSubmissionReminderConfigured()) {
      throw new ServiceUnavailableException(
        ERROR_MESSAGES.PendingSubmissionRemindersNotConfigured,
      );
    }

    const period = this.parsePeriod(body);
    const requestedIds = Array.from(new Set(body.assignmentIds));
    const assignments = await this.db.engagementAssignment.findMany({
      where: { id: { in: requestedIds }, ...this.pendingInPeriod(period) },
      select: pendingAssignmentSelect,
    });

    const pendingIds = new Set(assignments.map((assignment) => assignment.id));
    const skippedAssignmentIds = requestedIds.filter(
      (id) => !pendingIds.has(id),
    );

    const recipients: PendingSubmissionReminderRecipientDto[] =
      await Promise.all(
        assignments.map(async (assignment) => {
          const workPeriod = this.clipToAssignment(assignment, period);

          return {
            assignmentId: assignment.id,
            userId: assignment.memberId,
            handle: assignment.memberHandle,
            sent: await this.emailService.sendSubmissionReminderEmail({
              engagementId: assignment.engagementId,
              engagementTitle: assignment.engagement.title,
              assignmentId: assignment.id,
              memberUserId: assignment.memberId,
              memberHandle: assignment.memberHandle,
              candidateWiproId: assignment.candidateWiproId,
              fromDate: toWorkDateString(workPeriod.fromDate),
              toDate: toWorkDateString(workPeriod.toDate),
            }),
          };
        }),
      );
    const sentCount = recipients.filter((recipient) => recipient.sent).length;

    this.logger.log(
      `Timesheet submission reminders requested by ${authUser?.userId ?? "unknown"}: ` +
        `${sentCount}/${recipients.length} members reminded for ` +
        `${toWorkDateString(period.fromDate)} - ${toWorkDateString(period.toDate)}.`,
    );

    return { sentCount, recipients, skippedAssignmentIds };
  }

  private assertAdministrator(authUser?: Record<string, any>): void {
    if (!this.access.isTimesheetAdmin(authUser)) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedPendingSubmissionTimesheets,
      );
    }
  }

  /**
   * Capped like a timesheet save: the reminder links the member to their timesheet on this period,
   * and the timesheet page cannot open a longer one.
   */
  private parsePeriod(dto: PendingSubmissionWorkPeriodDto): WorkPeriod {
    const fromDate = parseWorkDateFilter(dto.fromDate, "fromDate");
    const toDate = parseWorkDateFilter(dto.toDate, "toDate");

    if (toDate.getTime() < fromDate.getTime()) {
      throw new BadRequestException(ERROR_MESSAGES.TimesheetRangeInverted);
    }

    if (countWorkDays(fromDate, toDate) > TIMESHEET_MAX_RANGE_DAYS) {
      throw new BadRequestException(
        ERROR_MESSAGES.PendingSubmissionRangeTooLong,
      );
    }

    return { fromDate, toDate };
  }

  /**
   * An active assignment that overlaps the period and has no submitted or approved entry inside it.
   * Only ASSIGNED members can submit, so completed, terminated, and not-yet-accepted assignments are
   * never pending.
   */
  private pendingInPeriod(
    period: WorkPeriod,
  ): Prisma.EngagementAssignmentWhereInput {
    return {
      status: AssignmentStatus.ASSIGNED,
      // Start and end dates are timestamps; anything on or before the last day of the period counts.
      AND: [
        {
          OR: [
            { startDate: null },
            { startDate: { lt: addWorkDays(period.toDate, 1) } },
          ],
        },
        {
          OR: [{ endDate: null }, { endDate: { gte: period.fromDate } }],
        },
      ],
      timesheetEntries: {
        none: {
          status: { in: SUBMITTED_STATUSES },
          workDate: { gte: period.fromDate, lte: period.toDate },
        },
      },
    };
  }

  /** The part of the period the assignment covers, so a mid-week start is not asked about Monday. */
  private clipToAssignment(
    assignment: PendingAssignment,
    period: WorkPeriod,
  ): WorkPeriod {
    const start = assignment.startDate ? toWorkDay(assignment.startDate) : null;
    const end = assignment.endDate ? toWorkDay(assignment.endDate) : null;

    return {
      fromDate:
        start && start.getTime() > period.fromDate.getTime()
          ? start
          : period.fromDate,
      toDate:
        end && end.getTime() < period.toDate.getTime() ? end : period.toDate,
    };
  }

  private async toRows(
    assignments: PendingAssignment[],
    period: WorkPeriod,
  ): Promise<PendingSubmissionTimesheetRowDto[]> {
    if (!assignments.length) {
      return [];
    }

    const managersByEngagement = await this.access.findActiveManagers(
      assignments.map((assignment) => assignment.engagementId),
    );

    return assignments.map((assignment) => {
      const workPeriod = this.clipToAssignment(assignment, period);

      return {
        id: assignment.id,
        engagementId: assignment.engagementId,
        engagementTitle: assignment.engagement.title,
        projectId: assignment.engagement.projectId,
        assignmentId: assignment.id,
        assigneeId: assignment.memberId,
        assigneeHandle: assignment.memberHandle,
        workPeriodStart: toWorkDateString(workPeriod.fromDate),
        workPeriodEnd: toWorkDateString(workPeriod.toDate),
        approvers: managersByEngagement.get(assignment.engagementId) ?? [],
      };
    });
  }
}
