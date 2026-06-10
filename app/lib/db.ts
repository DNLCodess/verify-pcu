import { Pool } from "pg";

/**
 * A single shared connection pool. In dev, Next.js hot-reloads modules, so we
 * stash the pool on `globalThis` to avoid opening a new pool on every reload.
 */
const globalForDb = globalThis as unknown as { pcuPool?: Pool };

export const pool =
  globalForDb.pcuPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Most managed Postgres providers require SSL. Toggle with PGSSL=disable.
    ssl:
      process.env.PGSSL === "disable"
        ? false
        : process.env.DATABASE_URL?.includes("localhost") ||
            process.env.DATABASE_URL?.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForDb.pcuPool = pool;

/** A verified certificate, shaped for the UI. */
export type CertificateRecord = {
  fullName: string;
  department: string;
  matricNumber: string | null;
  certificateNumber: string | null;
  programme: string | null;
  classification: string | null;
  graduationYear: number;
};

type Row = {
  full_name: string;
  department: string;
  matric_number: string | null;
  certificate_number: string | null;
  programme: string | null;
  classification: string | null;
  graduation_year: number;
};

function toRecord(r: Row): CertificateRecord {
  return {
    fullName: r.full_name,
    department: r.department,
    matricNumber: r.matric_number,
    certificateNumber: r.certificate_number,
    programme: r.programme,
    classification: r.classification,
    graduationYear: r.graduation_year,
  };
}

/**
 * Legacy graduates (2017–2025): matched on full name + department + matric
 * number. All comparisons are case-insensitive and whitespace-trimmed so users
 * don't fail on capitalisation or stray spaces.
 */
export async function verifyByMatric(input: {
  fullName: string;
  department: string;
  matricNumber: string;
}): Promise<CertificateRecord | null> {
  const { rows } = await pool.query<Row>(
    `SELECT full_name, department, matric_number, certificate_number,
            programme, classification, graduation_year
       FROM certificates
      WHERE lower(btrim(full_name)) = lower(btrim($1))
        AND lower(btrim(department)) = lower(btrim($2))
        AND lower(btrim(matric_number)) = lower(btrim($3))
      LIMIT 1`,
    [input.fullName, input.department, input.matricNumber],
  );
  return rows[0] ? toRecord(rows[0]) : null;
}

/**
 * Modern graduates (2026+): matched on their unique certificate number.
 */
export async function verifyByCertificateNumber(
  certificateNumber: string,
): Promise<CertificateRecord | null> {
  const { rows } = await pool.query<Row>(
    `SELECT full_name, department, matric_number, certificate_number,
            programme, classification, graduation_year
       FROM certificates
      WHERE lower(btrim(certificate_number)) = lower(btrim($1))
      LIMIT 1`,
    [certificateNumber],
  );
  return rows[0] ? toRecord(rows[0]) : null;
}
