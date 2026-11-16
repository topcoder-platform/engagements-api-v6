import { BadRequestException } from "@nestjs/common";

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
