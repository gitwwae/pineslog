import Link from "next/link";
import { getAllServices, getLatestSnapshot, getSettings, formatUSD, daysSince } from "@/lib/data";
import { monthlyCost, annualCost } from "@/lib/types";

export const metadata = { title: "Admin · Dashboard" };

export default async function AdminDashboard() {
  const [services, snap, settings] = await Promise.all([getAllServices(), getLatestSnapshot(), getSettings()]);

  const active = services.filter(s => s.status === "active" || s.status === "trial");
  const burnMo = active.reduce((acc, s) => acc + monthlyCost(s), 0);
  const burnYr = active.reduce((acc, s) => acc + annualCost(s), 0);
  const day = daysSince(settings.start_date);

  return (
    <div className="space-y-8">
      <header>
        <div className="section-eyebrow mb-2">Admin</div>
        <h1 className="h-serif text-3xl tracking-tightest">Dashboard</h1>
        <p className="muted text-sm mt-1">Day {day} · goal {formatUSD(settings.goal_amount)} · {settings.horizon_months} months horizon</p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Burn / month" value={formatUSD(burnMo, { maximumFractionDigits: 2 })} accent="forest" />
        <Stat label="Burn / year" value={formatUSD(burnYr)} accent="forest" />
        <Stat label="Active tools" value={`${active.length}`} accent="amber" />
        <Stat label="Total tools" value={`${services.length}`} accent="ink" />
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/services" className="card card-hover p-6">
          <div className="h-serif text-xl mb-2">Services →</div>
          <p className="muted text-sm">Aggiungi, modifica, metti in pausa o cancella tool. Lo Stack pubblico si aggiorna automaticamente.</p>
        </Link>
        <Link href="/admin/snapshots" className="card card-hover p-6">
          <div className="h-serif text-xl mb-2">Monthly snapshot →</div>
          <p className="muted text-sm">Registra burn, MRR, audience del mese. Alimenta la home e i grafici.</p>
        </Link>
        <Link href="/admin/log" className="card card-hover p-6">
          <div className="h-serif text-xl mb-2">Log entries →</div>
          <p className="muted text-sm">Scrivi e pubblica le field notes settimanali. Markdown, draft / published.</p>
        </Link>
        <Link href="/admin/phases" className="card card-hover p-6">
          <div className="h-serif text-xl mb-2">Phases & milestones →</div>
          <p className="muted text-sm">Modifica le 6 macro-fasi, target e milestone se la rotta cambia.</p>
        </Link>
      </section>

      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h-serif text-xl">Latest snapshot</h2>
          <span className="text-xs num muted">{snap?.month ?? "·"}</span>
        </div>
        {snap ? (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Row label="Burn" value={formatUSD(snap.burn_monthly, { maximumFractionDigits: 2 })} />
            <Row label="Services" value={`${snap.services_count}`} />
            <Row label="MRR" value={formatUSD(snap.mrr)} />
            <Row label="Cumul. revenue" value={formatUSD(snap.revenue_cumulative)} />
          </dl>
        ) : (
          <div className="muted text-sm">Nessuno snapshot ancora.</div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: "forest" | "amber" | "ink" }) {
  const color = accent === "forest" ? "text-forest" : accent === "amber" ? "text-amber-700" : "text-ink";
  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest dim mb-2">{label}</div>
      <div className={`num text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest dim">{label}</div>
      <div className="num text-lg text-forest font-semibold mt-0.5">{value}</div>
    </div>
  );
}
