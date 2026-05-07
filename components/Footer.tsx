import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-forest/10">
      <div className="container-prose py-10 flex flex-col sm:flex-row gap-4 justify-between items-start text-sm">
        <div>
          <div className="h-serif text-lg">pineslog</div>
          <div className="muted mt-1">Field notes on the road to $1M.</div>
        </div>
        <div className="flex gap-6 muted">
          <Link href="/journey">Journey</Link>
          <Link href="/stack">Stack</Link>
          <Link href="/log">Log</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <div className="hr-soft" />
      <div className="container-prose py-4 text-xs dim text-center">
        © {new Date().getFullYear()} pineslog · built in public · hosted on Vercel
      </div>
    </footer>
  );
}
