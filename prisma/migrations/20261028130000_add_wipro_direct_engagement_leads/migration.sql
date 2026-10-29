-- Wipro Direct leads come from a shorter intake form, so the fields that form does not collect become optional.
-- CreateEnum
CREATE TYPE "EngagementLeadType" AS ENUM ('WIPRO_CONSUMPTION', 'WIPRO_DIRECT');

-- AlterTable
ALTER TABLE "EngagementLead" ADD COLUMN "leadType" "EngagementLeadType" NOT NULL DEFAULT 'WIPRO_CONSUMPTION',
ALTER COLUMN "engagementModel" DROP NOT NULL,
ALTER COLUMN "roleTitle" DROP NOT NULL,
ALTER COLUMN "experienceLevel" DROP NOT NULL,
ALTER COLUMN "minYearsExperience" DROP NOT NULL,
ALTER COLUMN "preferredStartDate" DROP NOT NULL,
ALTER COLUMN "billRateCurrency" DROP NOT NULL,
ALTER COLUMN "billRateAmount" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "EngagementLead_leadType_idx" ON "EngagementLead"("leadType");
