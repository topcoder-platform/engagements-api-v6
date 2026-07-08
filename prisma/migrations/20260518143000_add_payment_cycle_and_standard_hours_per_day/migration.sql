-- Add payment-cycle support and daily-hours storage for engagement assignments.
CREATE TYPE "PaymentCycle" AS ENUM ('WEEKLY', 'FORTNIGHTLY', 'MONTHLY');

ALTER TABLE "EngagementAssignment"
ADD COLUMN "paymentCycle" "PaymentCycle" NOT NULL DEFAULT 'WEEKLY',
ADD COLUMN "standardHoursPerDay" DOUBLE PRECISION;

UPDATE "EngagementAssignment"
SET "standardHoursPerDay" = ROUND(("standardHoursPerWeek" / 5.0)::numeric, 2)
WHERE "standardHoursPerDay" IS NULL
  AND "standardHoursPerWeek" IS NOT NULL
  AND "standardHoursPerWeek" > 0;
