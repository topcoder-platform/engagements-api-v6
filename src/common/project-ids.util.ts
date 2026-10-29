/** Splits a comma-separated project ID list, dropping blanks and duplicates. */
export function parseProjectIds(rawValue?: string): string[] {
  return Array.from(
    new Set(
      (rawValue ?? "")
        .split(",")
        .map((projectId) => projectId.trim())
        .filter(Boolean),
    ),
  );
}

/**
 * Work projects listed in `TEST_PROJECT_IDS`, which Work App lists hide on request. Read on every
 * call, so a changed value applies without a code change.
 */
export function getTestProjectIds(): string[] {
  return parseProjectIds(process.env.TEST_PROJECT_IDS);
}
