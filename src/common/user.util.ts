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
