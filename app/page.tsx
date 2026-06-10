import Verifier from "./components/Verifier";

export default function Home() {
  return (
    <>
      {/* ---------- COMPACT TITLE BAND ---------- */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 0%, #eab308 0, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="text-white! font-serif text-3xl sm:text-4xl font-extrabold">
            Verify a <span className="text-gold">certificate</span>
          </h1>
          <p className="mt-3 text-white/80">
            Confirm that a Precious Cornerstone University certificate is genuine.
          </p>
        </div>
      </section>

      {/* ---------- VERIFIER ---------- */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10 pb-16">
        <Verifier />
        <p className="mx-auto max-w-xl mt-8 text-center text-sm text-muted">
          Can&apos;t find your certificate? Contact the Registry at{" "}
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
