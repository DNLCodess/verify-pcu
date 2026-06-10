"use client";

import { useActionState, useState } from "react";
import { verifyLegacyAction, verifyCertificateAction } from "../actions";
import { initialState, type VerifyState } from "../lib/verify";
import {
  CERTIFICATE_NUMBER_FROM_YEAR,
  EARLIEST_GRADUATION_YEAR,
  DEPARTMENTS,
} from "../lib/config";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - EARLIEST_GRADUATION_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i,
);

export default function Verifier() {
  const [year, setYear] = useState<number | null>(null);

  // Year decides the path: certificate-number for the newer cohorts, the
  // name + matric route for everyone who graduated before the cutover.
  const usesCertificateNumber =
    year !== null && year >= CERTIFICATE_NUMBER_FROM_YEAR;

  return (
    <div className="mx-auto max-w-xl">
      {/* Stepper - sits on the purple hero band, so it's styled light */}
      <ol className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider mb-8">
        <Step
          n={1}
          label="Graduation year"
          active={year === null}
          done={year !== null}
        />
        <span className="h-px w-8 bg-white/30" />
        <Step n={2} label="Your details" active={year !== null} done={false} />
      </ol>

      {year === null ? (
        <YearPicker onPick={setYear} />
      ) : (
        <div>
          <button
            onClick={() => setYear(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline mb-5"
          >
            <i className="fa-solid fa-arrow-left text-xs" aria-hidden />
            Change graduation year
          </button>

          <div className="mb-6 rounded-lg bg-primary/5 border border-primary/15 px-4 py-3 text-sm text-foreground flex items-center gap-3">
            <i
              className="fa-solid fa-graduation-cap text-primary"
              aria-hidden
            />
            <span>
              Class of <strong>{year}</strong>.{" "}
              {usesCertificateNumber
                ? "Verify with your certificate number."
                : "Verify with your name, department and matric number."}
            </span>
          </div>

          {usesCertificateNumber ? <CertificateForm /> : <LegacyForm />}
        </div>
      )}
    </div>
  );
}

function Step({
  n,
  label,
  active,
  done,
}: {
  n: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`grid place-items-center h-6 w-6 rounded-full text-[11px] ${
          done
            ? "bg-gold text-primary"
            : active
              ? "bg-white text-primary"
              : "bg-white/15 text-white/80"
        }`}
      >
        {done ? <i className="fa-solid fa-check" aria-hidden /> : n}
      </span>
      <span className={active || done ? "text-white" : "text-white/50"}>
        {label}
      </span>
    </li>
  );
}

function YearPicker({ onPick }: { onPick: (year: number) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-2xl bg-surface border border-border shadow-sm p-6 sm:p-8">
      <h2 className="font-serif text-xl font-bold text-primary">
        When did you graduate?
      </h2>
      <p className="mt-2 text-sm text-muted">
        Pick your graduation year and we&apos;ll show the right form for your
        cohort.
      </p>

      <label htmlFor="year" className="block text-sm font-medium mt-6 mb-1.5">
        Graduation year
      </label>
      <select
        id="year"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md border border-border bg-white px-3.5 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
      >
        <option value="" disabled>
          Select a year…
        </option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button
        onClick={() => value && onPick(Number(value))}
        disabled={!value}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white disabled:bg-border disabled:text-muted disabled:cursor-not-allowed font-semibold px-6 py-3.5 rounded-md transition-colors"
      >
        Continue
        <i className="fa-solid fa-arrow-right text-sm" aria-hidden />
      </button>
    </div>
  );
}

function LegacyForm() {
  const [state, action, pending] = useActionState<VerifyState, FormData>(
    verifyLegacyAction,
    initialState,
  );

  if (state.status === "verified" || state.status === "not_found") {
    return <ResultCard state={state} />;
  }

  return (
    <form
      action={action}
      className="rounded-2xl bg-surface border border-border shadow-sm p-6 sm:p-8 space-y-5"
    >
      <Field
        id="fullName"
        name="fullName"
        label="Full name"
        placeholder="As written on your certificate"
        icon="fa-user"
      />
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium mb-1.5"
        >
          Department
        </label>
        <div className="relative">
          <i
            className="fa-solid fa-building-columns absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm"
            aria-hidden
          />
          <select
            id="department"
            name="department"
            required
            defaultValue=""
            className="w-full rounded-md border border-border bg-white pl-10 pr-3.5 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="" disabled>
              Select your department…
            </option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Field
        id="matricNumber"
        name="matricNumber"
        label="Matric number"
        placeholder="e.g. 2019/123"
        icon="fa-id-card"
      />

      <ErrorNote state={state} />
      <SubmitButton pending={pending} />
    </form>
  );
}

function CertificateForm() {
  const [state, action, pending] = useActionState<VerifyState, FormData>(
    verifyCertificateAction,
    initialState,
  );

  if (state.status === "verified" || state.status === "not_found") {
    return <ResultCard state={state} />;
  }

  return (
    <form
      action={action}
      className="rounded-2xl bg-surface border border-border shadow-sm p-6 sm:p-8 space-y-5"
    >
      <Field
        id="certificateNumber"
        name="certificateNumber"
        label="Certificate number"
        placeholder="e.g. PCU-2026-004821"
        icon="fa-hashtag"
      />

      <ErrorNote state={state} />
      <SubmitButton pending={pending} />
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  icon,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  icon: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <div className="relative">
        <i
          className={`fa-solid ${icon} absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm`}
          aria-hidden
        />
        <input
          id={id}
          name={name}
          required
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-md border border-border bg-white pl-10 pr-3.5 py-3 text-foreground placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>
    </div>
  );
}

function ErrorNote({ state }: { state: VerifyState }) {
  if (state.status !== "error") return null;
  return (
    <p className="flex items-start gap-2 text-sm text-danger bg-danger/5 border border-danger/20 rounded-md px-3.5 py-2.5">
      <i className="fa-solid fa-circle-exclamation mt-0.5" aria-hidden />
      <span>{state.message}</span>
    </p>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-md transition-colors"
    >
      {pending ? (
        <>
          <i className="fa-solid fa-spinner fa-spin" aria-hidden />
          Verifying…
        </>
      ) : (
        <>
          <i className="fa-solid fa-shield-halved text-sm" aria-hidden />
          Verify certificate
        </>
      )}
    </button>
  );
}

function ResultCard({
  state,
}: {
  state: Extract<VerifyState, { status: "verified" | "not_found" }>;
}) {
  const verified = state.status === "verified";

  return (
    <div
      className={`rounded-2xl border-2 shadow-sm overflow-hidden ${
        verified ? "border-success/30" : "border-danger/30"
      }`}
    >
      {/* Big status banner */}
      <div
        className={`flex flex-col items-center text-center px-6 py-10 ${
          verified ? "bg-success/8" : "bg-danger/8"
        }`}
      >
        <span
          className={`grid place-items-center h-24 w-24 rounded-full text-white text-5xl shadow-lg ${
            verified ? "bg-success" : "bg-danger"
          }`}
        >
          <i
            className={`fa-solid ${verified ? "fa-check" : "fa-xmark"}`}
            aria-hidden
          />
        </span>
        <h2
          className={`mt-6 font-serif text-2xl sm:text-3xl font-bold ${
            verified ? "text-success!" : "text-danger!"
          }`}
        >
          {verified ? "Certificate Verified" : "Not Verified"}
        </h2>
        <p className="mt-2 text-sm text-muted max-w-sm">
          {verified
            ? "This certificate is genuine and matches the University registry."
            : state.status === "not_found"
              ? state.message
              : ""}
        </p>
      </div>

      {/* Details for a verified record */}
      {verified && (
        <dl className="divide-y divide-border bg-surface">
          <Detail label="Name" value={state.record.fullName} />
          {state.record.programme && (
            <Detail label="Programme" value={state.record.programme} />
          )}
          <Detail label="Department" value={state.record.department} />
          {state.record.classification && (
            <Detail
              label="Classification"
              value={state.record.classification}
            />
          )}
          <Detail
            label="Graduation year"
            value={String(state.record.graduationYear)}
          />
          {state.record.matricNumber && (
            <Detail label="Matric number" value={state.record.matricNumber} />
          )}
          {state.record.certificateNumber && (
            <Detail
              label="Certificate number"
              value={state.record.certificateNumber}
            />
          )}
        </dl>
      )}

      <div className="bg-surface border-t border-border px-6 py-5">
        <button
          onClick={() => window.location.reload()}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-md transition-colors"
        >
          <i className="fa-solid fa-rotate-left text-sm" aria-hidden />
          Verify another certificate
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-3.5">
      <dt className="text-sm text-muted shrink-0">{label}</dt>
      <dd className="text-sm font-semibold text-foreground text-right">
        {value}
      </dd>
    </div>
  );
}
