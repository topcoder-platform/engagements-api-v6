import { BadRequestException } from "@nestjs/common";
import { EngagementAssignment, Prisma } from "@prisma/client";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Parses a YYYY-MM-DD filter into the UTC midnight a `@db.Date` column compares against. */
export function parseWorkDateFilter(value: string, field: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  const parsed = match
    ? new Date(
        Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
      )
    : undefined;

  if (!parsed || Number.isNaN(parsed.getTime())) {
    throw new BadRequestException(`${field} must be a YYYY-MM-DD date.`);
  }

  return parsed;
}

/** Formats a stored date column back to the YYYY-MM-DD the API speaks. */
export function toWorkDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

/** Calendar days from `fromDate` to `toDate`, both included. */
export function countWorkDays(fromDate: Date, toDate: Date): number {
  return Math.round((toDate.getTime() - fromDate.getTime()) / DAY_IN_MS) + 1;
}

/** The UTC midnight `days` calendar days after `value`. */
export function addWorkDays(value: Date, days: number): Date {
  return new Date(value.getTime() + days * DAY_IN_MS);
}

/** The UTC calendar day a timestamp falls on, as the midnight a `@db.Date` column holds. */
export function toWorkDay(value: Date): Date {
  return new Date(
    Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
  );
}

/**
 * Hours an assignee is expected to log over a period: standard hours per day times the weekdays
 * (Monday to Friday) in the period, counting only days inside the assignment's start and end dates.
 *
 * Null when the period is open-ended, falls outside the assignment, or the assignment has no standard
 * hours to compare against.
 */
export function computeExpectedHours(
  assignment: Pick<
    EngagementAssignment,
    "standardHoursPerDay" | "standardHoursPerWeek" | "startDate" | "endDate"
  >,
  fromDate?: Date,
  toDate?: Date,
): string | null {
  // Older assignments only carry the deprecated weekly figure; a working week is five days.
  const hoursPerDay =
    assignment.standardHoursPerDay ??
    (assignment.standardHoursPerWeek
      ? assignment.standardHoursPerWeek / 5
      : null);

  if (!fromDate || !toDate || !hoursPerDay || hoursPerDay <= 0) {
    return null;
  }

  const assignmentStart = assignment.startDate
    ? toWorkDay(assignment.startDate)
    : undefined;
  const assignmentEnd = assignment.endDate
    ? toWorkDay(assignment.endDate)
    : undefined;
  const start = Math.max(fromDate.getTime(), assignmentStart?.getTime() ?? 0);
  const end = Math.min(
    toDate.getTime(),
    assignmentEnd?.getTime() ?? Number.POSITIVE_INFINITY,
  );

  if (start > end) {
    return null;
  }

  let weekdays = 0;
  for (let day = start; day <= end; day += DAY_IN_MS) {
    const dayOfWeek = new Date(day).getUTCDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      weekdays += 1;
    }
  }

  return new Prisma.Decimal(hoursPerDay).times(weekdays).toFixed(2);
}

/**
 * True when a work date has not started anywhere yet. Work dates are calendar days with no time zone,
 * and the member's is unknown here, so "today" is taken in the zone furthest ahead (UTC+14): a member
 * submitting just after midnight local time is never refused for a day that has already begun for them.
 */
export function isFutureWorkDate(
  workDate: Date,
  now: Date = new Date(),
): boolean {
  const latestToday = toWorkDay(new Date(now.getTime() + 14 * 60 * 60 * 1000));
  return toWorkDay(workDate).getTime() > latestToday.getTime();
}
