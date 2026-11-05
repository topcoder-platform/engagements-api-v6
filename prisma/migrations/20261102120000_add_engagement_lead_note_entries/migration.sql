-- Lead notes become separate, read-only entries instead of one editable text field.

-- CreateTable
CREATE TABLE "EngagementLeadNote" (
    "id" TEXT NOT NULL,
    "engagementLeadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "EngagementLeadNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngagementLeadNote_engagementLeadId_createdAt_idx" ON "EngagementLeadNote"("engagementLeadId", "createdAt");

-- AddForeignKey
ALTER TABLE "EngagementLeadNote" ADD CONSTRAINT "EngagementLeadNote_engagementLeadId_fkey" FOREIGN KEY ("engagementLeadId") REFERENCES "EngagementLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Carry each lead's existing notes over as its first entry, keeping who last saved them and when.
INSERT INTO "EngagementLeadNote" ("id", "engagementLeadId", "content", "createdAt", "createdBy")
SELECT md5("id" || ':migrated-note'), "id", "notes", COALESCE("notesUpdatedAt", "updatedAt"), "notesUpdatedBy"
FROM "EngagementLead"
WHERE "notes" IS NOT NULL AND btrim("notes") <> '';

-- AlterTable
ALTER TABLE "EngagementLead" DROP COLUMN "notes",
DROP COLUMN "notesUpdatedAt",
DROP COLUMN "notesUpdatedBy";
