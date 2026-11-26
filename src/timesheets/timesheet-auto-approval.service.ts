import {
  ConflictException,
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SchedulerRegistry } from "@nestjs/schedule";
import {
  EngagementAssignment,
  EngagementTimesheetEntry,
  Prisma,
  TimesheetAuditAction,
  TimesheetEntryStatus,
} from "@prisma/client";
import { CronJob } from "cron";
import { DbService } from "../db/db.service";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";
import {
  TIMESHEET_AUTO_APPROVAL_COMMENT,
  TIMESHEET_AUTO_APPROVAL_DEFAULT_CRON,
  TIMESHEET_AUTO_APPROVAL_DEFAULT_PENDING_DAYS,
  TIMESHEET_AUTO_APPROVAL_DEFAULT_START_DATE,
  TIMESHEET_SYSTEM_ACTOR,
  TimesheetEventTopics,
} from "./timesheet-constants";
import {
  computeExpectedHours,
  toWorkDateString,
  toWorkDay,
} from "./timesheet-dates.util";
import { TimesheetEventsService } from "./timesheet-events.service";
import { TimesheetActorRole } from "./timesheet-roles";

const CRON_JOB_NAME = "timesheet-auto-approval";

type SubmittedEntry = EngagementTimesheetEntry & {
  assignment: EngagementAssignment & {
    engagement: { id: string; title: string };
  };
};

/** Why a submission was left for a manager. */
export type AutoApprovalSkipReason =
  | "future-dates"
  | "no-manager"
  | "no-expected-hours"
  | "over-expected-hours"
  | "changed-meanwhile"
  | "failed";

export interface AutoApprovalRunResult {
  /** Submissions old enough to be considered. */
  considered: number;
  approvedSubmissions: number;
  approvedEntries: number;
  skipped: Record<AutoApprovalSkipReason, number>;
}

/**
 * Approves submitted timesheets that no manager has acted on, once it is safe to (PM-6785).
 *
 * A "work period" is one submission: the entries a member submitted together, which share their
 * assignment and exact `submittedAt` and run from their earliest to their latest work date. That is the
 * same period the submitted email describes to the managers. A submission is approved, as a whole, only
 * when all of these hold:
 *
 * 1. its hours add up to no more than the assignment's expected hours for that period
 *    (standard hours per weekday, inside the assignment dates);
 * 2. the engagement has at least one current manager;
 * 3. it has been pending approval for at least 7 days (`TIMESHEET_AUTO_APPROVAL_PENDING_DAYS`);
 * 4. none of its work dates is in the future;
 * 5. it was submitted on or after the start date (`TIMESHEET_AUTO_APPROVAL_START_DATE`, UTC, default
 *    2026-11-24), so timesheets submitted before auto-approval went live stay with the managers.
 *
 * Anything else is left for a manager. Entries a manager already approved or returned, or that the
 * member edited back to draft, are simply no longer part of the submission.
 *
 * Runs daily on `TIMESHEET_AUTO_APPROVAL_CRON` (UTC) when `TIMESHEET_AUTO_APPROVAL_ENABLED` is `true`.
 * No lock is needed across API instances: each submission is approved with an update guarded on its
 * entries still being submitted at that `submittedAt`, so whichever run gets there second - another
 * instance, or a manager approving at the same moment - matches nothing, and only the winner audits and
 * sends the emails.
 */
@Injectable()
export class TimesheetAutoApprovalService implements OnModuleInit {
  private readonly logger = new Logger(TimesheetAutoApprovalService.name);

  constructor(
    private readonly db: DbService,
    private readonly access: TimesheetAccessService,
    private readonly audit: TimesheetAuditService,
    private readonly events: TimesheetEventsService,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  onModuleInit(): void {
    if (!this.isEnabled()) {
      this.logger.log(
        "Timesheet auto-approval is disabled (TIMESHEET_AUTO_APPROVAL_ENABLED is not true).",
      );
      return;
    }

    const cronTime =
      this.configService.get<string>("TIMESHEET_AUTO_APPROVAL_CRON")?.trim() ||
      TIMESHEET_AUTO_APPROVAL_DEFAULT_CRON;
    const job = CronJob.from({
      cronTime,
      onTick: () => {
        this.run().catch((error: unknown) => {
          this.logger.error(
            `Timesheet auto-approval run failed: ${
              error instanceof Error ? error.message : "unknown error"
            }`,
          );
        });
      },
      timeZone: "UTC",
    });

    this.schedulerRegistry.addCronJob(CRON_JOB_NAME, job);
    job.start();
    this.logger.log(
      `Timesheet auto-approval scheduled on "${cronTime}" (UTC), for submissions since ` +
        `${toWorkDateString(this.startDate())}.`,
    );
  }

  /**
   * One auto-approval pass. Never throws for a single submission: a failure is logged and counted,
   * and the rest are still processed.
   */
  async run(now: Date = new Date()): Promise<AutoApprovalRunResult> {
    const pendingSince = new Date(
      now.getTime() - this.pendingDays() * 24 * 60 * 60 * 1000,
    );
    const today = toWorkDay(now);
    const result: AutoApprovalRunResult = {
      considered: 0,
      approvedSubmissions: 0,
      approvedEntries: 0,
      skipped: {
        "future-dates": 0,
        "no-manager": 0,
        "no-expected-hours": 0,
        "over-expected-hours": 0,
        "changed-meanwhile": 0,
        failed: 0,
      },
    };

    const entries: SubmittedEntry[] =
      await this.db.engagementTimesheetEntry.findMany({
        where: {
          status: TimesheetEntryStatus.SUBMITTED,
          submittedAt: { gte: this.startDate(), lte: pendingSince },
        },
        include: {
          assignment: {
            include: { engagement: { select: { id: true, title: true } } },
          },
        },
        orderBy: [{ submittedAt: "asc" }, { workDate: "asc" }],
      });

    const submissions = this.groupBySubmission(entries);
    result.considered = submissions.length;

    if (!submissions.length) {
      this.logRun(result);
      return result;
    }

    const managersByEngagement = await this.access.findActiveManagers(
      submissions.map((submission) => submission[0].assignment.engagementId),
    );

    for (const submission of submissions) {
      const outcome = await this.processSubmission(
        submission,
        today,
        Boolean(
          managersByEngagement.get(submission[0].assignment.engagementId)
            ?.length,
        ),
      );

      if (outcome === "approved") {
        result.approvedSubmissions += 1;
        result.approvedEntries += submission.length;
      } else {
        result.skipped[outcome] += 1;
      }
    }

    this.logRun(result);
    return result;
  }

  private async processSubmission(
    submission: SubmittedEntry[],
    today: Date,
    hasManager: boolean,
  ): Promise<"approved" | AutoApprovalSkipReason> {
    const assignment = submission[0].assignment;
    const label = `assignment ${assignment.id}, submitted ${submission[0].submittedAt?.toISOString()}`;

    // Entries are ordered by work date, so the period runs from the first to the last.
    const fromDate = submission[0].workDate;
    const toDate = submission[submission.length - 1].workDate;

    if (toDate.getTime() > today.getTime()) {
      return "future-dates";
    }

    if (!hasManager) {
      return "no-manager";
    }

    const expectedHours = computeExpectedHours(assignment, fromDate, toDate);
    if (expectedHours === null) {
      return "no-expected-hours";
    }

    const totalHours = submission.reduce(
      (total, entry) => total.plus(entry.hoursWorked),
      new Prisma.Decimal(0),
    );
    if (totalHours.greaterThan(expectedHours)) {
      return "over-expected-hours";
    }

    try {
      await this.approve(submission);
    } catch (error) {
      if (error instanceof ConflictException) {
        this.logger.log(
          `Skipped auto-approving ${label}: its entries changed meanwhile.`,
        );
        return "changed-meanwhile";
      }

      this.logger.error(
        `Failed to auto-approve ${label}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return "failed";
    }

    this.logger.log(
      `Auto-approved ${submission.length} entries (${totalHours.toFixed(2)} of ${expectedHours} expected hours) on ${label}.`,
    );

    await this.events.emit(TimesheetEventTopics.AutoApproved, {
      engagementId: assignment.engagementId,
      engagementTitle: assignment.engagement.title,
      assignmentId: assignment.id,
      memberId: assignment.memberId,
      memberHandle: assignment.memberHandle,
      actorUserId: TIMESHEET_SYSTEM_ACTOR.userId,
      actorHandle: TIMESHEET_SYSTEM_ACTOR.handle,
      actorRole: TimesheetActorRole.System,
      entryIds: submission.map((entry) => entry.id),
      workDates: submission.map((entry) => toWorkDateString(entry.workDate)),
      totalHours: totalHours.toFixed(2),
      comment: TIMESHEET_AUTO_APPROVAL_COMMENT,
    });

    return "approved";
  }

  /**
   * Approves the whole submission or none of it. Guarded on every entry still being submitted at the
   * same `submittedAt`; if one is not, the transaction is rolled back with a ConflictException.
   */
  private async approve(submission: SubmittedEntry[]): Promise<void> {
    const approvedAt = new Date();
    const entryIds = submission.map((entry) => entry.id);

    await this.db.$transaction(async (tx) => {
      const { count } = await tx.engagementTimesheetEntry.updateMany({
        where: {
          id: { in: entryIds },
          status: TimesheetEntryStatus.SUBMITTED,
          submittedAt: submission[0].submittedAt,
        },
        data: {
          status: TimesheetEntryStatus.APPROVED,
          approvedAt,
          approvedBy: TIMESHEET_SYSTEM_ACTOR.userId,
          approvedByHandle: TIMESHEET_SYSTEM_ACTOR.handle,
          approvalComment: TIMESHEET_AUTO_APPROVAL_COMMENT,
          updatedBy: TIMESHEET_SYSTEM_ACTOR.userId,
        },
      });

      if (count !== entryIds.length) {
        throw new ConflictException(
          "The submission changed while it was being auto-approved.",
        );
      }

      for (const entry of submission) {
        await this.audit.record(tx, {
          timesheetEntryId: entry.id,
          action: TimesheetAuditAction.APPROVED,
          previousValues: { status: TimesheetEntryStatus.SUBMITTED },
          updatedValues: {
            status: TimesheetEntryStatus.APPROVED,
            approvedByHandle: TIMESHEET_SYSTEM_ACTOR.handle,
          },
          actorUserId: TIMESHEET_SYSTEM_ACTOR.userId,
          actorHandle: TIMESHEET_SYSTEM_ACTOR.handle,
          actorRole: TimesheetActorRole.System,
          comment: TIMESHEET_AUTO_APPROVAL_COMMENT,
        });
      }
    });
  }

  /** Groups entries into submissions: same assignment, same `submittedAt`. Keeps their order. */
  private groupBySubmission(entries: SubmittedEntry[]): SubmittedEntry[][] {
    const groups = new Map<string, SubmittedEntry[]>();

    for (const entry of entries) {
      if (!entry.submittedAt) {
        continue;
      }

      const key = `${entry.engagementAssignmentId}|${entry.submittedAt.toISOString()}`;
      const group = groups.get(key) ?? [];
      group.push(entry);
      groups.set(key, group);
    }

    return Array.from(groups.values());
  }

  private isEnabled(): boolean {
    return (
      this.configService
        .get<string>("TIMESHEET_AUTO_APPROVAL_ENABLED")
        ?.trim()
        .toLowerCase() === "true"
    );
  }

  private pendingDays(): number {
    const configured = Number(
      this.configService.get<string>("TIMESHEET_AUTO_APPROVAL_PENDING_DAYS"),
    );

    return Number.isFinite(configured) && configured > 0
      ? configured
      : TIMESHEET_AUTO_APPROVAL_DEFAULT_PENDING_DAYS;
  }

  /**
   * Midnight UTC on `TIMESHEET_AUTO_APPROVAL_START_DATE` (YYYY-MM-DD). A missing or unreadable value
   * falls back to the default rather than to no start date, so a typo can never open auto-approval
   * up to every old submission.
   */
  private startDate(): Date {
    const configured = this.configService
      .get<string>("TIMESHEET_AUTO_APPROVAL_START_DATE")
      ?.trim();

    if (configured) {
      const parsed = /^\d{4}-\d{2}-\d{2}$/.test(configured)
        ? new Date(`${configured}T00:00:00.000Z`)
        : undefined;

      if (
        parsed &&
        !Number.isNaN(parsed.getTime()) &&
        toWorkDateString(parsed) === configured
      ) {
        return parsed;
      }

      this.logger.warn(
        `TIMESHEET_AUTO_APPROVAL_START_DATE "${configured}" is not a YYYY-MM-DD date; using ` +
          `${TIMESHEET_AUTO_APPROVAL_DEFAULT_START_DATE}.`,
      );
    }

    return new Date(
      `${TIMESHEET_AUTO_APPROVAL_DEFAULT_START_DATE}T00:00:00.000Z`,
    );
  }

  private logRun(result: AutoApprovalRunResult): void {
    const skipped = Object.entries(result.skipped)
      .filter(([, count]) => count > 0)
      .map(([reason, count]) => `${reason}: ${count}`)
      .join(", ");

    this.logger.log(
      `Timesheet auto-approval: ${result.approvedSubmissions} of ${result.considered} submissions approved (${result.approvedEntries} entries)${
        skipped ? `; left for a manager - ${skipped}` : ""
      }.`,
    );
  }
}
