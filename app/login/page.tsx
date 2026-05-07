"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { messages, type Locale, DEFAULT_LOCALE } from "@/lib/i18n/messages";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const params = useSearchParams();
  const errParam = params.get("error");

  useEffect(() => {
    const m = document.cookie.match(/(?:^|; )locale=([^;]+)/);
    if (m && (m[1] === "en" || m[1] === "it")) setLocale(m[1] as Locale);
  }, []);

  const t = messages[locale].login;

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
      <div className="section-eyebrow mb-3">{t.eyebrow}</div>
      <h1 className="h-serif text-4xl tracking-tightest mb-6">{t.title}</h1>

      {errParam === "unauthorized" && (
        <div className="card p-4 mb-6 border-rust/40 bg-amber-100/40 text-sm text-rust">{t.unauthorized}</div>
      )}

      {sent ? (
        <div className="card p-6">
          <div className="h-serif text-xl mb-2">{t.checkInbox}</div>
          <p className="muted text-sm">{t.checkInboxDesc(email)}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div>
            <label className="label">{t.email}</label>
            <input
              type="email"
              required
              className="field"
              placeholder="you@pineslog.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <div className="text-sm text-rust">{error}</div>}
          <button className="btn btn-primary w-full" disabled={loading || !email}>
            {loading ? t.sending : t.sendLink}
          </button>
          <p className="text-xs dim">{t.hint}</p>
        </form>
      )}
    </div>
  );
}
