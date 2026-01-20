export const normalizeUserId = (
  userId?: string | number | null,
): string | undefined => {
  if (userId === undefined || userId === null) {
    return undefined;
  }

  if (typeof userId === "number") {
    if (Number.isNaN(userId)) {
      return undefined;
    }
    return String(userId);
  }

  if (userId === "NaN") {
    return undefined;
  }

  return userId;
};

export const getUserIdentifier = (
  authUser?: Record<string, any>,
): string => {
  if (authUser?.isMachine) {
    return "system";
  }

  return normalizeUserId(authUser?.userId) ?? "system";
};

const appendRoles = (roles: string[], value: unknown): void => {
  if (Array.isArray(value)) {
    value.forEach((role) => {
      if (typeof role === "string" && role.trim()) {
        roles.push(role.trim());
      }
    });
    return;
  }

  if (typeof value === "string" && value.trim()) {
    value
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean)
      .forEach((role) => roles.push(role));
  }
};

export const getUserRoles = (authUser?: Record<string, any>): string[] => {
  const roles: string[] = [];

  appendRoles(roles, authUser?.roles);
  appendRoles(roles, authUser?.role);

  return roles;
};
