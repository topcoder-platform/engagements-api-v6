-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('SELECTED', 'OFFER_REJECTED', 'ASSIGNED', 'COMPLETED', 'TERMINATED');

-- AlterTable
ALTER TABLE "EngagementAssignment" ADD COLUMN     "agreementRate" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "AssignmentStatus" NOT NULL DEFAULT 'SELECTED',
ADD COLUMN     "terminationReason" TEXT,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT false;
