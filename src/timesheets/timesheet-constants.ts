/**
 * A date range may not span more than 31 days, which also caps how many entries one request can carry:
 * a timesheet is filled in a month at a time, and the cap keeps a single call bounded.
 */
export const TIMESHEET_MAX_RANGE_DAYS = 31;

/**
 * Hard ceiling on hours for one calendar day. A soft warning above the assignment's
 * standardHoursPerDay is a UI concern; this is the limit the API refuses outright.
 */
export const TIMESHEET_MAX_HOURS_PER_DAY = 24;

/** Rolled-up per-assignee status shown on the manager and administrator landing lists. */
export const TimesheetRollupStatus = {
  PendingApproval: "Pending Approval",
  Approved: "Approved",
} as const;

export type TimesheetRollupStatus =
  (typeof TimesheetRollupStatus)[keyof typeof TimesheetRollupStatus];

/**
 * Bus topics for the timesheet lifecycle. Emitted from day one so the notification work in a later
 * release does not have to reopen every mutation.
 */
export const TimesheetEventTopics = {
  Submitted: "engagement.timesheet.submitted",
  Unsubmitted: "engagement.timesheet.unsubmitted",
  Approved: "engagement.timesheet.approved",
  Reopened: "engagement.timesheet.reopened",
  AdminOverride: "engagement.timesheet.overridden",
} as const;
