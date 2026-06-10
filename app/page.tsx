import Verifier from "./components/Verifier";
import { CONTACT } from "./lib/config";

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
        <div className="mx-auto max-w-xl mt-10 text-center">
          <p className="text-sm text-muted">
            For inquiries, please contact the {CONTACT.unit}:
          </p>
          <ul className="mt-4 flex flex-col items-center gap-3 text-sm">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-accent" aria-hidden />
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="font-semibold text-accent hover:underline"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-accent" aria-hidden />
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-semibold text-accent hover:underline break-all"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-brands fa-whatsapp text-accent" aria-hidden />
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
