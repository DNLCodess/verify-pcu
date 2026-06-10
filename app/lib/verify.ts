import type { CertificateRecord } from "./db";

/** The result of a verification attempt, shared by the action and the UI. */
export type VerifyState =
  | { status: "idle" }
  | { status: "verified"; record: CertificateRecord }
  | { status: "not_found"; message: string }
  | { status: "error"; message: string };

export const initialState: VerifyState = { status: "idle" };
