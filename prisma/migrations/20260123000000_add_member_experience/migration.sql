-- CreateTable
CREATE TABLE "MemberExperience" (
    "id" TEXT NOT NULL,
    "engagementAssignmentId" TEXT NOT NULL,
    "experienceText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberExperience_engagementAssignmentId_idx" ON "MemberExperience"("engagementAssignmentId");

-- AddForeignKey
ALTER TABLE "MemberExperience" ADD CONSTRAINT "MemberExperience_engagementAssignmentId_fkey" FOREIGN KEY ("engagementAssignmentId") REFERENCES "EngagementAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
