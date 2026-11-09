-- Rejecting a lead now requires a reason.
-- AlterTable
ALTER TABLE "EngagementLead" ADD COLUMN "rejectionReason" TEXT;
