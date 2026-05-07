"use client";

import { useState } from "react";
import type { Service } from "@/lib/types";
import { upsertService } from "./actions";

const CATEGORIES = ["AI", "Infra", "Dev tools", "Marketing", "Produttivita", "Sales", "Design", "Education", "Finance", "Altro"];
const CURRENCIES = ["USD", "EUR", "GBP"];
const CYCLES = [
  { v: "monthly", l: "Mensile" },
  { v: "annual", l: "Annuale" },
  { v: "quarterly", l: "Trimestrale" },
  { v: "one_time", l: "Una tantum" }
];
const STATUSES = [
  { v: "active", l: "Attivo" },
  { v: "trial", l: "Trial" },
  { v: "paused", l: "In pausa" },
  { v: "evaluating", l: "Da valutare" },
  { v: "cancelled", l: "Cancellato" }
];

export function ServiceForm({ service }: { service?: Partial<Service> }) {
  const [pending, setPending] = useState(false);
  return (
    <form
      action={async (fd) => { setPending(true); try { await upsertService(fd); } finally { setPending(false); } }}
      className="card p-6 grid sm:grid-cols-2 gap-4"
    >
      {service?.id && <input type="hidden" name="id" value={service.id} />}
      <div className="sm:col-span-2">
        <label className="label">Servizio</label>
        <input name="name" required defaultValue={service?.name ?? ""} className="field" placeholder="Claude Max" />
      </div>
      <div>
        <label className="label">Fornitore</label>
        <input name="provider" defaultValue={service?.provider ?? ""} className="field" placeholder="Anthropic" />
      </div>
      <div>
        <label className="label">URL</label>
        <input name="url" defaultValue={service?.url ?? ""} className="field" placeholder="https://claude.ai" />
      </div>
      <div>
        <label className="label">Categoria</label>
        <select name="category" defaultValue={service?.category ?? "AI"} className="field">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Stato</label>
        <select name="status" defaultValue={service?.status ?? "evaluating"} className="field">
          {STATUSES.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Costo</label>
        <input name="cost" type="number" step="0.01" defaultValue={service?.cost ?? 0} className="field" />
      </div>
      <div>
        <label className="label">Valuta</label>
        <select name="currency" defaultValue={service?.currency ?? "USD"} className="field">
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Ciclo</label>
        <select name="cycle" defaultValue={service?.cycle ?? "monthly"} className="field">
          {CYCLES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
        </select>
      </div>
      <div className="sm:col-span-1 grid grid-cols-2 gap-2">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-forest/15 bg-cream-50 text-sm">
          <input type="checkbox" name="essential" defaultChecked={!!service?.essential} />
          Essenziale
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-forest/15 bg-cream-50 text-sm">
          <input type="checkbox" name="is_public" defaultChecked={service?.is_public ?? true} />
          Pubblico
        </label>
      </div>
      <div>
        <label className="label">Inizio</label>
        <input name="started_at" type="date" defaultValue={(service?.started_at ?? "")?.toString().slice(0, 10) ?? ""} className="field" />
      </div>
      <div>
        <label className="label">Prossimo rinnovo</label>
        <input name="next_renewal" type="date" defaultValue={(service?.next_renewal ?? "")?.toString().slice(0, 10) ?? ""} className="field" />
      </div>
      <div className="sm:col-span-2">
        <label className="label">Note</label>
        <textarea name="notes" rows={3} defaultValue={service?.notes ?? ""} className="field" />
      </div>
      <div className="sm:col-span-2 flex justify-end gap-2">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : (service?.id ? "Save changes" : "Add service")}
        </button>
      </div>
    </form>
  );
}
