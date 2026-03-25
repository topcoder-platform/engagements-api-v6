ALTER TABLE "EngagementAssignment"
ALTER COLUMN "standardHoursPerWeek" TYPE DOUBLE PRECISION
USING "standardHoursPerWeek"::DOUBLE PRECISION;
