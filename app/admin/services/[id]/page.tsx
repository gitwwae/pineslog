import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { ServiceForm } from "../ServiceForm";
import type { Service } from "@/lib/types";

export const metadata = { title: "Admin · Edit service" };

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await supabaseServer();
  const { data: service } = await sb.from("services").select("*").eq("id", id).single();
  if (!service) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/services" className="text-sm muted hover:text-forest">← Back to services</Link>
        <h1 className="h-serif text-3xl tracking-tightest mt-2">Edit · {service.name}</h1>
      </div>
      <ServiceForm service={service as Service} />
    </div>
  );
}
