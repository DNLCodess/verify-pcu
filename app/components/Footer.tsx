import Link from "next/link";
import { CONTACT, MAIN_SITE_URL, SHORT_COURSES_URL } from "../lib/config";

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/20 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="grid place-items-center h-10 w-10 rounded-full bg-white text-primary font-serif font-extrabold text-lg">
              P
            </span>
            <span className="font-serif font-bold text-lg">
              Certificate Verification
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            The official channel for confirming the authenticity of certificates
            and diplomas awarded by Precious Cornerstone University, Ibadan.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white! text-sm font-bold uppercase tracking-wide mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-white/75 hover:text-gold">
                Verify a Certificate
              </Link>
            </li>
            <li>
              <a href={MAIN_SITE_URL} className="text-white/75 hover:text-gold">
                Main University Site
              </a>
            </li>
            <li>
              <a
                href={SHORT_COURSES_URL}
                className="text-white/75 hover:text-gold"
              >
                Short Courses Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white! text-sm font-bold uppercase tracking-wide mb-4">
            {CONTACT.unit}
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <i className="fa-solid fa-location-dot mt-1 text-gold" aria-hidden />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex gap-3">
              <i className="fa-solid fa-phone mt-1 text-gold" aria-hidden />
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="hover:text-gold"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <i className="fa-solid fa-envelope mt-1 text-gold" aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold break-all">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <i className="fa-brands fa-whatsapp mt-1 text-gold" aria-hidden />
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Precious Cornerstone University. All rights
            reserved.
          </span>
          <span>Ibadan, Oyo State, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
