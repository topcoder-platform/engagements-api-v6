-- CreateTable
CREATE TABLE "EngagementFeedback" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "feedbackText" TEXT NOT NULL,
    "rating" INTEGER,
    "givenByMemberId" TEXT,
    "givenByHandle" TEXT,
    "givenByEmail" TEXT,
    "secretToken" TEXT,
    "secretTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngagementFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EngagementFeedback_secretToken_key" ON "EngagementFeedback"("secretToken");

-- CreateIndex
CREATE INDEX "EngagementFeedback_engagementId_idx" ON "EngagementFeedback"("engagementId");

-- CreateIndex
CREATE INDEX "EngagementFeedback_givenByMemberId_idx" ON "EngagementFeedback"("givenByMemberId");

-- AddForeignKey
ALTER TABLE "EngagementFeedback" ADD CONSTRAINT "EngagementFeedback_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
