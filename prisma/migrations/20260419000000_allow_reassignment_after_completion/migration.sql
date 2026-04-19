DROP INDEX IF EXISTS "EngagementAssignment_engagementId_memberId_key";

CREATE UNIQUE INDEX "EngagementAssignment_engagementId_memberId_active_key"
ON "EngagementAssignment"("engagementId", "memberId")
WHERE "status" NOT IN ('OFFER_REJECTED', 'COMPLETED', 'TERMINATED');
