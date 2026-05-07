import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="container-prose py-8">
      <div className="card p-1.5 flex flex-wrap items-center gap-1 mb-8">
        <AdminNav href="/admin">Dashboard</AdminNav>
        <AdminNav href="/admin/services">Services</AdminNav>
        <AdminNav href="/admin/phases">Phases</AdminNav>
        <AdminNav href="/admin/log">Log</AdminNav>
        <AdminNav href="/admin/snapshots">Snapshots</AdminNav>
        <span className="ml-auto px-3 text-xs muted hidden sm:inline">{user.email}</span>
        <form action={signOut}>
          <button className="btn btn-ghost text-xs">Sign out</button>
        </form>
      </div>
      {children}
    </div>
  );
}

function AdminNav({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-3 py-1.5 text-sm rounded-full text-ink-dim hover:text-forest hover:bg-cream-100 transition">
      {children}
    </Link>
  );
}
