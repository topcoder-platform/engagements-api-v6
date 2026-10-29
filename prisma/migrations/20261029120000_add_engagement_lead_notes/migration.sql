-- AlterTable
ALTER TABLE "EngagementLead" ADD COLUMN "notes" TEXT,
ADD COLUMN "notesUpdatedAt" TIMESTAMP(3),
ADD COLUMN "notesUpdatedBy" TEXT;
