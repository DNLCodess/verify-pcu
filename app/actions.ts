"use server";

import { verifyByMatric, verifyByCertificateNumber } from "./lib/db";
import type { VerifyState } from "./lib/verify";

/** Verify a 2017–2025 graduate by name + department + matric number. */
export async function verifyLegacyAction(
  _prev: VerifyState,
  formData: FormData,
): Promise<VerifyState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const matricNumber = String(formData.get("matricNumber") ?? "").trim();

  if (!fullName || !department || !matricNumber) {
    return {
      status: "error",
      message: "Please fill in your full name, department and matric number.",
    };
  }

  try {
    const record = await verifyByMatric({ fullName, department, matricNumber });
    if (record) return { status: "verified", record };
    return {
      status: "not_found",
      message:
        "No matching certificate was found. Check that your name, department and matric number are exactly as on your records.",
    };
  } catch (err) {
    console.error("verifyLegacyAction failed:", err);
    return {
      status: "error",
      message:
        "We couldn't reach the verification service. Please try again shortly.",
    };
  }
}

/** Verify a 2026+ graduate by certificate number. */
export async function verifyCertificateAction(
  _prev: VerifyState,
  formData: FormData,
): Promise<VerifyState> {
  const certificateNumber = String(
    formData.get("certificateNumber") ?? "",
  ).trim();

  if (!certificateNumber) {
    return {
      status: "error",
      message: "Please enter your certificate number.",
    };
  }

  try {
    const record = await verifyByCertificateNumber(certificateNumber);
    if (record) return { status: "verified", record };
    return {
      status: "not_found",
      message:
        "No certificate matches that number. Double-check the number printed on your certificate.",
    };
  } catch (err) {
    console.error("verifyCertificateAction failed:", err);
    return {
      status: "error",
      message:
        "We couldn't reach the verification service. Please try again shortly.",
    };
  }
}
