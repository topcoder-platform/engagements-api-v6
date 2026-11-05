-- The Wipro Consumption intake form now asks for a free-text maximum hourly cost instead of the bill rate currency and amount.
-- AlterTable
ALTER TABLE "EngagementLead" ADD COLUMN "maximumCost" TEXT;
