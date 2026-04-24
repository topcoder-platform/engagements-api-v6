import { AssignmentStatus } from "@prisma/client";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 20;

export const ACTIVE_ASSIGNMENT_STATUSES: AssignmentStatus[] = [
  AssignmentStatus.SELECTED,
  AssignmentStatus.ASSIGNED,
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
