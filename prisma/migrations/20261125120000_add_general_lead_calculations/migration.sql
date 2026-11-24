-- A calculation without a lead is a general one from the Leads page, owned by its creator.
ALTER TABLE "EngagementLeadCalculation" ALTER COLUMN "engagementLeadId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "EngagementLeadCalculation_createdBy_createdAt_idx" ON "EngagementLeadCalculation"("createdBy", "createdAt");
