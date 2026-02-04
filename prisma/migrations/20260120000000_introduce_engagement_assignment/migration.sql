-- CreateTable
CREATE TABLE "EngagementAssignment" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "memberHandle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngagementAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EngagementAssignment_engagementId_memberId_key" ON "EngagementAssignment"("engagementId", "memberId");

-- CreateIndex
CREATE INDEX "EngagementAssignment_engagementId_idx" ON "EngagementAssignment"("engagementId");

-- CreateIndex
CREATE INDEX "EngagementAssignment_memberId_idx" ON "EngagementAssignment"("memberId");

-- AddForeignKey
ALTER TABLE "EngagementAssignment" ADD CONSTRAINT "EngagementAssignment_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "EngagementFeedback" ADD COLUMN "engagementAssignmentId" TEXT;

-- Migrate assignment arrays into EngagementAssignment
INSERT INTO "EngagementAssignment" ("id", "engagementId", "memberId", "memberHandle", "createdAt", "updatedAt")
SELECT
    substring(source.hash from 1 for 8) || '-' || substring(source.hash from 9 for 4) || '-' || substring(source.hash from 13 for 4) || '-' || substring(source.hash from 17 for 4) || '-' || substring(source.hash from 21 for 12),
    source.engagement_id,
    source.member_id,
    source.member_handle,
    source.engagement_created_at,
    source.engagement_updated_at
FROM (
    SELECT DISTINCT ON (e."id", members.member_id)
        e."id" AS engagement_id,
        e."createdAt" AS engagement_created_at,
        e."updatedAt" AS engagement_updated_at,
        members.member_id,
        COALESCE(handles.member_handle, members.member_id) AS member_handle,
        md5(e."id" || ':' || members.member_id) AS hash
    FROM "Engagement" e
    JOIN LATERAL unnest(e."assignedMembers") WITH ORDINALITY AS members(member_id, idx) ON TRUE
    LEFT JOIN LATERAL unnest(e."assignedMemberHandles") WITH ORDINALITY AS handles(member_handle, idx) ON handles.idx = members.idx
    WHERE members.member_id IS NOT NULL
    ORDER BY e."id", members.member_id, members.idx
) source;

-- Create fallback assignments for engagements that only have feedback
INSERT INTO "EngagementAssignment" ("id", "engagementId", "memberId", "memberHandle", "createdAt", "updatedAt")
SELECT
    substring(source.hash from 1 for 8) || '-' || substring(source.hash from 9 for 4) || '-' || substring(source.hash from 13 for 4) || '-' || substring(source.hash from 17 for 4) || '-' || substring(source.hash from 21 for 12),
    source.engagement_id,
    source.member_id,
    source.member_handle,
    source.created_at,
    source.updated_at
FROM (
    SELECT DISTINCT ON (ef."engagementId", COALESCE(ef."givenByMemberId", ef."id"))
        ef."engagementId" AS engagement_id,
        COALESCE(ef."givenByMemberId", 'legacy-feedback:' || ef."id") AS member_id,
        COALESCE(ef."givenByHandle", 'legacy-feedback') AS member_handle,
        ef."createdAt" AS created_at,
        ef."updatedAt" AS updated_at,
        md5(ef."engagementId" || ':' || COALESCE(ef."givenByMemberId", 'legacy-feedback:' || ef."id")) AS hash
    FROM "EngagementFeedback" ef
    WHERE NOT EXISTS (
        SELECT 1
        FROM "EngagementAssignment" ea
        WHERE ea."engagementId" = ef."engagementId"
    )
    ORDER BY ef."engagementId", COALESCE(ef."givenByMemberId", ef."id"), ef."createdAt" ASC, ef."id" ASC
) source;

-- Create assignments from feedback when the member is missing from assignments
INSERT INTO "EngagementAssignment" ("id", "engagementId", "memberId", "memberHandle", "createdAt", "updatedAt")
SELECT
    substring(source.hash from 1 for 8) || '-' || substring(source.hash from 9 for 4) || '-' || substring(source.hash from 13 for 4) || '-' || substring(source.hash from 17 for 4) || '-' || substring(source.hash from 21 for 12),
    source.engagement_id,
    source.member_id,
    source.member_handle,
    source.created_at,
    source.updated_at
FROM (
    SELECT
        ranked."engagementId" AS engagement_id,
        ranked."givenByMemberId" AS member_id,
        COALESCE(ranked."givenByHandle", 'legacy-feedback') AS member_handle,
        ranked."createdAt" AS created_at,
        ranked."updatedAt" AS updated_at,
        md5(ranked."engagementId" || ':' || ranked."givenByMemberId") AS hash
    FROM (
        SELECT
            ef.*,
            ROW_NUMBER() OVER (PARTITION BY ef."engagementId", ef."givenByMemberId" ORDER BY ef."createdAt" ASC, ef."id" ASC) AS member_feedback_rank
        FROM "EngagementFeedback" ef
    ) ranked
    WHERE ranked."givenByMemberId" IS NOT NULL
      AND ranked.member_feedback_rank = 1
      AND NOT EXISTS (
          SELECT 1
          FROM "EngagementAssignment" ea
          WHERE ea."engagementId" = ranked."engagementId"
            AND ea."memberId" = ranked."givenByMemberId"
      )
) source;

-- Create synthetic assignments for remaining feedback rows
INSERT INTO "EngagementAssignment" ("id", "engagementId", "memberId", "memberHandle", "createdAt", "updatedAt")
SELECT
    substring(source.hash from 1 for 8) || '-' || substring(source.hash from 9 for 4) || '-' || substring(source.hash from 13 for 4) || '-' || substring(source.hash from 17 for 4) || '-' || substring(source.hash from 21 for 12),
    source.engagement_id,
    source.member_id,
    source.member_handle,
    source.created_at,
    source.updated_at
FROM (
    SELECT
        ranked."engagementId" AS engagement_id,
        COALESCE(ranked."givenByMemberId", 'legacy-feedback') || ':' || ranked."id" AS member_id,
        COALESCE(ranked."givenByHandle", 'legacy-feedback') AS member_handle,
        ranked."createdAt" AS created_at,
        ranked."updatedAt" AS updated_at,
        md5(ranked."engagementId" || ':' || COALESCE(ranked."givenByMemberId", 'legacy-feedback') || ':' || ranked."id") AS hash
    FROM (
        SELECT
            ef.*,
            ROW_NUMBER() OVER (PARTITION BY ef."engagementId", ef."givenByMemberId" ORDER BY ef."createdAt" ASC, ef."id" ASC) AS member_feedback_rank
        FROM "EngagementFeedback" ef
    ) ranked
    WHERE (ranked."givenByMemberId" IS NULL OR ranked.member_feedback_rank > 1)
      AND NOT EXISTS (
          SELECT 1
          FROM "EngagementAssignment" ea
          WHERE ea."engagementId" = ranked."engagementId"
            AND ea."memberId" = COALESCE(ranked."givenByMemberId", 'legacy-feedback') || ':' || ranked."id"
      )
) source;

-- Backfill EngagementFeedback engagementAssignmentId
UPDATE "EngagementFeedback" ef
SET "engagementAssignmentId" = ea."id"
FROM (
    SELECT
        ranked."id",
        ranked."engagementId",
        ranked."givenByMemberId"
    FROM (
        SELECT
            ef."id",
            ef."engagementId",
            ef."givenByMemberId",
            ROW_NUMBER() OVER (PARTITION BY ef."engagementId", ef."givenByMemberId" ORDER BY ef."createdAt" ASC, ef."id" ASC) AS member_feedback_rank
        FROM "EngagementFeedback" ef
    ) ranked
    WHERE ranked."givenByMemberId" IS NOT NULL
      AND ranked.member_feedback_rank = 1
) ranked
JOIN "EngagementAssignment" ea
  ON ea."engagementId" = ranked."engagementId"
 AND ea."memberId" = ranked."givenByMemberId"
WHERE ef."id" = ranked."id";

UPDATE "EngagementFeedback" ef
SET "engagementAssignmentId" = ea."id"
FROM "EngagementAssignment" ea
WHERE ef."engagementAssignmentId" IS NULL
  AND ea."engagementId" = ef."engagementId"
  AND ea."memberId" = COALESCE(ef."givenByMemberId", 'legacy-feedback') || ':' || ef."id";

-- CreateIndex
CREATE INDEX "EngagementFeedback_engagementAssignmentId_idx" ON "EngagementFeedback"("engagementAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "EngagementFeedback_engagementAssignmentId_key" ON "EngagementFeedback"("engagementAssignmentId");

-- AddForeignKey
ALTER TABLE "EngagementFeedback" ADD CONSTRAINT "EngagementFeedback_engagementAssignmentId_fkey" FOREIGN KEY ("engagementAssignmentId") REFERENCES "EngagementAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "EngagementFeedback" ALTER COLUMN "engagementAssignmentId" SET NOT NULL;

-- DropForeignKey
ALTER TABLE "EngagementFeedback" DROP CONSTRAINT "EngagementFeedback_engagementId_fkey";

-- DropIndex
DROP INDEX "EngagementFeedback_engagementId_idx";

-- AlterTable
ALTER TABLE "EngagementFeedback" DROP COLUMN "engagementId";

-- DropIndex
DROP INDEX "Engagement_assignedMembers_idx";

-- AlterTable
ALTER TABLE "Engagement" DROP COLUMN "assignedMembers",
DROP COLUMN "assignedMemberHandles";
