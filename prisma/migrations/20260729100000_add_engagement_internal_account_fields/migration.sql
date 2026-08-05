-- CreateEnum
CREATE TYPE "RoleLevel" AS ENUM ('JUNIOR', 'MID', 'SENIOR');

-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "account" TEXT,
ADD COLUMN     "receivedDateFromAccount" TIMESTAMP(3),
ADD COLUMN     "roleLevel" "RoleLevel",
ADD COLUMN     "smu" TEXT,
ADD COLUMN     "spoc" TEXT;
