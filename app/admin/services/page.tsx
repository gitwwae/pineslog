import Link from "next/link";
import { getAllServices, formatUSD } from "@/lib/data";
import { monthlyCost, STATUS_LABEL } from "@/lib/types";
import { ServiceForm } from "./ServiceForm";
import { deleteService } from "./actions";

export const metadata = { title: "Admin · Services" };

export default async function ServicesAdmin() {
  const services = await getAllServices();

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <div className="section-eyebrow mb-2">Admin · Services</div>
          <h1 className="h-serif text-3xl tracking-tightest">Stack management</h1>
        </div>
      </header>

      <section className="card overflow-hidden">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.7fr_0.4fr] gap-2 px-5 py-3 border-b border-forest/10 text-[11px] uppercase tracking-widest dim bg-cream-50">
          <div>Service</div>
          <div>Category</div>
          <div className="text-right">Cost</div>
          <div className="text-right">/ month</div>
          <div className="text-right">Status</div>
          <div className="text-right"></div>
        </div>
        {services.length === 0 && <div className="px-5 py-8 muted text-sm">Nessun servizio. Aggiungine uno qui sotto.</div>}
        {services.map((s) => (
          <div key={s.id} className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.7fr_0.4fr] gap-2 px-5 py-4 border-b border-forest/10 last:border-0 items-center text-sm">
            <div>
              <Link href={`/admin/services/${s.id}`} className="text-ink font-medium hover:text-forest">{s.name}</Link>
              {s.provider && <div className="dim text-xs mt-0.5">{s.provider}</div>}
            </div>
            <div className="muted text-xs">{s.category}</div>
            <div className="text-right num">{formatUSD(s.cost, { maximumFractionDigits: 2 })}<span className="dim text-xs ml-1">/{s.cycle === "monthly" ? "mo" : s.cycle === "annual" ? "yr" : s.cycle === "quarterly" ? "qtr" : "once"}</span></div>
            <div className="text-right num text-forest font-semibold">{formatUSD(monthlyCost(s), { maximumFractionDigits: 2 })}</div>
            <div className="text-right"><span className={`tag tag-${tagClass(s.status)}`}>{STATUS_LABEL[s.status]}</span></div>
            <div className="text-right flex justify-end gap-1">
              <Link href={`/admin/services/${s.id}`} className="text-xs px-2 py-1 rounded muted hover:text-forest">Edit</Link>
              <form action={async () => { "use server"; await deleteService(s.id); }}>
                <button className="text-xs px-2 py-1 rounded muted hover:text-rust">Del</button>
              </form>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="h-serif text-2xl mb-4">Add service</h2>
        <ServiceForm />
      </section>
    </div>
  );
}

function tagClass(s: string) {
  if (s === "active") return "active";
  if (s === "trial") return "trial";
  if (s === "paused") return "paused";
  if (s === "cancelled") return "cancel";
  return "eval";
}
