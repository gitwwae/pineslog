import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale, Dictionary } from "@/lib/i18n/messages";

export function Nav({ isAdmin = false, locale, t }: { isAdmin?: boolean; locale: Locale; t: Dictionary }) {
  return (
    <header className="relative z-10 border-b border-forest/10 bg-cream/70 backdrop-blur supports-[backdrop-filter]:bg-cream/60">
      <div className="container-prose flex items-center justify-between py-5 gap-3">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Logo />
          <span className="h-serif text-xl tracking-tight">pineslog</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/journey">{t.nav.journey}</NavLink>
          <NavLink href="/stack">{t.nav.stack}</NavLink>
          <NavLink href="/log">{t.nav.log}</NavLink>
          <NavLink href="/about">{t.nav.about}</NavLink>
          {isAdmin && <NavLink href="/admin" highlight>{t.nav.admin}</NavLink>}
          <span className="ml-1 sm:ml-3"><LocaleSwitcher current={locale} /></span>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children, highlight = false }: { href: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className={
        "px-3 py-1.5 text-sm rounded-full transition " +
        (highlight
          ? "text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-200"
          : "text-ink-dim hover:text-forest hover:bg-cream-100")
      }
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A5C39" />
          <stop offset="100%" stopColor="#004225" />
        </linearGradient>
      </defs>
      <path d="M16 3 L23 13 L20 13 L25 21 L21 21 L26 28 L6 28 L11 21 L7 21 L12 13 L9 13 Z" fill="url(#lg)" />
      <rect x="14.6" y="27" width="2.8" height="3" fill="#5a4326" />
    </svg>
  );
}
