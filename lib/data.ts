import { supabaseServer } from "@/lib/supabase/server";
import type { Phase, Milestone, Service, Snapshot, Settings, LogEntry } from "@/lib/types";

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

export async function getPhases(): Promise<Phase[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("phases").select("*").order("position", { ascending: true });
  return (data ?? []) as Phase[];
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

export async function getPublishedLogs(): Promise<LogEntry[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from("log_entries").select("*").eq("published", true).order("published_at", { ascending: false });
  return (data ?? []) as LogEntry[];
}

export function daysSince(dateIso: string): number {
  const start = new Date(dateIso).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
}

export function formatUSD(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, ...opts }).format(n);
}
