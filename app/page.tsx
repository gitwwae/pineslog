import Link from "next/link";
import { getSettings, getLatestSnapshot, daysSince, formatUSD } from "@/lib/data";
import { getT } from "@/lib/i18n";

export default async function HomePage() {
  const [settings, snap, { t }] = await Promise.all([getSettings(), getLatestSnapshot(), getT()]);

  const day = daysSince(settings.start_date);
  const cumul = snap?.revenue_cumulative ?? 0;
  const mrr = snap?.mrr ?? 0;
  const pct = (cumul / settings.goal_amount) * 100;

  return (
    <>
      {/* HERO */}
      <section className="container-prose pt-16 sm:pt-24 pb-12 sm:pb-20">
        <div className="section-eyebrow mb-4">{t.home.eyebrow}</div>
        <h1 className="h-serif text-5xl sm:text-7xl font-medium tracking-tightest leading-[0.95] max-w-4xl">
          {t.home.title1}<span className="text-amber-700">{t.home.titleAccent}</span>{t.home.title2}<span className="italic">{t.home.titleEm}</span>{t.home.title3}
        </h1>
        <p className="muted mt-6 max-w-2xl text-lg">{t.home.sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/journey" className="btn btn-primary">{t.home.cta1}</Link>
          <Link href="/stack" className="btn btn-ghost">{t.home.cta2}</Link>
        </div>
      </section>

      {/* LIVE NUMBERS */}
      <section className="container-prose pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Stat label={t.home.day} value={`${day}`} sub={t.home.ofN(settings.horizon_months * 30)} />
          <Stat label={t.home.cumulative} value={formatUSD(cumul)} sub={t.home.pctOf(pct.toFixed(2))} />
          <Stat label={t.home.mrr} value={formatUSD(mrr)} sub={t.home.growing} />
          <Stat label={t.home.burn} value={formatUSD(snap?.burn_monthly ?? 0)} sub={t.home.activeTools(snap?.services_count ?? 0)} />
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-prose pb-20">
        <div className="section-eyebrow mb-3">{t.home.strategyEyebrow}</div>
        <h2 className="h-serif text-3xl sm:text-4xl mb-10 max-w-2xl">{t.home.strategyTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Pillar title={t.home.pillars.services.title} body={t.home.pillars.services.body} />
          <Pillar title={t.home.pillars.audience.title} body={t.home.pillars.audience.body} />
          <Pillar title={t.home.pillars.product.title} body={t.home.pillars.product.body} />
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
