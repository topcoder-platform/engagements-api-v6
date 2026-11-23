-- Managers can return submitted timesheet entries to the member for corrections.
-- AlterEnum
ALTER TYPE "TimesheetAuditAction" ADD VALUE 'RETURNED';

-- AlterTable
ALTER TABLE "EngagementTimesheetEntry"
ADD COLUMN "returnedAt" TIMESTAMP(3),
ADD COLUMN "returnedBy" TEXT,
ADD COLUMN "returnedByHandle" TEXT,
ADD COLUMN "returnComment" TEXT;
