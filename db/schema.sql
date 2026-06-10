-- PCU Certificate Verification - database schema (MySQL / MariaDB)
-- Load via cPanel phpMyAdmin (Import tab), or the shell:
--   mysql -u USER -p DBNAME < db/schema.sql

CREATE TABLE IF NOT EXISTS certificates (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  full_name           VARCHAR(255) NOT NULL,
  department          VARCHAR(255) NOT NULL,
  -- Legacy graduates (2017-2025) are verified by matric number.
  matric_number       VARCHAR(100) NULL,
  -- Graduates from 2026 onward carry a unique certificate number.
  certificate_number  VARCHAR(100) NULL,
  programme           VARCHAR(255) NULL,
  classification      VARCHAR(100) NULL,   -- e.g. "First Class", "Second Class Upper"
  graduation_year     INT NOT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- A NULL certificate_number is allowed for many rows (legacy cohort);
  -- MySQL permits multiple NULLs in a UNIQUE index.
  UNIQUE KEY uq_certificate_number (certificate_number),
  KEY certificates_matric_idx (matric_number),
  KEY certificates_lookup_idx (full_name, department)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
