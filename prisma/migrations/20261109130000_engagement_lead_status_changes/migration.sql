-- Leads now go New -> Under Review -> Fulfilled or Lost (REJECTED).
-- AlterEnum
ALTER TYPE "EngagementLeadStatus" ADD VALUE 'FULFILLED';

-- Qualified and converted leads are shown as under review now, and creating an engagement
-- from a lead keeps it under review, so existing leads in either status move there.
UPDATE "EngagementLead"
SET "status" = 'UNDER_REVIEW'
WHERE "status" IN ('QUALIFIED', 'CONVERTED');
