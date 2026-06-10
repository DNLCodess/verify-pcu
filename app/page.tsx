import Verifier from "./components/Verifier";

const assurances = [
  {
    icon: "fa-database",
    title: "Direct from the registry",
    text: "Every result is checked live against the University's official certificate records.",
  },
  {
    icon: "fa-bolt",
    title: "Instant result",
    text: "A clear verified or not-verified answer in seconds — no waiting, no paperwork.",
  },
  {
    icon: "fa-lock",
    title: "Private & secure",
    text: "We only confirm authenticity. No certificate data is shared or stored from your search.",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 0%, #eab308 0, transparent 38%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-20 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-5">
            <span className="h-px w-8 bg-gold" />
            Precious Cornerstone University
            <span className="h-px w-8 bg-gold" />
          </span>
          <h1 className="text-white! font-serif text-4xl sm:text-5xl font-extrabold leading-[1.05]">
            Verify a <span className="text-gold">certificate</span>
          </h1>
          <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Confirm that a Precious Cornerstone University certificate is genuine.
            Pick your graduation year to begin — it takes less than a minute.
          </p>
        </div>
      </section>

      {/* ---------- VERIFIER ---------- */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10 pb-20">
        <Verifier />
      </section>

      {/* ---------- ASSURANCES ---------- */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {assurances.map((a) => (
              <div
                key={a.title}
                className="flex flex-col items-start bg-surface rounded-xl border border-border p-6"
              >
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-primary/8 text-primary text-xl mb-4">
                  <i className={`fa-solid ${a.icon}`} aria-hidden />
                </span>
                <h3 className="font-serif text-lg font-bold text-primary leading-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HELP ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Can&apos;t find your certificate?
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          Make sure your details exactly match your records. If you graduated in
          2026 or later, use the certificate number printed on the document.
          Still stuck? Contact the University Registry at{" "}
          <a
            href="mailto:registry@pcu.edu.ng"
            className="font-semibold text-accent hover:underline"
          >
            registry@pcu.edu.ng
          </a>
          .
        </p>
      </section>
    </>
  );
}
