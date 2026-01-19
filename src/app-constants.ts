export const Scopes = {
  ReadEngagements: "read:engagements",
  WriteEngagements: "write:engagements",
  ManageEngagements: "manage:engagements",
  ReadApplications: "read:applications",
  WriteApplications: "write:applications",
  ReadFeedback: "read:feedback",
  WriteFeedback: "write:feedback",
};

export const UserRoles = {
  Admin: "Administrator",
  ProjectManager: "Topcoder Project Manager",
  TaskManager: "Topcoder Task Manager",
};

export const ProjectManagerRoles = [
  UserRoles.ProjectManager,
  "Project Manager",
];

export const TaskManagerRoles = [
  UserRoles.TaskManager,
  "Task Manager",
];

export const ManagerRoles = [
  ...ProjectManagerRoles,
  ...TaskManagerRoles,
];

export const PrivilegedUserRoles = [
  UserRoles.Admin,
  ...ManagerRoles,
];
