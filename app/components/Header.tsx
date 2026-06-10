import Link from "next/link";
import { MAIN_SITE_URL } from "../lib/config";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Top accent bar — mirrors the main site */}
      <div className="bg-accent text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between">
          <span className="hidden sm:inline">
            Official Certificate Verification &mdash; University Registry
          </span>
          <a
            href={MAIN_SITE_URL}
            className="inline-flex items-center gap-2 font-medium hover:underline"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" aria-hidden />
            Back to Main University Site
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="grid place-items-center h-10 w-10 rounded-full bg-white text-primary font-serif font-extrabold text-lg">
              P
            </span>
            <span className="leading-tight">
              <span className="block font-serif font-bold text-base sm:text-lg">
                Certificate Verification
              </span>
              <span className="block text-[11px] text-white/70">
                Precious Cornerstone University
              </span>
            </span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <i className="fa-solid fa-shield-halved text-gold" aria-hidden />
            Verified by the Registry
          </span>
        </div>
      </div>
    </header>
  );
}
