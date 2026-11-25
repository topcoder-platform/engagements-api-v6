/**
 * A save may not span more than 31 days, which also caps how many entries one request can carry: a
 * timesheet is filled in a month at a time, and the cap keeps a single call bounded. Read filters are
 * not capped - reviewing and paying routinely look back further.
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
  /** Nothing awaiting approval and nothing approved yet - no entries at all, or drafts only. */
  NotSubmitted: "Not Submitted",
} as const;

export type TimesheetRollupStatus =
  (typeof TimesheetRollupStatus)[keyof typeof TimesheetRollupStatus];

/** The rolled-up statuses the landing list can be filtered by. */
export const TIMESHEET_ROLLUP_FILTER_STATUSES: TimesheetRollupStatus[] = [
  TimesheetRollupStatus.PendingApproval,
  TimesheetRollupStatus.Approved,
];

/**
 * Bus topics for the timesheet lifecycle. Emitted from day one so the notification work in a later
 * release does not have to reopen every mutation.
 */
export const TimesheetEventTopics = {
  Submitted: "engagement.timesheet.submitted",
  Unsubmitted: "engagement.timesheet.unsubmitted",
  Approved: "engagement.timesheet.approved",
  AutoApproved: "engagement.timesheet.auto-approved",
  Reopened: "engagement.timesheet.reopened",
  ReturnedForCorrections: "engagement.timesheet.returned-for-corrections",
  RevertedToDraft: "engagement.timesheet.reverted-to-draft",
  AdminOverride: "engagement.timesheet.overridden",
} as const;

/**
 * The system's identity on everything auto-approval writes: the approval fields, the audit trail and the
 * lifecycle event. A fixed id that no Topcoder user can have keeps a system action from ever reading as
 * a person's.
 */
export const TIMESHEET_SYSTEM_ACTOR = {
  userId: "system",
  handle: "System",
} as const;

/** The approval comment auto-approval stores on every entry it approves. */
export const TIMESHEET_AUTO_APPROVAL_COMMENT = "Auto Approved by the system";

/** Days a submission waits for a manager before the system may approve it. */
export const TIMESHEET_AUTO_APPROVAL_DEFAULT_PENDING_DAYS = 7;

/** Daily at 02:00 UTC. */
export const TIMESHEET_AUTO_APPROVAL_DEFAULT_CRON = "0 2 * * *";
