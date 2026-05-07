import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/messages";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-forest/10">
      <div className="container-prose py-10 flex flex-col sm:flex-row gap-4 justify-between items-start text-sm">
        <div>
          <div className="h-serif text-lg">pineslog</div>
          <div className="muted mt-1">{t.footer.tagline}</div>
        </div>
        <div className="flex gap-6 muted">
          <Link href="/journey">{t.nav.journey}</Link>
          <Link href="/stack">{t.nav.stack}</Link>
          <Link href="/log">{t.nav.log}</Link>
          <Link href="/about">{t.nav.about}</Link>
        </div>
      </div>
      <div className="hr-soft" />
      <div className="container-prose py-4 text-xs dim text-center">
        © {new Date().getFullYear()} pineslog · {t.footer.smallprint}
      </div>
    </footer>
  );
}
