"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertSnapshot(fd: FormData) {
  const sb = await supabaseServer();
  const month = String(fd.get("month") ?? "");
  if (!/^\d{4}-\d{2}$/.test(month)) throw new Error("month must be YYYY-MM");
  const payload = {
    month,
    burn_monthly: Number(fd.get("burn_monthly") ?? 0),
    services_count: Number(fd.get("services_count") ?? 0),
    revenue_month: Number(fd.get("revenue_month") ?? 0),
    revenue_cumulative: Number(fd.get("revenue_cumulative") ?? 0),
    mrr: Number(fd.get("mrr") ?? 0),
    audience_size: Number(fd.get("audience_size") ?? 0),
    notes: (fd.get("notes") as string) || null
  };
  const { error } = await sb.from("snapshots").upsert(payload, { onConflict: "month" });
  if (error) throw error;
  revalidatePath("/admin/snapshots");
  revalidatePath("/");
}
