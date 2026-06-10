-- PCU Certificate Verification — database schema
-- Run once against your Postgres database:  psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS certificates (
  id                  SERIAL PRIMARY KEY,
  full_name           TEXT        NOT NULL,
  department          TEXT        NOT NULL,
  -- Legacy graduates (2017–2025) are verified by matric number.
  matric_number       TEXT,
  -- Graduates from 2026 onward carry a unique certificate number.
  certificate_number  TEXT        UNIQUE,
  programme           TEXT,
  classification      TEXT,        -- e.g. "First Class", "Second Class Upper"
  graduation_year     INTEGER     NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Case-insensitive lookups used by the app (see app/lib/db.ts).
CREATE INDEX IF NOT EXISTS certificates_matric_idx
  ON certificates (lower(btrim(matric_number)));

CREATE INDEX IF NOT EXISTS certificates_certno_idx
  ON certificates (lower(btrim(certificate_number)));

CREATE INDEX IF NOT EXISTS certificates_lookup_idx
  ON certificates (lower(btrim(full_name)), lower(btrim(department)));
