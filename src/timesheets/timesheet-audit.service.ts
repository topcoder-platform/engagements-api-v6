import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma, TimesheetAuditAction } from "@prisma/client";
import { nanoid } from "nanoid";
import { TimesheetActorRole } from "./timesheet-roles";

/**
 * Snapshot of the fields an audit record tracks. Recorded before and after a change so the trail can
 * answer what the value and status were, and what they became.
 */
export interface TimesheetAuditSnapshot {
  hoursWorked?: Prisma.Decimal | string | number | null;
  remarks?: string | null;
  status?: string | null;
  [key: string]: unknown;
}

interface TimesheetAuditBase {
  action: TimesheetAuditAction;
  previousValues?: TimesheetAuditSnapshot | null;
  updatedValues?: TimesheetAuditSnapshot | null;
  actorUserId: string;
  actorHandle?: string | null;
  actorRole: TimesheetActorRole;
  /** Approval comment, or the override reason on an administrator action. */
  comment?: string | null;
}

/** An entry-scoped event: everything that happens to one timesheet entry. */
export interface TimesheetEntryAuditInput extends TimesheetAuditBase {
  timesheetEntryId: string;
  engagementId?: never;
}

/** An engagement-scoped event: manager assignment and removal, which have no entry. */
export interface TimesheetEngagementAuditInput extends TimesheetAuditBase {
  engagementId: string;
  timesheetEntryId?: never;
}

export type TimesheetAuditInput =
  | TimesheetEntryAuditInput
  | TimesheetEngagementAuditInput;

@Injectable()
export class TimesheetAuditService {
  /**
   * Writes one audit record using the caller's transaction client.
   *
   * The transaction client is a required argument rather than an optional one on purpose: every
   * timesheet mutation writes its audit record inside the same transaction as the change, so a
   * mutation that succeeds while its audit record fails is impossible in both directions. An audit
   * trail that a failure can skip is not an audit trail.
   */
  async record(
    tx: Prisma.TransactionClient,
    input: TimesheetAuditInput,
  ): Promise<void> {
    const timesheetEntryId = input.timesheetEntryId ?? null;
    const engagementId = input.engagementId ?? null;

    // Mirrors the database check constraint, so a bad call fails with a useful message instead of a
    // constraint violation.
    if (Boolean(timesheetEntryId) === Boolean(engagementId)) {
      throw new BadRequestException(
        "A timesheet audit record must reference exactly one of timesheetEntryId or engagementId.",
      );
    }

    await tx.engagementTimesheetAudit.create({
      data: {
        id: nanoid(),
        timesheetEntryId,
        engagementId,
        action: input.action,
        previousValues: this.toJson(input.previousValues),
        updatedValues: this.toJson(input.updatedValues),
        actorUserId: input.actorUserId,
        actorHandle: input.actorHandle ?? null,
        actorRole: input.actorRole,
        comment: input.comment ?? null,
      },
    });
  }

  /**
   * Writes one audit record per target, for the bulk actions (submit, approve, reopen, payment
   * linkage) that act on a set of entries under a single comment or reason.
   */
  async recordMany(
    tx: Prisma.TransactionClient,
    inputs: TimesheetAuditInput[],
  ): Promise<void> {
    for (const input of inputs) {
      await this.record(tx, input);
    }
  }

  /**
   * Decimal values must reach the audit record as strings. Serialising a Prisma.Decimal straight into
   * JSON would go through a float and could record 8.499999999 as the hours somebody actually logged.
   */
  private toJson(
    snapshot?: TimesheetAuditSnapshot | null,
  ): Prisma.InputJsonValue | typeof Prisma.DbNull {
    if (!snapshot) {
      return Prisma.DbNull;
    }

    const normalized = Object.entries(snapshot).reduce<Record<string, unknown>>(
      (accumulator, [key, value]) => {
        if (value === undefined) {
          return accumulator;
        }

        accumulator[key] =
          value instanceof Prisma.Decimal ? value.toFixed(2) : value;

        return accumulator;
      },
      {},
    );

    return normalized as Prisma.InputJsonValue;
  }
}
