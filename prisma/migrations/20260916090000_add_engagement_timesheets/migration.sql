-- Timesheet entry, audit trail, and engagement-manager registry.

-- CreateEnum
CREATE TYPE "TimesheetEntryStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "TimesheetAuditAction" AS ENUM ('CREATED', 'UPDATED', 'SUBMITTED', 'UNSUBMITTED', 'APPROVED', 'REOPENED', 'ADMIN_OVERRIDE', 'PAYMENT_LINKED', 'MANAGER_ASSIGNED', 'MANAGER_REMOVED');

-- CreateTable
CREATE TABLE "EngagementTimesheetEntry" (
    "id" TEXT NOT NULL,
    "engagementAssignmentId" TEXT NOT NULL,
    "workDate" DATE NOT NULL,
    "hoursWorked" DECIMAL(5,2) NOT NULL,
    "remarks" TEXT,
    "status" "TimesheetEntryStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "submittedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "approvedByHandle" TEXT,
    "approvalComment" TEXT,
    "reopenedAt" TIMESTAMP(3),
    "paidPaymentReference" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EngagementTimesheetEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
-- One audit trail for the whole timesheet domain. Entry-scoped rows carry timesheetEntryId; manager
-- assignment and removal are engagement-scoped and carry engagementId instead. Exactly one of the two
-- is set on every row, enforced by the check constraint at the end of this migration.
CREATE TABLE "EngagementTimesheetAudit" (
    "id" TEXT NOT NULL,
    "timesheetEntryId" TEXT,
    "engagementId" TEXT,
    "action" "TimesheetAuditAction" NOT NULL,
    "previousValues" JSONB,
    "updatedValues" JSONB,
    "actorUserId" TEXT NOT NULL,
    "actorHandle" TEXT,
    "actorRole" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngagementTimesheetAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngagementManager" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "managerUserId" TEXT NOT NULL,
    "managerHandle" TEXT NOT NULL,
    "managerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "removedBy" TEXT,

    CONSTRAINT "EngagementManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- One entry per assignment per calendar day, enforced by the database rather than by application code.
CREATE UNIQUE INDEX "EngagementTimesheetEntry_engagementAssignmentId_workDate_key" ON "EngagementTimesheetEntry"("engagementAssignmentId", "workDate");

-- CreateIndex
CREATE INDEX "EngagementTimesheetEntry_engagementAssignmentId_status_idx" ON "EngagementTimesheetEntry"("engagementAssignmentId", "status");

-- CreateIndex
CREATE INDEX "EngagementTimesheetEntry_engagementAssignmentId_workDate_idx" ON "EngagementTimesheetEntry"("engagementAssignmentId", "workDate");

-- CreateIndex
CREATE INDEX "EngagementTimesheetEntry_status_workDate_idx" ON "EngagementTimesheetEntry"("status", "workDate");

-- CreateIndex
CREATE INDEX "EngagementTimesheetAudit_timesheetEntryId_createdAt_idx" ON "EngagementTimesheetAudit"("timesheetEntryId", "createdAt");

-- CreateIndex
CREATE INDEX "EngagementTimesheetAudit_engagementId_createdAt_idx" ON "EngagementTimesheetAudit"("engagementId", "createdAt");

-- CreateIndex
CREATE INDEX "EngagementTimesheetAudit_actorUserId_idx" ON "EngagementTimesheetAudit"("actorUserId");

-- CreateIndex
-- Duplicate manager assignment prevention. A soft-removed row keeps the slot, so re-adding a
-- previously removed manager clears removedAt instead of inserting a second row.
CREATE UNIQUE INDEX "EngagementManager_engagementId_managerUserId_key" ON "EngagementManager"("engagementId", "managerUserId");

-- CreateIndex
-- Backs "which engagements may I approve?".
CREATE INDEX "EngagementManager_managerUserId_removedAt_idx" ON "EngagementManager"("managerUserId", "removedAt");

-- AddForeignKey
ALTER TABLE "EngagementTimesheetEntry" ADD CONSTRAINT "EngagementTimesheetEntry_engagementAssignmentId_fkey" FOREIGN KEY ("engagementAssignmentId") REFERENCES "EngagementAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngagementTimesheetAudit" ADD CONSTRAINT "EngagementTimesheetAudit_timesheetEntryId_fkey" FOREIGN KEY ("timesheetEntryId") REFERENCES "EngagementTimesheetEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngagementTimesheetAudit" ADD CONSTRAINT "EngagementTimesheetAudit_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngagementManager" ADD CONSTRAINT "EngagementManager_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- An audit row is either entry-scoped or engagement-scoped, never both and never neither. Prisma
-- cannot express this, so it lives as a check constraint: an audit row that points at nothing is not
-- an audit record.
ALTER TABLE "EngagementTimesheetAudit"
ADD CONSTRAINT "EngagementTimesheetAudit_one_target" CHECK (
    ("timesheetEntryId" IS NOT NULL AND "engagementId" IS NULL)
    OR ("timesheetEntryId" IS NULL AND "engagementId" IS NOT NULL)
);
