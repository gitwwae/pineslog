import { getPhases, getMilestones } from "@/lib/data";

export const metadata = { title: "Admin · Phases" };

export default async function PhasesAdmin() {
  const [phases, milestones] = await Promise.all([getPhases(), getMilestones()]);
  return (
    <div className="space-y-8">
      <header>
        <div className="section-eyebrow mb-2">Admin · Phases</div>
        <h1 className="h-serif text-3xl tracking-tightest">Roadmap</h1>
        <p className="muted text-sm mt-1">Per ora le fasi e milestone si gestiscono via SQL su Supabase. CRUD UI in arrivo.</p>
      </header>

      <section className="card p-6">
        <h2 className="h-serif text-xl mb-3">Phases ({phases.length})</h2>
        <div className="space-y-2 text-sm">
          {phases.map(p => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
              <span className="num text-xs muted w-12">{p.short_name}</span>
              <span className="text-ink flex-1">{p.name}</span>
              <span className="num text-xs muted">M{p.start_month}–{p.end_month}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="h-serif text-xl mb-3">Milestones ({milestones.length})</h2>
        <div className="space-y-2 text-sm">
          {milestones.map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="num text-xs muted w-12">M{m.month}</span>
              <span className="text-ink flex-1 num">{m.label}</span>
              <span className="num text-forest font-semibold">${(m.target_amount/1000).toLocaleString()}K</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
