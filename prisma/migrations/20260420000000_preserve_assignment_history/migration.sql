DROP INDEX IF EXISTS "EngagementAssignment_engagementId_memberId_key";

CREATE INDEX IF NOT EXISTS "EngagementAssignment_engagementId_memberId_idx"
ON "EngagementAssignment"("engagementId", "memberId");

-- Preserve historical rows while preventing duplicate active assignments.
CREATE UNIQUE INDEX IF NOT EXISTS "EngagementAssignment_active_engagementId_memberId_key"
ON "EngagementAssignment"("engagementId", "memberId")
WHERE "status" IN ('SELECTED', 'ASSIGNED');

ALTER TABLE "EngagementAssignment"
DROP CONSTRAINT "EngagementAssignment_engagementId_fkey";

ALTER TABLE "EngagementAssignment"
ADD CONSTRAINT "EngagementAssignment_engagementId_fkey"
FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
