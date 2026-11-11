-- Saved Flexi Talent cost calculations, several per lead.

-- CreateEnum
CREATE TYPE "LeadCalculationMemberInput" AS ENUM ('MEMBER_COST', 'MEMBER_RATE');

-- CreateEnum
CREATE TYPE "LeadCalculationCommercialInput" AS ENUM ('TC_MARGIN_PERCENT', 'TC_MARGIN_AMOUNT', 'BOOKING_COST', 'BOOKING_RATE', 'ACTUAL_COST', 'ACTUAL_RATE');

-- CreateTable
CREATE TABLE "EngagementLeadCalculation" (
    "id" TEXT NOT NULL,
    "engagementLeadId" TEXT NOT NULL,
    "memberName" TEXT,
    "accountName" TEXT,
    "smu" TEXT,
    "durationWeeks" DECIMAL(8,2),
    "hoursPerDay" DECIMAL(5,2),
    "referral" BOOLEAN NOT NULL DEFAULT false,
    "memberInputField" "LeadCalculationMemberInput",
    "memberInputValue" DECIMAL(14,4),
    "commercialInputField" "LeadCalculationCommercialInput",
    "commercialInputValue" DECIMAL(14,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EngagementLeadCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngagementLeadCalculation_engagementLeadId_createdAt_idx" ON "EngagementLeadCalculation"("engagementLeadId", "createdAt");

-- AddForeignKey
ALTER TABLE "EngagementLeadCalculation" ADD CONSTRAINT "EngagementLeadCalculation_engagementLeadId_fkey" FOREIGN KEY ("engagementLeadId") REFERENCES "EngagementLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
