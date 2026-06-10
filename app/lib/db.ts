import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";

/**
 * A single shared connection pool. In dev, Next.js hot-reloads modules, so we
 * stash the pool on `globalThis` to avoid opening a new pool on every reload.
 */
const globalForDb = globalThis as unknown as { pcuPool?: mysql.Pool };

function createPool(): mysql.Pool {
  // DATABASE_URL looks like: mysql://user:password@host:3306/dbname
  const url = new URL(
    process.env.DATABASE_URL ?? "mysql://root@localhost:3306/pcu_verify",
  );

  return mysql.createPool({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    waitForConnections: true,
    connectionLimit: 5,
    // Some remote/managed MySQL hosts require SSL. Enable with MYSQL_SSL=require.
    ssl:
      process.env.MYSQL_SSL === "require"
        ? { rejectUnauthorized: false }
        : undefined,
  });
}

export const pool = globalForDb.pcuPool ?? createPool();

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

type Row = RowDataPacket & {
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
  const [rows] = await pool.query<Row[]>(
    `SELECT full_name, department, matric_number, certificate_number,
            programme, classification, graduation_year
       FROM certificates
      WHERE LOWER(TRIM(full_name)) = LOWER(TRIM(?))
        AND LOWER(TRIM(department)) = LOWER(TRIM(?))
        AND LOWER(TRIM(matric_number)) = LOWER(TRIM(?))
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
  const [rows] = await pool.query<Row[]>(
    `SELECT full_name, department, matric_number, certificate_number,
            programme, classification, graduation_year
       FROM certificates
      WHERE LOWER(TRIM(certificate_number)) = LOWER(TRIM(?))
      LIMIT 1`,
    [certificateNumber],
  );
  return rows[0] ? toRecord(rows[0]) : null;
}
