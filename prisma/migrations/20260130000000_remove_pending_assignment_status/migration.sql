-- Update existing rows using PENDING_ASSIGNMENT before removing the enum value.
UPDATE "Engagement"
SET "status" = 'ACTIVE'
WHERE "status" = 'PENDING_ASSIGNMENT'
  AND EXISTS (
    SELECT 1
    FROM "EngagementAssignment" ea
    WHERE ea."engagementId" = "Engagement"."id"
  );

UPDATE "Engagement"
SET "status" = 'OPEN'
WHERE "status" = 'PENDING_ASSIGNMENT';

-- Recreate enum without PENDING_ASSIGNMENT.
ALTER TYPE "EngagementStatus" RENAME TO "EngagementStatus_old";

CREATE TYPE "EngagementStatus" AS ENUM ('OPEN', 'ACTIVE', 'CANCELLED', 'CLOSED');

ALTER TABLE "Engagement" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Engagement" ALTER COLUMN "status" TYPE "EngagementStatus" USING "status"::text::"EngagementStatus";
ALTER TABLE "Engagement" ALTER COLUMN "status" SET DEFAULT 'OPEN';

DROP TYPE "EngagementStatus_old";
