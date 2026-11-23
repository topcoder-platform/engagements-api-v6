-- Talent Managers can mark a lead in any status as partially fulfilled or on hold.
-- AlterEnum
ALTER TYPE "EngagementLeadStatus" ADD VALUE 'PARTIALLY_FULFILLED';
ALTER TYPE "EngagementLeadStatus" ADD VALUE 'ON_HOLD';
