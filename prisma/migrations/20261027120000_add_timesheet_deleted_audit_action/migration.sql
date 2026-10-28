-- A deleted draft entry takes its own audit records with it (cascade), so the deletion is recorded
-- against the engagement instead.
ALTER TYPE "TimesheetAuditAction" ADD VALUE 'DELETED';
