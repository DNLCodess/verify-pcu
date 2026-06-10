-- =====================================================================
-- PCU Certificate Verification - MySQL / MariaDB import
-- =====================================================================
-- For the server admin: import this file into the MySQL database you
-- created (cPanel -> phpMyAdmin -> select the database -> Import tab).
--
-- It creates the `certificates` table and loads sample rows. Replace the
-- INSERT block at the bottom with the real certificate records.
--
-- NOTE: this is MySQL syntax (NOT a PostgreSQL pg_dump). Do not import a
-- Postgres dump into MySQL - it will fail on incompatible syntax.
-- Do not include CREATE DATABASE: on cPanel the database is created
-- through "MySQL Databases" (with the account prefix) before importing.
-- =====================================================================

-- ---------- structure ----------
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

-- ---------- sample data (replace with real records) ----------
INSERT IGNORE INTO certificates
  (full_name, department, matric_number, certificate_number, programme, classification, graduation_year)
VALUES
  -- Legacy cohort (2017-2025): verified by name + department + matric number.
  ('Adaeze Okonkwo',     'Computer Science',        '2019/0123', NULL, 'B.Sc. Computer Science',        'First Class',          2019),
  ('Ibrahim Suleiman',   'Economics',               '2021/0457', NULL, 'B.Sc. Economics',               'Second Class Upper',   2021),
  ('Funmilayo Adeyemi',  'Mass Communication',      '2023/0789', NULL, 'B.Sc. Mass Communication',      'Second Class Upper',   2023),
  ('Chidi Eze',          'Business Administration', '2018/0044', NULL, 'B.Sc. Business Administration', 'Second Class Lower',   2018),

  -- Modern cohort (2026+): verified by certificate number.
  ('Blessing Nwachukwu', 'Computer Science',        NULL, 'PCU-2026-004821', 'B.Sc. Computer Science',         'First Class',          2026),
  ('Daniel Aboderin',    'International Relations',  NULL, 'PCU-2026-004822', 'B.Sc. International Relations',   'Second Class Upper',   2026),
  ('Aisha Bello',        'Natural Sciences',         NULL, 'PCU-2027-005140', 'B.Sc. Microbiology',             'First Class',          2027);
