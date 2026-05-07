import Link from "next/link";
import { getSettings, getLatestSnapshot, daysSince, formatUSD } from "@/lib/data";

export default async function HomePage() {
  const settings = await getSettings();
  const snap = await getLatestSnapshot();

  const day = daysSince(settings.start_date);
  const cumul = snap?.revenue_cumulative ?? 0;
  const mrr = snap?.mrr ?? 0;
  const pct = (cumul / settings.goal_amount) * 100;

  return (
    <>
      {/* HERO */}
      <section className="container-prose pt-16 sm:pt-24 pb-12 sm:pb-20">
        <div className="section-eyebrow mb-4">A captain&rsquo;s log · est. 2026</div>
        <h1 className="h-serif text-5xl sm:text-7xl font-medium tracking-tightest leading-[0.95] max-w-4xl">
          Field notes on the road to <span className="text-amber-700">$1M</span>.<br />
          Building <span className="italic">AI</span> in the open.
        </h1>
        <p className="muted mt-6 max-w-2xl text-lg">
          A public log of every step from $0 to a million dollars.
          Tools, numbers, mistakes, lessons — written down, in the open,
          by a solo founder with a tech background and a tight budget.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/journey" className="btn btn-primary">See the journey →</Link>
          <Link href="/stack" className="btn btn-ghost">My stack</Link>
        </div>
      </section>

      {/* LIVE NUMBERS */}
      <section className="container-prose pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Stat label="Day" value={`${day}`} sub={`of ${settings.horizon_months * 30}`} />
          <Stat label="Cumulative" value={formatUSD(cumul)} sub={`${pct.toFixed(2)}% of $1M`} />
          <Stat label="MRR" value={formatUSD(mrr)} sub="growing" />
          <Stat label="Burn" value={formatUSD(snap?.burn_monthly ?? 0)} sub={`${snap?.services_count ?? 0} active tools`} />
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-prose pb-20">
        <div className="section-eyebrow mb-3">The strategy</div>
        <h2 className="h-serif text-3xl sm:text-4xl mb-10 max-w-2xl">Cash → Audience → Product. In that order.</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Pillar title="Services first" body="AI consulting and automation for SMBs funds everything. Cash flow on day one, market insight built in." />
          <Pillar title="Audience always" body="Build in public. Every project, number, mistake — public. Compounding asset, zero ad budget." />
          <Pillar title="Product later" body="Productize the most recurring problem from services into a micro-SaaS. Then scale, diversify, repeat." />
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card card-hover p-5">
      <div className="text-[11px] uppercase tracking-widest dim mb-2">{label}</div>
      <div className="num text-2xl sm:text-3xl text-forest font-semibold">{value}</div>
      {sub && <div className="text-xs muted mt-1.5">{sub}</div>}
    </div>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="card card-hover p-6">
      <div className="h-serif text-xl mb-2">{title}</div>
      <p className="muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
