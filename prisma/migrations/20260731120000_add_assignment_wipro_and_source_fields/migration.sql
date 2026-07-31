-- CreateEnum
CREATE TYPE "AssignmentSource" AS ENUM (
  'DIRECT',
  'VENDOR',
  'WIPRO_REFERRAL',
  'CUSTOMER_REFERRAL',
  'TOPCODER_COMMUNITY'
);

-- AlterTable
ALTER TABLE "EngagementAssignment"
ADD COLUMN "wiproIdEndDate" TIMESTAMP(3),
ADD COLUMN "candidateWiproId" TEXT,
ADD COLUMN "source" "AssignmentSource";
