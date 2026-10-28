-- The lead intake form no longer collects a priority, so new leads are stored without one.
ALTER TABLE "EngagementLead" ALTER COLUMN "priority" DROP NOT NULL;
