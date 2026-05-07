import { getPhases, getMilestones, getSettings, formatUSD } from "@/lib/data";
import { Gantt } from "@/components/Gantt";
import { RevenueCurve } from "@/components/RevenueCurve";

export const metadata = { title: "Journey" };

export default async function JourneyPage() {
  const [phases, milestones, settings] = await Promise.all([getPhases(), getMilestones(), getSettings()]);
  const sorted = [...phases].sort((a, b) => a.position - b.position);

  return (
    <div className="container-prose py-12 sm:py-16 space-y-12">
      <header>
        <div className="section-eyebrow mb-3">Roadmap · 48 months</div>
        <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">The 6 macro-phases.</h1>
        <p className="muted mt-4 max-w-2xl">
          Six phases, four years, one goal. The non-linear path from zero to a million —
          slow at the start (validation + audience), compounding hard in the back half.
        </p>
      </header>

      <Gantt phases={phases} milestones={milestones} />
      <RevenueCurve milestones={milestones} goal={settings.goal_amount} horizonMonths={settings.horizon_months} />

      <section className="grid sm:grid-cols-2 gap-4">
        {sorted.map((p) => (
          <article key={p.id} className="card card-hover p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-bold rounded-full px-2.5 py-1 num" style={{ background: p.color, color: pickContrast(p.color) }}>
                {p.short_name}
              </span>
              <h3 className="h-serif text-xl">{p.name}</h3>
            </div>
            <div className="muted text-xs num mb-3">M{p.start_month}–{p.end_month}</div>
            {p.description && <p className="text-sm text-ink-dim mb-3">{p.description}</p>}
            {p.deliverables?.length > 0 && (
              <ul className="space-y-1.5 mb-3">
                {p.deliverables.map((d, i) => (
                  <li key={i} className="text-[13px] text-ink-dim flex gap-2">
                    <span className="text-forest mt-0.5">›</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
            {p.target_amount != null && p.target_amount > 0 && (
              <div className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-forest num bg-forest-100 border border-forest-200 px-3 py-1 rounded-full">
                Target M{p.end_month}: {formatUSD(p.target_amount)}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

function pickContrast(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#1F2017";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return ((0.299 * r + 0.587 * g + 0.114 * b) / 255) > 0.62 ? "#1F2017" : "#FFFAF0";
}
