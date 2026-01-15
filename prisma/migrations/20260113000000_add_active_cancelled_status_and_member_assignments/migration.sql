-- AlterEnum
ALTER TYPE "EngagementStatus" ADD VALUE 'ACTIVE' BEFORE 'CLOSED';
ALTER TYPE "EngagementStatus" ADD VALUE 'CANCELLED' BEFORE 'CLOSED';

-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "assignedMembers" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "assignedMemberHandles" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiredMemberCount" INTEGER;

-- Migrate existing singular assignedMemberId to array
UPDATE "Engagement"
SET "assignedMembers" = ARRAY["assignedMemberId"]::text[]
WHERE "assignedMemberId" IS NOT NULL;

-- Migrate existing singular assignedMemberHandle to array
UPDATE "Engagement"
SET "assignedMemberHandles" = ARRAY["assignedMemberHandle"]::text[]
WHERE "assignedMemberHandle" IS NOT NULL;

-- DropIndex
DROP INDEX "Engagement_assignedMemberId_idx";

-- AlterTable
ALTER TABLE "Engagement" DROP COLUMN "assignedMemberId",
DROP COLUMN "assignedMemberHandle";

-- CreateIndex
CREATE INDEX "Engagement_assignedMembers_idx" ON "Engagement"("assignedMembers");

-- Rollback (manual):
-- 1) Add TEXT columns assignedMemberId/assignedMemberHandle, populate from first array element.
-- 2) Drop assignedMembers/assignedMemberHandles/isPrivate/requiredMemberCount.
-- 3) Recreate EngagementStatus without ACTIVE/CANCELLED and migrate values back.
