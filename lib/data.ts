import { supabaseServer } from "@/lib/supabase/server";
import type { Phase, LocalizedPhase, Milestone, Service, Snapshot, Settings, LogEntry } from "@/lib/types";
import type { Locale } from "@/lib/i18n/messages";

export async function getSettings(): Promise<Settings> {
  const sb = await supabaseServer();
  const { data } = await sb.from("settings").select("key,value");
  const out: Record<string, unknown> = {
    goal_amount: 1_000_000,
    start_date: "2026-05-01",
    horizon_months: 48,
    site_tagline: "Field notes on the road to $1M.",
    founder_name: "Amin"
  };
  data?.forEach((row) => { out[row.key] = row.value; });
  return out as unknown as Settings;
}

export async function getPhases(locale: Locale = "en"): Promise<LocalizedPhase[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("phases").select("*").order("position", { ascending: true });
  return (data ?? []).map((p: Phase) => localizePhase(p, locale));
}

function localizePhase(p: Phase, locale: Locale): LocalizedPhase {
  const useIt = locale === "it";
  return {
    id: p.id,
    slug: p.slug,
    short_name: p.short_name,
    start_month: p.start_month,
    end_month: p.end_month,
    color: p.color,
    target_amount: p.target_amount,
    position: p.position,
    name: useIt && p.name_it ? p.name_it : p.name,
    description: useIt && p.description_it ? p.description_it : p.description,
    deliverables: useIt && p.deliverables_it && p.deliverables_it.length > 0 ? p.deliverables_it : p.deliverables
  };
}

export async function getMilestones(): Promise<Milestone[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("milestones").select("*").order("month", { ascending: true });
  return (data ?? []) as Milestone[];
}

export async function getPublicServices(): Promise<Service[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("services").select("*").eq("is_public", true).order("position", { ascending: true });
  return (data ?? []) as Service[];
}

export async function getAllServices(): Promise<Service[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("services").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Service[];
}

export async function getLatestSnapshot(): Promise<Snapshot | null> {
  const sb = await supabaseServer();
  const { data } = await sb.from("snapshots").select("*").order("month", { ascending: false }).limit(1);
  return (data?.[0] as Snapshot) ?? null;
}

async function isAuthed(): Promise<boolean> {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  return !!user;
}

export async function getPublishedLogs(locale: Locale = "en"): Promise<LogEntry[]> {
  const sb = await supabaseServer();
  const admin = await isAuthed();
  let query = sb.from("log_entries").select("*").eq("locale", locale);
  if (!admin) query = query.eq("published", true);
  const { data } = await query.order("published_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
  return (data ?? []) as LogEntry[];
}

export async function getLogBySlug(slug: string, locale: Locale = "en"): Promise<LogEntry | null> {
  const sb = await supabaseServer();
  const admin = await isAuthed();
  // Try requested locale first
  let q1 = sb.from("log_entries").select("*").eq("slug", slug).eq("locale", locale);
  if (!admin) q1 = q1.eq("published", true);
  const { data: primary } = await q1.maybeSingle();
  if (primary) return primary as LogEntry;
  // Fallback to other locale
  let q2 = sb.from("log_entries").select("*").eq("slug", slug);
  if (!admin) q2 = q2.eq("published", true);
  const { data: fallback } = await q2.order("created_at", { ascending: true }).limit(1);
  return (fallback?.[0] as LogEntry) ?? null;
}

export function daysSince(dateIso: string): number {
  const start = new Date(dateIso).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
}

export function formatUSD(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, ...opts }).format(n);
}
