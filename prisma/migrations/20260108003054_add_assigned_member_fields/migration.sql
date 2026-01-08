-- CreateEnum
CREATE TYPE "EngagementStatus" AS ENUM ('OPEN', 'PENDING_ASSIGNMENT', 'CLOSED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationStartDate" TIMESTAMP(3),
    "durationEndDate" TIMESTAMP(3),
    "durationWeeks" INTEGER,
    "durationMonths" INTEGER,
    "timeZones" TEXT[],
    "countries" TEXT[],
    "requiredSkills" TEXT[],
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "status" "EngagementStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "assignedMemberId" TEXT,
    "assignedMemberHandle" TEXT,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngagementApplication" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "portfolioUrls" TEXT[],
    "yearsOfExperience" INTEGER,
    "availability" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EngagementApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Engagement_projectId_idx" ON "Engagement"("projectId");

-- CreateIndex
CREATE INDEX "Engagement_status_idx" ON "Engagement"("status");

-- CreateIndex
CREATE INDEX "Engagement_applicationDeadline_idx" ON "Engagement"("applicationDeadline");

-- CreateIndex
CREATE INDEX "Engagement_status_applicationDeadline_idx" ON "Engagement"("status", "applicationDeadline");

-- CreateIndex
CREATE INDEX "Engagement_assignedMemberId_idx" ON "Engagement"("assignedMemberId");

-- CreateIndex
CREATE INDEX "EngagementApplication_userId_idx" ON "EngagementApplication"("userId");

-- CreateIndex
CREATE INDEX "EngagementApplication_engagementId_idx" ON "EngagementApplication"("engagementId");

-- CreateIndex
CREATE INDEX "EngagementApplication_status_idx" ON "EngagementApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "EngagementApplication_engagementId_userId_key" ON "EngagementApplication"("engagementId", "userId");

-- AddForeignKey
ALTER TABLE "EngagementApplication" ADD CONSTRAINT "EngagementApplication_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
