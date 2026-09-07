-- CreateEnum
CREATE TYPE "EngagementLeadStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'QUALIFIED', 'CONVERTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EngagementModel" AS ENUM ('TIME_AND_MATERIAL', 'FIXED_PRICE');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('JUNIOR', 'MID', 'SENIOR', 'LEAD_ARCHITECT');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "EngagementLead" (
    "id" TEXT NOT NULL,
    "workEmail" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "smu" TEXT NOT NULL,
    "engagementModel" "EngagementModel" NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "requiredSkills" TEXT[],
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "minYearsExperience" INTEGER NOT NULL,
    "industryDomain" TEXT,
    "resourcesRequired" INTEGER NOT NULL,
    "preferredStartDate" TIMESTAMP(3) NOT NULL,
    "engagementDuration" TEXT NOT NULL,
    "workingHoursPerDay" DOUBLE PRECISION NOT NULL,
    "timeZoneRequirement" TEXT NOT NULL,
    "remoteWorkAccepted" BOOLEAN NOT NULL,
    "workLocationRestrictions" TEXT,
    "billRateCurrency" TEXT NOT NULL,
    "billRateAmount" TEXT NOT NULL,
    "priority" "LeadPriority" NOT NULL,
    "additionalRequirements" TEXT,
    "status" "EngagementLeadStatus" NOT NULL DEFAULT 'SUBMITTED',
    "convertedEngagementId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EngagementLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngagementLead_status_idx" ON "EngagementLead"("status");

-- CreateIndex
CREATE INDEX "EngagementLead_workEmail_idx" ON "EngagementLead"("workEmail");

-- CreateIndex
CREATE INDEX "EngagementLead_accountName_idx" ON "EngagementLead"("accountName");

-- CreateIndex
CREATE INDEX "EngagementLead_createdAt_idx" ON "EngagementLead"("createdAt");
