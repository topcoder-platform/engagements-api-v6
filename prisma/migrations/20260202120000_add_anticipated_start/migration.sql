-- CreateEnum
CREATE TYPE "AnticipatedStart" AS ENUM ('IMMEDIATE', 'FEW_DAYS', 'FEW_WEEKS');

-- DropIndex
DROP INDEX "Engagement_applicationDeadline_idx";

-- DropIndex
DROP INDEX "Engagement_status_applicationDeadline_idx";

-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "anticipatedStart" "AnticipatedStart" NOT NULL DEFAULT 'IMMEDIATE';

-- AlterTable
ALTER TABLE "Engagement" DROP COLUMN "applicationDeadline";

-- AlterTable
ALTER TABLE "Engagement" ALTER COLUMN "anticipatedStart" DROP DEFAULT;
