export const normalizeUserId = (
  userId?: string | number | null,
): string | undefined => {
  if (userId === undefined || userId === null) {
    return undefined;
  }

  return typeof userId === "number" ? String(userId) : userId;
};

export const getUserIdentifier = (
  authUser?: Record<string, any>,
): string => {
  if (authUser?.isMachine) {
    return "system";
  }

  return normalizeUserId(authUser?.userId) ?? "system";
};
