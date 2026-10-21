-- Preserve the actual acceptance date for monthly activity reporting.
-- Do not backfill from mutable updatedAt or pre-acceptance createdAt timestamps.
ALTER TABLE "EngagementAssignment" ADD COLUMN "acceptedAt" TIMESTAMP(3);
