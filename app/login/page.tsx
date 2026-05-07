"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const errParam = params.get("error");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const sb = supabaseBrowser();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false }
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="container-prose py-20 max-w-md">
      <div className="section-eyebrow mb-3">Admin</div>
      <h1 className="h-serif text-4xl tracking-tightest mb-6">Sign in</h1>

      {errParam === "unauthorized" && (
        <div className="card p-4 mb-6 border-rust/40 bg-amber-100/40 text-sm text-rust">
          Email non autorizzata. Solo l&rsquo;email definita in <span className="num">ADMIN_EMAIL</span> puo accedere.
        </div>
      )}

      {sent ? (
        <div className="card p-6">
          <div className="h-serif text-xl mb-2">Check your email.</div>
          <p className="muted text-sm">Ti ho mandato un magic link a <span className="num text-forest">{email}</span>. Apri il link da questo browser per entrare.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              className="field"
              placeholder="tu@pineslog.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <div className="text-sm text-rust">{error}</div>}
          <button className="btn btn-primary w-full" disabled={loading || !email}>
            {loading ? "Sending…" : "Send magic link"}
          </button>
          <p className="text-xs dim">
            Solo l&rsquo;email definita in <span className="num">ADMIN_EMAIL</span> riceve l&rsquo;accesso. Magic link via Supabase Auth, nessuna password.
          </p>
        </form>
      )}
    </div>
  );
}
