import { getPublicServices, formatUSD } from "@/lib/data";
import { STATUS_LABEL, monthlyCost, annualCost } from "@/lib/types";

export const metadata = { title: "Stack" };

export default async function StackPage() {
  const services = await getPublicServices();
  const active = services.filter(s => s.status === "active" || s.status === "trial");
  const totalMonthly = active.reduce((acc, s) => acc + monthlyCost(s), 0);
  const totalAnnual  = active.reduce((acc, s) => acc + annualCost(s), 0);

  return (
    <div className="container-prose py-12 sm:py-16 space-y-10">
      <header>
        <div className="section-eyebrow mb-3">Build in public · live</div>
        <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">The stack.</h1>
        <p className="muted mt-4 max-w-2xl">
          Every paid tool I use, the cost, and what it&rsquo;s for. Updated as I add or cut.
          Burn rate goal in year one: under <span className="num text-amber-700 font-semibold">$200/mo</span>.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <Stat label="Active tools" value={`${active.length}`} />
        <Stat label="Monthly burn" value={formatUSD(totalMonthly, { maximumFractionDigits: 2 })} />
        <Stat label="Annual" value={formatUSD(totalAnnual)} />
      </div>

      <section className="card overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.6fr] gap-2 px-5 py-3 border-b border-forest/10 text-[11px] uppercase tracking-widest dim bg-cream-50">
          <div>Service</div>
          <div>Category</div>
          <div className="text-right">Cost</div>
          <div className="text-right">/ month</div>
          <div className="text-right">Status</div>
        </div>
        {services.length === 0 && (
          <div className="px-5 py-8 muted text-sm">Nessun tool pubblicato ancora.</div>
        )}
        {services.map((s) => (
          <div key={s.id} className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.6fr] gap-2 px-5 py-4 border-b border-forest/10 last:border-0 items-center text-sm">
            <div>
              <div className="text-ink font-medium">{s.name}</div>
              {s.provider && <div className="dim text-xs mt-0.5">{s.provider}{s.essential && " · essential"}</div>}
            </div>
            <div className="muted text-xs">{s.category}</div>
            <div className="text-right num">{formatUSD(s.cost, { maximumFractionDigits: 2 })}<span className="dim text-xs ml-1">/{shortCycle(s.cycle)}</span></div>
            <div className="text-right num text-forest font-semibold">{formatUSD(monthlyCost(s), { maximumFractionDigits: 2 })}</div>
            <div className="text-right">
              <span className={`tag tag-${tagClass(s.status)}`}>{STATUS_LABEL[s.status]}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="text-[11px] uppercase tracking-widest dim">{label}</div>
      <div className="num text-2xl text-forest font-semibold mt-1">{value}</div>
    </div>
  );
}
function shortCycle(c: string) {
  return c === "monthly" ? "mo" : c === "annual" ? "yr" : c === "quarterly" ? "qtr" : "once";
}
function tagClass(s: string) {
  if (s === "active") return "active";
  if (s === "trial") return "trial";
  if (s === "paused") return "paused";
  if (s === "cancelled") return "cancel";
  return "eval";
}
