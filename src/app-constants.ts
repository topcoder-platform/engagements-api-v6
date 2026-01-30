export const Scopes = {
  ReadEngagements: "read:engagements",
  WriteEngagements: "write:engagements",
  ManageEngagements: "manage:engagements",
  ReadApplications: "read:applications",
  WriteApplications: "write:applications",
  ReadFeedback: "read:feedback",
  WriteFeedback: "write:feedback",
  ReadMemberExperience: "read:member-experience",
  WriteMemberExperience: "write:member-experience",
};

export const UserRoles = {
  Admin: "Administrator",
  ProjectManager: "Topcoder Project Manager",
  TaskManager: "Topcoder Task Manager",
  TalentManager: "Topcoder Talent Manager",
};

export const ProjectManagerRoles = [
  UserRoles.ProjectManager,
  "Project Manager",
];

export const TaskManagerRoles = [UserRoles.TaskManager, "Task Manager"];

export const TalentManagerRoles = [UserRoles.TalentManager, "Talent Manager"];

export const ManagerRoles = [
  ...ProjectManagerRoles,
  ...TaskManagerRoles,
  ...TalentManagerRoles,
];

export const PrivilegedUserRoles = [UserRoles.Admin, ...ManagerRoles];
