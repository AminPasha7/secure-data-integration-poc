ALTER TABLE file_ingest
  ALTER COLUMN sha256 TYPE varchar(64) USING sha256::text;
