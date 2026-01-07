export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 20;

export const ERROR_MESSAGES = {
  MissingDuration:
    "Provide durationStartDate and durationEndDate, or durationWeeks, or durationMonths.",
  ApplicationDeadlineInPast: "applicationDeadline must be in the future.",
  ProjectNotFound: "Project not found.",
  InvalidSkills: "One or more required skills are invalid.",
  DuplicateApplication: "You have already applied to this engagement",
  MemberNotFound: "Member profile not found",
  EngagementNotOpen: "This engagement is no longer accepting applications",
  UnauthorizedApplicationAccess:
    "You do not have permission to view this application",
};
