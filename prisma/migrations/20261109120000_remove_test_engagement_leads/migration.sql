-- Remove the two test leads submitted to test the Leads app in production
-- (account names "QA Test(please ignore)" and "New Bank").
-- Account names are compared without whitespace and case so spacing variations still match.
-- Their notes are removed with them through the ON DELETE CASCADE foreign key.
DELETE FROM "EngagementLead"
WHERE lower(regexp_replace("accountName", '\s+', '', 'g')) IN ('qatest(pleaseignore)', 'newbank');
