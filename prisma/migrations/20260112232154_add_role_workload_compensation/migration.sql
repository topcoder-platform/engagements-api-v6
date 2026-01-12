-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DESIGNER', 'SOFTWARE_DEVELOPER', 'DATA_SCIENTIST', 'DATA_ENGINEER');

-- CreateEnum
CREATE TYPE "Workload" AS ENUM ('FULL_TIME', 'FRACTIONAL');

-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "compensationRange" TEXT,
ADD COLUMN     "role" "Role",
ADD COLUMN     "workload" "Workload";

-- CreateIndex
CREATE INDEX "Engagement_role_idx" ON "Engagement"("role");

-- CreateIndex
CREATE INDEX "Engagement_workload_idx" ON "Engagement"("workload");
