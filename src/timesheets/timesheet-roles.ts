/**
 * The caller's relationship to a single timesheet, resolved server-side per assignment.
 *
 * Returned to clients as `viewerRole` on every timesheet response so the UI renders from a server
 * decision rather than guessing from JWT roles.
 */
export const TimesheetViewerRole = {
  Member: "MEMBER",
  Manager: "MANAGER",
  Administrator: "ADMINISTRATOR",
} as const;

export type TimesheetViewerRole =
  (typeof TimesheetViewerRole)[keyof typeof TimesheetViewerRole];

/**
 * Who performed an audited action. Machine tokens are recorded as MACHINE so an automated write is
 * never indistinguishable from a person's.
 */
export const TimesheetActorRole = {
  ...TimesheetViewerRole,
  Machine: "MACHINE",
} as const;

export type TimesheetActorRole =
  (typeof TimesheetActorRole)[keyof typeof TimesheetActorRole];
