-- Drop stale broad uniqueness on engagement/member assignments regardless of
-- the generated index or constraint name present in an environment.
DO $$
DECLARE
  constraint_record RECORD;
  index_record RECORD;
BEGIN
  FOR constraint_record IN
    SELECT
      namespace_info.nspname AS table_schema,
      table_info.relname AS table_name,
      constraint_info.conname AS constraint_name
    FROM pg_constraint constraint_info
    JOIN pg_class table_info ON table_info.oid = constraint_info.conrelid
    JOIN pg_namespace namespace_info ON namespace_info.oid = table_info.relnamespace
    WHERE table_info.relname = 'EngagementAssignment'
      AND constraint_info.contype = 'u'
      AND (
        SELECT array_agg(attribute_info.attname::text ORDER BY attribute_info.attname::text)
        FROM unnest(constraint_info.conkey) AS constraint_columns(attnum)
        JOIN pg_attribute attribute_info
          ON attribute_info.attrelid = table_info.oid
          AND attribute_info.attnum = constraint_columns.attnum
      ) = ARRAY['engagementId', 'memberId']
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I DROP CONSTRAINT %I',
      constraint_record.table_schema,
      constraint_record.table_name,
      constraint_record.constraint_name
    );
  END LOOP;

  FOR index_record IN
    SELECT
      namespace_info.nspname AS index_schema,
      index_info.relname AS index_name
    FROM pg_index indexed_columns_info
    JOIN pg_class index_info ON index_info.oid = indexed_columns_info.indexrelid
    JOIN pg_class table_info ON table_info.oid = indexed_columns_info.indrelid
    JOIN pg_namespace namespace_info ON namespace_info.oid = index_info.relnamespace
    WHERE table_info.relname = 'EngagementAssignment'
      AND indexed_columns_info.indisunique = true
      AND indexed_columns_info.indnkeyatts = 2
      AND (
        SELECT array_agg(attribute_info.attname::text ORDER BY attribute_info.attname::text)
        FROM unnest(indexed_columns_info.indkey) WITH ORDINALITY AS index_columns(attnum, position)
        JOIN pg_attribute attribute_info
          ON attribute_info.attrelid = table_info.oid
          AND attribute_info.attnum = index_columns.attnum
        WHERE index_columns.position <= indexed_columns_info.indnkeyatts
      ) = ARRAY['engagementId', 'memberId']
  LOOP
    EXECUTE format(
      'DROP INDEX IF EXISTS %I.%I',
      index_record.index_schema,
      index_record.index_name
    );
  END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS "EngagementAssignment_engagementId_memberId_idx"
ON "EngagementAssignment"("engagementId", "memberId");

CREATE UNIQUE INDEX "EngagementAssignment_active_engagementId_memberId_key"
ON "EngagementAssignment"("engagementId", "memberId")
WHERE "status" IN ('SELECTED', 'ASSIGNED');
