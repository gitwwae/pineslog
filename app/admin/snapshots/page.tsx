import { supabaseServer } from "@/lib/supabase/server";
import { formatUSD } from "@/lib/data";
import { upsertSnapshot } from "./actions";

export const metadata = { title: "Admin · Snapshots" };

export default async function SnapshotsAdmin() {
  const sb = await supabaseServer();
  const { data: snaps } = await sb.from("snapshots").select("*").order("month", { ascending: false });
  const list = snaps ?? [];

  return (
    <div className="space-y-8">
      <header>
        <div className="section-eyebrow mb-2">Admin · Snapshots</div>
        <h1 className="h-serif text-3xl tracking-tightest">Monthly snapshots</h1>
        <p className="muted text-sm mt-1">Inserisci o aggiorna lo snapshot del mese (YYYY-MM). Alimenta home e dashboard.</p>
      </header>

      <form action={upsertSnapshot} className="card p-6 grid sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Mese (YYYY-MM)</label>
          <input name="month" required pattern="\d{4}-\d{2}" placeholder="2026-05" className="field num" />
        </div>
        <div>
          <label className="label">Burn / mese</label>
          <input name="burn_monthly" type="number" step="0.01" defaultValue="0" className="field num" />
        </div>
        <div>
          <label className="label"># servizi attivi</label>
          <input name="services_count" type="number" defaultValue="0" className="field num" />
        </div>
        <div>
          <label className="label">Revenue del mese</label>
          <input name="revenue_month" type="number" step="0.01" defaultValue="0" className="field num" />
        </div>
        <div>
          <label className="label">Revenue cumulato</label>
          <input name="revenue_cumulative" type="number" step="0.01" defaultValue="0" className="field num" />
        </div>
        <div>
          <label className="label">MRR</label>
          <input name="mrr" type="number" step="0.01" defaultValue="0" className="field num" />
        </div>
        <div>
          <label className="label">Audience</label>
          <input name="audience_size" type="number" defaultValue="0" className="field num" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Note</label>
          <input name="notes" className="field" />
        </div>
        <div className="sm:col-span-3 flex justify-end">
          <button type="submit" className="btn btn-primary">Save snapshot</button>
        </div>
      </form>

      <section className="card overflow-hidden">
        <div className="grid grid-cols-[0.7fr_0.7fr_0.6fr_0.7fr_0.7fr_0.7fr_0.6fr_1fr] gap-2 px-5 py-3 border-b border-forest/10 text-[11px] uppercase tracking-widest dim bg-cream-50">
          <div>Month</div><div className="text-right">Burn</div><div className="text-right">Tools</div>
          <div className="text-right">Revenue</div><div className="text-right">Cumul.</div>
          <div className="text-right">MRR</div><div className="text-right">Audience</div><div>Notes</div>
        </div>
        {list.length === 0 && <div className="px-5 py-8 muted text-sm">Nessuno snapshot ancora.</div>}
        {list.map(s => (
          <div key={s.id} className="grid grid-cols-[0.7fr_0.7fr_0.6fr_0.7fr_0.7fr_0.7fr_0.6fr_1fr] gap-2 px-5 py-3 border-b border-forest/10 last:border-0 items-center text-sm">
            <div className="num">{s.month}</div>
            <div className="text-right num">{formatUSD(Number(s.burn_monthly), { maximumFractionDigits: 2 })}</div>
            <div className="text-right num">{s.services_count}</div>
            <div className="text-right num">{formatUSD(Number(s.revenue_month))}</div>
            <div className="text-right num text-forest font-semibold">{formatUSD(Number(s.revenue_cumulative))}</div>
            <div className="text-right num">{formatUSD(Number(s.mrr))}</div>
            <div className="text-right num">{s.audience_size}</div>
            <div className="muted text-xs truncate">{s.notes ?? ""}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
