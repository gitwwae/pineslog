"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export type ServicePayload = {
  id?: string;
  name: string;
  provider?: string | null;
  url?: string | null;
  category: string;
  cost: number;
  currency?: string;
  cycle: "monthly" | "annual" | "quarterly" | "one_time";
  status: "active" | "trial" | "paused" | "evaluating" | "cancelled";
  started_at?: string | null;
  next_renewal?: string | null;
  essential?: boolean;
  is_public?: boolean;
  notes?: string | null;
};

function parseForm(fd: FormData): ServicePayload {
  const num = (v: FormDataEntryValue | null) => (v == null || v === "" ? 0 : Number(v));
  const str = (v: FormDataEntryValue | null) => (v == null || v === "" ? null : String(v));
  return {
    id: (fd.get("id") as string) || undefined,
    name: String(fd.get("name") ?? "").trim(),
    provider: str(fd.get("provider")),
    url: str(fd.get("url")),
    category: String(fd.get("category") ?? "Altro"),
    cost: num(fd.get("cost")),
    currency: String(fd.get("currency") ?? "USD"),
    cycle: (String(fd.get("cycle") ?? "monthly") as ServicePayload["cycle"]),
    status: (String(fd.get("status") ?? "evaluating") as ServicePayload["status"]),
    started_at: str(fd.get("started_at")),
    next_renewal: str(fd.get("next_renewal")),
    essential: fd.get("essential") === "on",
    is_public: fd.get("is_public") === "on",
    notes: str(fd.get("notes"))
  };
}

export async function upsertService(fd: FormData) {
  const sb = await supabaseServer();
  const payload = parseForm(fd);
  if (!payload.name) throw new Error("Name required");

  if (payload.id) {
    const { error } = await sb.from("services").update({
      name: payload.name,
      provider: payload.provider,
      url: payload.url,
      category: payload.category,
      cost: payload.cost,
      currency: payload.currency,
      cycle: payload.cycle,
      status: payload.status,
      started_at: payload.started_at,
      next_renewal: payload.next_renewal,
      essential: payload.essential,
      is_public: payload.is_public,
      notes: payload.notes
    }).eq("id", payload.id);
    if (error) throw error;
  } else {
    const { id, ...insert } = payload;
    void id;
    const { error } = await sb.from("services").insert(insert);
    if (error) throw error;
  }

  revalidatePath("/admin/services");
  revalidatePath("/stack");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const sb = await supabaseServer();
  const { error } = await sb.from("services").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/services");
  revalidatePath("/stack");
}
