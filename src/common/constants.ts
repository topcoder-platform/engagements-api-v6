import { AssignmentStatus } from "@prisma/client";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 20;

export const ACTIVE_ASSIGNMENT_STATUSES: AssignmentStatus[] = [
  AssignmentStatus.SELECTED,
  AssignmentStatus.ASSIGNED,
];

export const MY_ASSIGNMENTS_STATUSES: AssignmentStatus[] = [
  AssignmentStatus.SELECTED,
  AssignmentStatus.ASSIGNED,
  AssignmentStatus.COMPLETED,
  AssignmentStatus.TERMINATED,
];

export const ASSIGNMENT_COMPLETION_STATUSES: AssignmentStatus[] = [
  AssignmentStatus.OFFER_REJECTED,
  AssignmentStatus.COMPLETED,
  AssignmentStatus.TERMINATED,
];

export const ERROR_MESSAGES = {
  MissingDuration:
    "Provide durationStartDate and durationEndDate, or durationWeeks, or durationMonths.",
  ProjectNotFound: "Project not found.",
  ProjectChangeBlockedByBillingAccount:
    "Cannot change engagement project because the current project has a billing account assigned.",
  InvalidSkills: "One or more required skills are invalid.",
  DuplicateApplication: "You have already applied to this engagement",
  MemberNotFound: "Member profile not found",
  EngagementNotOpen: "This engagement is no longer accepting applications",
  UnauthorizedApplicationAccess:
    "You do not have permission to view this application",
  EngagementNotAssigned:
    "Cannot add feedback to an engagement that is not assigned to a member",
  AssignmentNotFound: "Engagement assignment not found",
  TimesheetNotFound: "Timesheet not found",
  TimesheetEntriesNotFound:
    "One or more timesheet entries were not found on this assignment.",
  TimesheetEntryApprovedReadOnly:
    "Approved timesheet entries cannot be changed. Ask an administrator to reopen them.",
  TimesheetOverrideReasonRequired:
    "An override reason is required when an administrator acts on another user's behalf.",
  TimesheetManagerCannotEdit:
    "Managers can approve timesheet entries but cannot change hours or remarks.",
  TimesheetManagerCannotSubmit:
    "Managers cannot submit timesheet entries on a member's behalf.",
  TimesheetMemberCannotApprove:
    "Only an assigned manager or an administrator can approve timesheet entries.",
  TimesheetAuditAdminOnly:
    "Only an administrator can read timesheet audit history.",
  TimesheetReopenAdminOnly:
    "Only an administrator can reopen approved timesheet entries.",
  TimesheetReopenNotApproved:
    "Only approved timesheet entries can be reopened.",
  TimesheetSubmitRejected:
    "Some entries cannot be submitted, so nothing was submitted.",
  TimesheetDuplicateWorkDate:
    "The same work date appears more than once in this request.",
  TimesheetHoursRequired: "Hours worked is required.",
  TimesheetHoursNumeric: "Hours worked must be a number.",
  TimesheetHoursNegative: "Hours worked cannot be negative.",
  TimesheetHoursTooHigh: "Hours worked cannot exceed 24 for a single day.",
  TimesheetRangeInverted: "The to date cannot be earlier than the from date.",
  TimesheetRangeTooLong:
    "A timesheet date range cannot span more than 31 days.",
  UnauthorizedTimesheetList:
    "You do not have permission to list timesheet engagements.",
  EngagementNotFound: "Engagement not found",
  ManagerUserIdRequired: "A Topcoder user id is required.",
  ManagerHandleUnresolved:
    "No Topcoder member was found for that user id. Send the manager's handle alongside the user id, or check the id.",
  DuplicateEngagementManager:
    "That member is already assigned as a manager on this engagement.",
  EngagementManagerNotFound:
    "That member is not assigned as a manager on this engagement.",
  UnauthorizedManagerRead:
    "You do not have permission to view managers for this engagement.",
  UnauthorizedManagerChange:
    "Only administrators can change engagement manager assignments.",
  AssignmentEngagementMismatch:
    "Assignment does not belong to the specified engagement",
  FeedbackTokenExpired:
    "The feedback link has expired. Please request a new link.",
  FeedbackTokenInvalid:
    "Invalid feedback link. Please check the URL or request a new link.",
  MemberExperienceNotFound: "Member experience record not found",
  UnauthorizedExperienceAccess:
    "You do not have permission to access this experience record",
  EngagementHasMembers:
    "This engagement cannot be deleted because it has member assignment history. Cancel the engagement instead.",
};
