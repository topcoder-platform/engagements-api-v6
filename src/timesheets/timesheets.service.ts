import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  EngagementAssignment,
  EngagementTimesheetEntry,
  Prisma,
  TimesheetAuditAction,
  TimesheetEntryStatus,
} from "@prisma/client";
import { nanoid } from "nanoid";
import {
  ACTIVE_ASSIGNMENT_STATUSES,
  ERROR_MESSAGES,
} from "../common/constants";
import { getUserIdentifier, normalizeUserId } from "../common/user.util";
import { DbService } from "../db/db.service";
import { MemberService } from "../integrations/member.service";
import { PaginatedResponse } from "../engagements/dto";
import {
  ApproveTimesheetEntriesDto,
  ApproveTimesheetEntriesResultDto,
  ReopenTimesheetEntriesDto,
  SkippedTimesheetEntryDto,
  SubmitTimesheetEntriesDto,
  TimesheetEngagementQueryDto,
  TimesheetEngagementRowDto,
  TimesheetEntryResponseDto,
  TimesheetQueryDto,
  UpsertTimesheetEntriesDto,
  UpsertTimesheetEntryDto,
  TimesheetViewResponseDto,
} from "./dto";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";
import {
  TIMESHEET_MAX_HOURS_PER_DAY,
  TIMESHEET_MAX_RANGE_DAYS,
  TimesheetEventTopics,
  TimesheetRollupStatus,
} from "./timesheet-constants";
import {
  TimesheetEventsService,
  TimesheetEventPayload,
} from "./timesheet-events.service";
import { TimesheetActorRole, TimesheetViewerRole } from "./timesheet-roles";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

type AssignmentWithEngagement = EngagementAssignment & {
  engagement: { id: string; title: string };
};

interface TimesheetContext {
  assignment: AssignmentWithEngagement;
  viewerRole: TimesheetViewerRole;
  actorUserId: string;
  actorHandle: string | null;
  isAdministrator: boolean;
}

interface PendingEvent {
  topic: string;
  entries: EngagementTimesheetEntry[];
  comment?: string | null;
}

/**
 * Parses a YYYY-MM-DD string into the UTC midnight that a `@db.Date` column round-trips.
 *
 * Going through `new Date(value)` with a bare date is already UTC midnight, but being explicit keeps a
 * timestamp-bearing value from silently shifting the stored calendar day.
 */
function toWorkDate(value: string, field = "workDate"): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value?.trim() ?? "");
  if (!match) {
    throw new BadRequestException(`${field} must be a YYYY-MM-DD date.`);
  }

  const [, year, month, day] = match;
  const parsed = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  );

  if (Number.isNaN(parsed.getTime())) {
    throw new BadRequestException(`${field} must be a YYYY-MM-DD date.`);
  }

  return parsed;
}

/** Formats a stored date column back to the YYYY-MM-DD the API speaks. */
function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

@Injectable()
export class TimesheetsService {
  private readonly logger = new Logger(TimesheetsService.name);

  constructor(
    private readonly db: DbService,
    private readonly access: TimesheetAccessService,
    private readonly audit: TimesheetAuditService,
    private readonly events: TimesheetEventsService,
    private readonly memberService: MemberService,
  ) {}

  /**
   * Reads one assignment's timesheet plus the header every view displays.
   */
  async findTimesheet(
    engagementId: string,
    assignmentId: string,
    query: TimesheetQueryDto,
    authUser?: Record<string, any>,
  ): Promise<TimesheetViewResponseDto> {
    const context = await this.resolveContext(
      engagementId,
      assignmentId,
      authUser,
    );

    const where: Prisma.EngagementTimesheetEntryWhereInput = {
      engagementAssignmentId: assignmentId,
    };

    if (query.status) {
      where.status = query.status;
    }

    const fromDate = query.fromDate
      ? toWorkDate(query.fromDate, "fromDate")
      : undefined;
    const toDate = query.toDate
      ? toWorkDate(query.toDate, "toDate")
      : undefined;
    this.assertValidRange(fromDate, toDate);

    if (fromDate || toDate) {
      where.workDate = {
        ...(fromDate ? { gte: fromDate } : {}),
        ...(toDate ? { lte: toDate } : {}),
      };
    }

    const entries = await this.db.engagementTimesheetEntry.findMany({
      where,
      orderBy: { workDate: "asc" },
    });

    return this.toTimesheetView(context, entries);
  }

  /**
   * Creates or updates entries, keyed on (assignment, work date).
   *
   * The resulting status is derived here by comparing stored values to incoming ones. A status sent by
   * the client is ignored outright: the edit-after-submit reset and the immutability of approved
   * entries are only enforceable if the server decides, so a stale client cannot talk its way into an
   * illegal state.
   */
  async upsertEntries(
    engagementId: string,
    assignmentId: string,
    dto: UpsertTimesheetEntriesDto,
    authUser?: Record<string, any>,
  ): Promise<TimesheetViewResponseDto> {
    const context = await this.resolveContext(
      engagementId,
      assignmentId,
      authUser,
    );

    if (context.viewerRole === TimesheetViewerRole.Manager) {
      throw new ForbiddenException(ERROR_MESSAGES.TimesheetManagerCannotEdit);
    }

    const parsed = this.parseUpsertEntries(dto.entries);
    const existingEntries = await this.db.engagementTimesheetEntry.findMany({
      where: {
        engagementAssignmentId: assignmentId,
        workDate: { in: parsed.map((entry) => entry.workDate) },
      },
    });
    const existingByDate = new Map(
      existingEntries.map((entry) => [toDateString(entry.workDate), entry]),
    );

    const unsubmitted: EngagementTimesheetEntry[] = [];
    const overridden: EngagementTimesheetEntry[] = [];

    await this.db.$transaction(async (tx) => {
      for (const entry of parsed) {
        const dateKey = toDateString(entry.workDate);
        const existing = existingByDate.get(dateKey);

        if (!existing) {
          const created = await tx.engagementTimesheetEntry.create({
            data: {
              id: nanoid(),
              engagementAssignmentId: assignmentId,
              workDate: entry.workDate,
              hoursWorked: entry.hoursWorked,
              remarks: entry.remarks,
              status: TimesheetEntryStatus.DRAFT,
              createdBy: context.actorUserId,
              updatedBy: context.actorUserId,
            },
          });

          await this.audit.record(tx, {
            timesheetEntryId: created.id,
            action: TimesheetAuditAction.CREATED,
            updatedValues: {
              workDate: dateKey,
              hoursWorked: created.hoursWorked,
              remarks: created.remarks,
              status: created.status,
            },
            actorUserId: context.actorUserId,
            actorHandle: context.actorHandle,
            actorRole: this.toActorRole(context),
          });

          continue;
        }

        const hoursChanged = !existing.hoursWorked.equals(
          new Prisma.Decimal(entry.hoursWorked),
        );
        const remarksChanged = (existing.remarks ?? null) !== entry.remarks;

        if (existing.status === TimesheetEntryStatus.APPROVED) {
          // An approved entry is frozen for the member and the manager alike. Only an administrator
          // can change it, and only with a reason that goes on the audit trail.
          if (!hoursChanged && !remarksChanged) {
            continue;
          }

          if (!context.isAdministrator) {
            throw new ConflictException(
              ERROR_MESSAGES.TimesheetEntryApprovedReadOnly,
            );
          }

          if (!dto.overrideReason) {
            throw new BadRequestException(
              ERROR_MESSAGES.TimesheetOverrideReasonRequired,
            );
          }

          const updated = await tx.engagementTimesheetEntry.update({
            where: { id: existing.id },
            data: {
              hoursWorked: entry.hoursWorked,
              remarks: entry.remarks,
              updatedBy: context.actorUserId,
            },
          });

          await this.audit.record(tx, {
            timesheetEntryId: existing.id,
            action: TimesheetAuditAction.ADMIN_OVERRIDE,
            previousValues: {
              hoursWorked: existing.hoursWorked,
              remarks: existing.remarks,
              status: existing.status,
            },
            updatedValues: {
              hoursWorked: updated.hoursWorked,
              remarks: updated.remarks,
              status: updated.status,
            },
            actorUserId: context.actorUserId,
            actorHandle: context.actorHandle,
            actorRole: TimesheetActorRole.Administrator,
            comment: dto.overrideReason,
          });

          overridden.push(updated);
          continue;
        }

        if (!hoursChanged && !remarksChanged) {
          // Nothing material changed, so the row keeps its status and the audit trail stays quiet.
          continue;
        }

        const resetsToDraft =
          existing.status === TimesheetEntryStatus.SUBMITTED;
        const updated = await tx.engagementTimesheetEntry.update({
          where: { id: existing.id },
          data: {
            hoursWorked: entry.hoursWorked,
            remarks: entry.remarks,
            updatedBy: context.actorUserId,
            ...(resetsToDraft
              ? {
                  status: TimesheetEntryStatus.DRAFT,
                  submittedAt: null,
                  submittedBy: null,
                }
              : {}),
          },
        });

        await this.audit.record(tx, {
          timesheetEntryId: existing.id,
          action: resetsToDraft
            ? TimesheetAuditAction.UNSUBMITTED
            : TimesheetAuditAction.UPDATED,
          previousValues: {
            hoursWorked: existing.hoursWorked,
            remarks: existing.remarks,
            status: existing.status,
          },
          updatedValues: {
            hoursWorked: updated.hoursWorked,
            remarks: updated.remarks,
            status: updated.status,
          },
          actorUserId: context.actorUserId,
          actorHandle: context.actorHandle,
          actorRole: this.toActorRole(context),
          comment: context.isAdministrator ? dto.overrideReason : undefined,
        });

        if (resetsToDraft) {
          unsubmitted.push(updated);
        }
      }
    });

    await this.emitEvents(context, [
      { topic: TimesheetEventTopics.Unsubmitted, entries: unsubmitted },
      {
        topic: TimesheetEventTopics.AdminOverride,
        entries: overridden,
        comment: dto.overrideReason,
      },
    ]);

    const entries = await this.db.engagementTimesheetEntry.findMany({
      where: { engagementAssignmentId: assignmentId },
      orderBy: { workDate: "asc" },
    });

    return this.toTimesheetView(context, entries);
  }

  /**
   * Sends draft entries to the engagement's managers for approval.
   *
   * Atomic on purpose: an entry that is missing data or no longer in draft fails the whole call with
   * per-entry detail, rather than half-submitting a week and leaving the member to work out which days
   * went through.
   */
  async submitEntries(
    engagementId: string,
    assignmentId: string,
    dto: SubmitTimesheetEntriesDto,
    authUser?: Record<string, any>,
  ): Promise<TimesheetViewResponseDto> {
    const context = await this.resolveContext(
      engagementId,
      assignmentId,
      authUser,
    );

    if (context.viewerRole === TimesheetViewerRole.Manager) {
      throw new ForbiddenException(ERROR_MESSAGES.TimesheetManagerCannotSubmit);
    }

    if (context.isAdministrator && !dto.overrideReason) {
      throw new BadRequestException(
        ERROR_MESSAGES.TimesheetOverrideReasonRequired,
      );
    }

    const entries = await this.loadEntriesForAction(assignmentId, dto.entryIds);
    const problems = entries
      .filter(
        (entry) =>
          entry.status !== TimesheetEntryStatus.DRAFT ||
          entry.hoursWorked.lessThanOrEqualTo(0),
      )
      .map((entry) => ({
        id: entry.id,
        workDate: toDateString(entry.workDate),
        currentStatus: entry.status,
        reason:
          entry.status === TimesheetEntryStatus.DRAFT
            ? "Hours worked must be greater than zero."
            : `Only draft entries can be submitted; this entry is ${entry.status}.`,
      }));

    if (problems.length) {
      throw new BadRequestException({
        message: ERROR_MESSAGES.TimesheetSubmitRejected,
        entries: problems,
      });
    }

    const submittedAt = new Date();
    const submitted = await this.db.$transaction(async (tx) => {
      const updatedEntries: EngagementTimesheetEntry[] = [];

      for (const entry of entries) {
        const updated = await tx.engagementTimesheetEntry.update({
          where: { id: entry.id },
          data: {
            status: TimesheetEntryStatus.SUBMITTED,
            submittedAt,
            submittedBy: context.actorUserId,
            updatedBy: context.actorUserId,
          },
        });

        await this.audit.record(tx, {
          timesheetEntryId: entry.id,
          action: TimesheetAuditAction.SUBMITTED,
          previousValues: {
            status: entry.status,
            hoursWorked: entry.hoursWorked,
          },
          updatedValues: {
            status: updated.status,
            hoursWorked: updated.hoursWorked,
          },
          actorUserId: context.actorUserId,
          actorHandle: context.actorHandle,
          actorRole: this.toActorRole(context),
          comment: dto.overrideReason,
        });

        updatedEntries.push(updated);
      }

      return updatedEntries;
    });

    await this.emitEvents(context, [
      {
        topic: TimesheetEventTopics.Submitted,
        entries: submitted,
        comment: dto.overrideReason,
      },
    ]);

    return this.findTimesheet(engagementId, assignmentId, {}, authUser);
  }

  /**
   * Approves submitted entries.
   *
   * The update is guarded on `status: SUBMITTED`, and that guard is the entire concurrency control:
   * two managers approving the same selection at the same moment each approve whatever is still
   * submitted, so every entry is approved exactly once. Whatever the guard skipped comes back in the
   * response with the handle of the manager who got there first, rather than failing the batch.
   */
  async approveEntries(
    engagementId: string,
    assignmentId: string,
    dto: ApproveTimesheetEntriesDto,
    authUser?: Record<string, any>,
  ): Promise<ApproveTimesheetEntriesResultDto> {
    const context = await this.resolveContext(
      engagementId,
      assignmentId,
      authUser,
    );

    if (context.viewerRole === TimesheetViewerRole.Member) {
      throw new ForbiddenException(ERROR_MESSAGES.TimesheetMemberCannotApprove);
    }

    if (context.isAdministrator && !dto.overrideReason) {
      throw new BadRequestException(
        ERROR_MESSAGES.TimesheetOverrideReasonRequired,
      );
    }

    await this.loadEntriesForAction(assignmentId, dto.entryIds);

    const approvedAt = new Date();
    const result = await this.db.$transaction(async (tx) => {
      const update = await tx.engagementTimesheetEntry.updateMany({
        where: {
          id: { in: dto.entryIds },
          engagementAssignmentId: assignmentId,
          status: TimesheetEntryStatus.SUBMITTED,
        },
        data: {
          status: TimesheetEntryStatus.APPROVED,
          approvedAt,
          approvedBy: context.actorUserId,
          approvedByHandle: context.actorHandle,
          approvalComment: dto.approvalComment,
          updatedBy: context.actorUserId,
        },
      });

      const entriesAfter = await tx.engagementTimesheetEntry.findMany({
        where: { id: { in: dto.entryIds } },
      });
      const approvedEntries = entriesAfter.filter(
        (entry) =>
          entry.status === TimesheetEntryStatus.APPROVED &&
          entry.approvedAt?.getTime() === approvedAt.getTime(),
      );

      for (const entry of approvedEntries) {
        await this.audit.record(tx, {
          timesheetEntryId: entry.id,
          action: TimesheetAuditAction.APPROVED,
          previousValues: { status: TimesheetEntryStatus.SUBMITTED },
          updatedValues: {
            status: entry.status,
            approvedByHandle: entry.approvedByHandle,
          },
          actorUserId: context.actorUserId,
          actorHandle: context.actorHandle,
          actorRole: this.toActorRole(context),
          comment: context.isAdministrator
            ? `${dto.approvalComment} (override: ${dto.overrideReason})`
            : dto.approvalComment,
        });
      }

      const approvedIds = new Set(approvedEntries.map((entry) => entry.id));
      const skipped: SkippedTimesheetEntryDto[] = entriesAfter
        .filter((entry) => !approvedIds.has(entry.id))
        .map((entry) => ({
          id: entry.id,
          currentStatus: entry.status,
          approvedByHandle: entry.approvedByHandle ?? null,
        }));

      this.logger.log(
        `Approved ${update.count} of ${dto.entryIds.length} entries on assignment ${assignmentId}`,
      );

      return {
        approved: approvedEntries,
        skipped,
      };
    });

    await this.emitEvents(context, [
      {
        topic: TimesheetEventTopics.Approved,
        entries: result.approved,
        comment: dto.approvalComment,
      },
    ]);

    return {
      approved: result.approved.map((entry) => entry.id),
      skipped: result.skipped,
    };
  }

  /**
   * Returns approved entries to draft so they can be corrected and resubmitted.
   *
   * A reopened entry goes back to DRAFT rather than gaining a fourth status: `reopenedAt` plus the
   * audit record preserve the fact that it was once approved, which is what the UI badges from.
   */
  async reopenEntries(
    engagementId: string,
    assignmentId: string,
    dto: ReopenTimesheetEntriesDto,
    authUser?: Record<string, any>,
  ): Promise<TimesheetViewResponseDto> {
    const context = await this.resolveContext(
      engagementId,
      assignmentId,
      authUser,
    );

    if (!context.isAdministrator) {
      throw new ForbiddenException(ERROR_MESSAGES.TimesheetReopenAdminOnly);
    }

    const entries = await this.loadEntriesForAction(assignmentId, dto.entryIds);
    const notApproved = entries.filter(
      (entry) => entry.status !== TimesheetEntryStatus.APPROVED,
    );

    if (notApproved.length) {
      throw new BadRequestException({
        message: ERROR_MESSAGES.TimesheetReopenNotApproved,
        entries: notApproved.map((entry) => ({
          id: entry.id,
          workDate: toDateString(entry.workDate),
          currentStatus: entry.status,
        })),
      });
    }

    const reopenedAt = new Date();
    const reopened = await this.db.$transaction(async (tx) => {
      const updatedEntries: EngagementTimesheetEntry[] = [];

      for (const entry of entries) {
        const updated = await tx.engagementTimesheetEntry.update({
          where: { id: entry.id },
          data: {
            status: TimesheetEntryStatus.DRAFT,
            reopenedAt,
            approvedAt: null,
            approvedBy: null,
            approvedByHandle: null,
            approvalComment: null,
            updatedBy: context.actorUserId,
          },
        });

        await this.audit.record(tx, {
          timesheetEntryId: entry.id,
          action: TimesheetAuditAction.REOPENED,
          previousValues: {
            status: entry.status,
            hoursWorked: entry.hoursWorked,
            approvedByHandle: entry.approvedByHandle,
            approvalComment: entry.approvalComment,
          },
          updatedValues: {
            status: updated.status,
            hoursWorked: updated.hoursWorked,
            reopenedAt: reopenedAt.toISOString(),
          },
          actorUserId: context.actorUserId,
          actorHandle: context.actorHandle,
          actorRole: TimesheetActorRole.Administrator,
          comment: dto.overrideReason,
        });

        updatedEntries.push(updated);
      }

      return updatedEntries;
    });

    await this.emitEvents(context, [
      {
        topic: TimesheetEventTopics.Reopened,
        entries: reopened,
        comment: dto.overrideReason,
      },
    ]);

    return this.findTimesheet(engagementId, assignmentId, {}, authUser);
  }

  /**
   * Role-aware landing list: one row per (engagement, assignee).
   *
   * A manager sees only the engagements where they hold live approval authority; an administrator sees
   * every engagement eligible for timesheet management.
   */
  async findEngagements(
    query: TimesheetEngagementQueryDto,
    authUser?: Record<string, any>,
  ): Promise<PaginatedResponse<TimesheetEngagementRowDto>> {
    const isAdministrator = this.access.isAdministrator(authUser);
    const callerUserId = normalizeUserId(authUser?.userId);

    if (!isAdministrator && !callerUserId) {
      throw new ForbiddenException(ERROR_MESSAGES.UnauthorizedTimesheetList);
    }

    const fromDate = query.fromDate
      ? toWorkDate(query.fromDate, "fromDate")
      : undefined;
    const toDate = query.toDate
      ? toWorkDate(query.toDate, "toDate")
      : undefined;
    this.assertValidRange(fromDate, toDate);

    const where = this.buildEngagementListWhere(
      query,
      isAdministrator,
      callerUserId,
      fromDate,
      toDate,
    );

    const page = query.page;
    const perPage = query.perPage;
    const [totalCount, assignments] = await Promise.all([
      this.db.engagementAssignment.count({ where }),
      this.db.engagementAssignment.findMany({
        where,
        include: { engagement: { select: { id: true, title: true } } },
        orderBy: [{ engagement: { title: "asc" } }, { memberHandle: "asc" }],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    const assignmentIds = assignments.map((assignment) => assignment.id);

    // One grouped query for the rolled-up status, and one batched member lookup for names. Both keep
    // the list off an N+1 as the assignee count grows.
    const [pendingGroups, nameByUserId] = await Promise.all([
      assignmentIds.length
        ? this.db.engagementTimesheetEntry.groupBy({
            by: ["engagementAssignmentId"],
            where: {
              engagementAssignmentId: { in: assignmentIds },
              status: TimesheetEntryStatus.SUBMITTED,
            },
            _count: { _all: true },
          })
        : Promise.resolve([]),
      this.resolveMemberNames(
        assignments.map((assignment) => assignment.memberId),
      ),
    ]);
    const pendingAssignmentIds = new Set(
      pendingGroups.map((group) => group.engagementAssignmentId),
    );

    const data: TimesheetEngagementRowDto[] = assignments.map((assignment) => ({
      engagementId: assignment.engagementId,
      engagementTitle: assignment.engagement.title,
      assignmentId: assignment.id,
      assigneeId: assignment.memberId,
      assigneeHandle: assignment.memberHandle,
      assigneeName: nameByUserId.get(assignment.memberId) ?? null,
      timesheetStatus: pendingAssignmentIds.has(assignment.id)
        ? TimesheetRollupStatus.PendingApproval
        : TimesheetRollupStatus.Approved,
      viewerRole: isAdministrator
        ? TimesheetViewerRole.Administrator
        : TimesheetViewerRole.Manager,
    }));

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

  private buildEngagementListWhere(
    query: TimesheetEngagementQueryDto,
    isAdministrator: boolean,
    callerUserId: string | undefined,
    fromDate?: Date,
    toDate?: Date,
  ): Prisma.EngagementAssignmentWhereInput {
    // "Eligible for timesheet management" means an assignment someone could still be logging hours
    // against, or one that already has entries worth reviewing or paying. A rejected offer with no
    // entries has no timesheet to manage.
    const where: Prisma.EngagementAssignmentWhereInput = {
      OR: [
        { status: { in: ACTIVE_ASSIGNMENT_STATUSES } },
        { timesheetEntries: { some: {} } },
      ],
    };
    const engagementFilters: Prisma.EngagementWhereInput = {};

    if (!isAdministrator) {
      // A manager's authority is the filter: only engagements carrying a live manager row for them.
      engagementFilters.managers = {
        some: { managerUserId: callerUserId, removedAt: null },
      };
    } else if (query.manager) {
      engagementFilters.managers = {
        some: {
          managerHandle: { contains: query.manager, mode: "insensitive" },
          removedAt: null,
        },
      };
    }

    if (query.title) {
      engagementFilters.title = { contains: query.title, mode: "insensitive" };
    }

    if (Object.keys(engagementFilters).length) {
      where.engagement = engagementFilters;
    }

    if (query.assignee) {
      where.memberHandle = { contains: query.assignee, mode: "insensitive" };
    }

    const entryDateFilter =
      fromDate || toDate
        ? {
            workDate: {
              ...(fromDate ? { gte: fromDate } : {}),
              ...(toDate ? { lte: toDate } : {}),
            },
          }
        : undefined;

    if (entryDateFilter) {
      where.timesheetEntries = { some: entryDateFilter };
    }

    if (query.status === TimesheetRollupStatus.PendingApproval) {
      where.timesheetEntries = {
        some: {
          ...(entryDateFilter ?? {}),
          status: TimesheetEntryStatus.SUBMITTED,
        },
      };
    } else if (query.status === TimesheetRollupStatus.Approved) {
      where.timesheetEntries = {
        ...(entryDateFilter ? { some: entryDateFilter } : {}),
        none: {
          ...(entryDateFilter ?? {}),
          status: TimesheetEntryStatus.SUBMITTED,
        },
      };
    }

    return where;
  }

  /**
   * Loads the assignment, checks it belongs to the engagement in the path, and resolves the caller's
   * role - all before any endpoint touches an entry.
   */
  private async resolveContext(
    engagementId: string,
    assignmentId: string,
    authUser?: Record<string, any>,
  ): Promise<TimesheetContext> {
    const assignment = await this.db.engagementAssignment.findUnique({
      where: { id: assignmentId },
      include: { engagement: { select: { id: true, title: true } } },
    });

    // A mismatched engagement is treated exactly like a missing assignment: the caller learns nothing
    // about ids they have no relationship to.
    if (!assignment || assignment.engagementId !== engagementId) {
      throw new NotFoundException(ERROR_MESSAGES.TimesheetNotFound);
    }

    const viewerRole = await this.access.resolveTimesheetRole(
      authUser,
      assignment,
    );

    return {
      assignment,
      viewerRole,
      actorUserId: getUserIdentifier(authUser),
      actorHandle: authUser?.handle ?? null,
      isAdministrator: viewerRole === TimesheetViewerRole.Administrator,
    };
  }

  /**
   * Validates and normalizes an upsert payload before anything is written.
   */
  private parseUpsertEntries(entries: UpsertTimesheetEntryDto[]): Array<{
    workDate: Date;
    hoursWorked: Prisma.Decimal;
    remarks: string | null;
  }> {
    const seenDates = new Set<string>();

    const parsed = entries.map((entry) => {
      const workDate = toWorkDate(entry.workDate);
      const dateKey = toDateString(workDate);

      if (seenDates.has(dateKey)) {
        throw new BadRequestException(
          `${ERROR_MESSAGES.TimesheetDuplicateWorkDate} (${dateKey})`,
        );
      }
      seenDates.add(dateKey);

      const hoursWorked = this.parseHours(entry.hoursWorked, dateKey);

      return {
        workDate,
        hoursWorked,
        remarks: entry.remarks?.trim() || null,
      };
    });

    const dates = parsed
      .map((entry) => entry.workDate.getTime())
      .sort((left, right) => left - right);
    const spanDays = dates.length
      ? (dates[dates.length - 1] - dates[0]) / DAY_IN_MS + 1
      : 0;

    if (spanDays > TIMESHEET_MAX_RANGE_DAYS) {
      throw new BadRequestException(ERROR_MESSAGES.TimesheetRangeTooLong);
    }

    return parsed;
  }

  private parseHours(value: string | number, dateKey: string): Prisma.Decimal {
    const raw = typeof value === "string" ? value.trim() : value;

    if (raw === "" || raw === null || raw === undefined) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.TimesheetHoursRequired} (${dateKey})`,
      );
    }

    let hours: Prisma.Decimal;
    try {
      hours = new Prisma.Decimal(raw);
    } catch {
      throw new BadRequestException(
        `${ERROR_MESSAGES.TimesheetHoursNumeric} (${dateKey})`,
      );
    }

    if (!hours.isFinite()) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.TimesheetHoursNumeric} (${dateKey})`,
      );
    }

    if (hours.isNegative()) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.TimesheetHoursNegative} (${dateKey})`,
      );
    }

    if (hours.greaterThan(TIMESHEET_MAX_HOURS_PER_DAY)) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.TimesheetHoursTooHigh} (${dateKey})`,
      );
    }

    return hours;
  }

  private assertValidRange(fromDate?: Date, toDate?: Date): void {
    if (!fromDate || !toDate) {
      return;
    }

    if (toDate.getTime() < fromDate.getTime()) {
      throw new BadRequestException(ERROR_MESSAGES.TimesheetRangeInverted);
    }

    const spanDays = (toDate.getTime() - fromDate.getTime()) / DAY_IN_MS + 1;
    if (spanDays > TIMESHEET_MAX_RANGE_DAYS) {
      throw new BadRequestException(ERROR_MESSAGES.TimesheetRangeTooLong);
    }
  }

  /**
   * Loads the entries an action names, refusing ids that belong to another assignment.
   */
  private async loadEntriesForAction(
    assignmentId: string,
    entryIds: string[],
  ): Promise<EngagementTimesheetEntry[]> {
    const entries = await this.db.engagementTimesheetEntry.findMany({
      where: { id: { in: entryIds }, engagementAssignmentId: assignmentId },
      orderBy: { workDate: "asc" },
    });

    if (entries.length !== entryIds.length) {
      const found = new Set(entries.map((entry) => entry.id));
      const missing = entryIds.filter((id) => !found.has(id));

      throw new NotFoundException(
        `${ERROR_MESSAGES.TimesheetEntriesNotFound} (${missing.join(", ")})`,
      );
    }

    return entries;
  }

  private toActorRole(context: TimesheetContext): TimesheetActorRole {
    return context.viewerRole;
  }

  private async resolveMemberNames(
    userIds: string[],
  ): Promise<Map<string, string>> {
    try {
      return await this.memberService.getMemberNamesByUserIds(userIds);
    } catch (error) {
      // A display name is not worth failing a timesheet read over; callers fall back to the handle.
      this.logger.warn(
        `Failed to resolve member names: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return new Map();
    }
  }

  private async toTimesheetView(
    context: TimesheetContext,
    entries: EngagementTimesheetEntry[],
  ): Promise<TimesheetViewResponseDto> {
    const { assignment } = context;
    const [managersByEngagement, nameByUserId] = await Promise.all([
      this.access.findActiveManagers([assignment.engagementId]),
      this.resolveMemberNames([assignment.memberId]),
    ]);

    return {
      viewerRole: context.viewerRole,
      engagementId: assignment.engagementId,
      engagementTitle: assignment.engagement.title,
      assignment: {
        id: assignment.id,
        memberId: assignment.memberId,
        memberHandle: assignment.memberHandle,
        memberName: nameByUserId.get(assignment.memberId) ?? null,
        status: assignment.status,
        standardHoursPerDay: assignment.standardHoursPerDay ?? null,
        startDate: assignment.startDate ?? null,
        endDate: assignment.endDate ?? null,
      },
      managers: managersByEngagement.get(assignment.engagementId) ?? [],
      entries: entries.map((entry) => this.toEntryDto(assignment, entry)),
    };
  }

  private toEntryDto(
    assignment: EngagementAssignment,
    entry: EngagementTimesheetEntry,
  ): TimesheetEntryResponseDto {
    return {
      id: entry.id,
      workDate: toDateString(entry.workDate),
      hoursWorked: entry.hoursWorked.toFixed(2),
      remarks: entry.remarks ?? null,
      status: entry.status,
      submittedAt: entry.submittedAt ?? null,
      approvedByHandle: entry.approvedByHandle ?? null,
      approvedAt: entry.approvedAt ?? null,
      approvalComment: entry.approvalComment ?? null,
      reopenedAt: entry.reopenedAt ?? null,
      outsideAssignmentWindow: this.isOutsideAssignmentWindow(
        assignment,
        entry.workDate,
      ),
      isPaid: Boolean(entry.paidPaymentReference),
    };
  }

  /**
   * Entries outside the assignment's dates are allowed - assignment dates are often set loosely - but
   * flagged so the administrator view can surface them.
   */
  private isOutsideAssignmentWindow(
    assignment: EngagementAssignment,
    workDate: Date,
  ): boolean {
    const workTime = workDate.getTime();
    const startDate = assignment.startDate
      ? toWorkDate(toDateString(assignment.startDate)).getTime()
      : undefined;
    const endDate = assignment.endDate
      ? toWorkDate(toDateString(assignment.endDate)).getTime()
      : undefined;

    return Boolean(
      (startDate !== undefined && workTime < startDate) ||
      (endDate !== undefined && workTime > endDate),
    );
  }

  private async emitEvents(
    context: TimesheetContext,
    pending: PendingEvent[],
  ): Promise<void> {
    for (const event of pending) {
      if (!event.entries.length) {
        continue;
      }

      const payload: TimesheetEventPayload = {
        engagementId: context.assignment.engagementId,
        assignmentId: context.assignment.id,
        memberId: context.assignment.memberId,
        memberHandle: context.assignment.memberHandle,
        actorUserId: context.actorUserId,
        actorHandle: context.actorHandle,
        actorRole: context.viewerRole,
        entryIds: event.entries.map((entry) => entry.id),
        workDates: event.entries.map((entry) => toDateString(entry.workDate)),
        totalHours: event.entries
          .reduce(
            (total, entry) => total.plus(entry.hoursWorked),
            new Prisma.Decimal(0),
          )
          .toFixed(2),
        comment: event.comment ?? null,
      };

      await this.events.emit(event.topic, payload);
    }
  }
}
