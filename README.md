# pineslog

Field notes on the road to $1M. Public log built with Next.js + Supabase.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind
- Supabase (Postgres + Auth, magic link)
- Vercel (deploy + dominio)
- **$0/mo** su tutti i free tier

## Struttura

```
pineslog/
├─ app/
│  ├─ page.tsx               # Home (hero + KPI live)
│  ├─ journey/page.tsx       # Gantt + curva revenue
│  ├─ stack/page.tsx         # Tool pubblici (build in public)
│  ├─ log/page.tsx           # Field notes pubbliche
│  ├─ about/page.tsx
│  ├─ login/page.tsx         # Magic link
│  ├─ auth/callback/route.ts # Exchange code → session
│  └─ admin/                 # Protetto da middleware (ADMIN_EMAIL)
│     ├─ page.tsx            # Dashboard burn rate
│     ├─ services/           # CRUD servizi
│     ├─ snapshots/          # Snapshot mensile
│     ├─ phases/             # Read-only (CRUD prossima sessione)
│     └─ log/                # Editor (prossima sessione)
├─ components/
│  ├─ Nav.tsx · Footer.tsx
│  ├─ Gantt.tsx              # SVG timeline 48 mesi
│  └─ RevenueCurve.tsx       # Curva $0 → $1M
├─ lib/
│  ├─ supabase/{server,client}.ts
│  ├─ types.ts · data.ts
├─ supabase/
│  ├─ migrations/001_init.sql
│  └─ seed.sql
└─ middleware.ts             # Protegge /admin
```

---

## Setup (30 minuti, una volta sola)

### 1. Crea il progetto Supabase

1. Vai su https://supabase.com → New project (free tier).
2. Scegli password DB, regione (eu-central-1 va bene per IT).
3. Quando il progetto è pronto, vai su **Project Settings → API**:
   - Copia `Project URL` → ti servirà come `NEXT_PUBLIC_SUPABASE_URL`
   - Copia `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copia `service_role` (segreto!) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Esegui le migration + seed

1. Nel pannello Supabase apri **SQL Editor → New query**.
2. Incolla tutto il contenuto di `supabase/migrations/001_init.sql` → Run.
3. Nuova query, incolla `supabase/seed.sql` → Run.

Verifica: tab **Table Editor** dovrebbe mostrare `phases` (7 righe), `milestones` (8), `services` (1), `snapshots` (1).

### 3. Configura l'auth

1. Supabase → **Authentication → Providers → Email**:
   - Disabilita "Enable Email Confirmations" se vuoi login più veloce in dev.
2. **Authentication → URL Configuration**:
   - Site URL: `https://pineslog.com`
   - Redirect URLs: aggiungi `http://localhost:3000/**` e `https://pineslog.com/**`
3. **Authentication → Users → Invite user**: invita la tua email (sarà l'unica autorizzata via `ADMIN_EMAIL`).

### 4. Setup locale

```bash
cd pineslog
cp .env.local.example .env.local
# Compila .env.local con i valori di Supabase + la tua email + URL
npm install
npm run dev
# → http://localhost:3000
```

Apri `/login`, inserisci l'email autorizzata, clicca il magic link nella mail → entri in `/admin`.

### 5. Deploy su Vercel

1. Pusha su GitHub: `git init && git add . && git commit -m "init pineslog" && git remote add origin <repo> && git push`.
2. Su https://vercel.com → New Project → importa il repo → root `/pineslog`.
3. **Environment Variables** (copia da `.env.local`, ma per `NEXT_PUBLIC_SITE_URL` usa `https://pineslog.com`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy → hai un URL `*.vercel.app`.

### 6. Punta pineslog.com a Vercel

1. Vercel → progetto → **Settings → Domains** → Add `pineslog.com` e `www.pineslog.com`.
2. Vercel ti mostrerà i record DNS da impostare. Sul tuo DNS provider (Cloudflare/registrar):
   - `A` record `@` → IP fornito da Vercel (tipicamente `76.76.21.21`)
   - `CNAME` record `www` → `cname.vercel-dns.com`
3. Aspetta propagazione (5-30 min). Vercel emette automaticamente il certificato SSL.

### 7. Aggiorna il Site URL su Supabase

Quando il dominio è live: torna su Supabase → Authentication → URL Configuration → metti `https://pineslog.com` come Site URL definitivo. Senza questo, i magic link reindirizzano sul dominio sbagliato.

---

## Workflow quotidiano

- **Aggiungi un tool**: `/admin/services` → form in fondo. Mettilo `is_public = true` per farlo apparire su `/stack`.
- **Snapshot mensile** (consiglio: ogni 1° del mese): `/admin/snapshots` → form in alto. La home si aggiorna sola.
- **Modifica una fase**: per ora via SQL su Supabase (`update phases set ... where slug = '...'`). CRUD UI nella prossima sessione.

## Comandi utili

```bash
npm run dev          # local
npm run build        # production build
npm run typecheck    # TS check senza emit
```

## Troubleshooting

- **Magic link redirect to localhost in production**: hai dimenticato di aggiornare Site URL su Supabase (step 7).
- **"Email non autorizzata"**: l'email che usi non corrisponde a `ADMIN_EMAIL`. Aggiorna env var su Vercel + redeploy.
- **Tabelle vuote**: hai eseguito solo la migration ma non `seed.sql`. Eseguilo.
- **Build fail su Vercel**: controlla che le env vars siano tutte settate. Senza Supabase URL l'app non builda.

## Roadmap del codice

- [ ] Editor markdown per `/admin/log` (prossima sessione)
- [ ] CRUD UI per phases & milestones
- [ ] Pagina pubblica `/log/[slug]` con MDX
- [ ] OG image dinamiche per ogni log entry
- [ ] RSS feed
- [ ] Newsletter (Resend integration)

---

Built in public from day 0.
