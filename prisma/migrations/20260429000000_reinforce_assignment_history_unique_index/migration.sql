-- Re-apply the PM-4892 assignment uniqueness model for environments that
-- tested a branch without the history-preserving migration in its baseline.
DROP INDEX IF EXISTS "EngagementAssignment_engagementId_memberId_key";

CREATE INDEX IF NOT EXISTS "EngagementAssignment_engagementId_memberId_idx"
ON "EngagementAssignment"("engagementId", "memberId");

DROP INDEX IF EXISTS "EngagementAssignment_active_engagementId_memberId_key";

CREATE UNIQUE INDEX "EngagementAssignment_active_engagementId_memberId_key"
ON "EngagementAssignment"("engagementId", "memberId")
WHERE "status" IN ('SELECTED', 'ASSIGNED');
