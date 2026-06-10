-- Sample certificate records for testing (MySQL / MariaDB).
-- Load after schema.sql:  mysql -u USER -p DBNAME < db/seed.sql

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
