-- pineslog — seed iniziale
-- Esegui DOPO 001_init.sql, sempre nel SQL Editor di Supabase

-- Settings: parametri globali
insert into settings (key, value) values
  ('goal_amount',       '1000000'::jsonb),
  ('start_date',        '"2026-05-01"'::jsonb),
  ('horizon_months',    '48'::jsonb),
  ('site_tagline',      '"Field notes on the road to $1M — building AI in the open."'::jsonb),
  ('founder_name',      '"Amin"'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

-- Phases (matchano il Gantt HTML)
insert into phases (slug, name, short_name, start_month, end_month, color, description, deliverables, target_amount, position) values
  ('foundation', 'Foundation', 'F0',  1,  2, '#b48cff',
   'Setup, posizionamento, primi 100 follower. Niche: AI automation per SMB / dev tooling.',
   array['Niche selection (5 conversazioni)','Brand setup (X / LinkedIn / GitHub / landing)','Offer-stack (3 pacchetti)','Stack zero-cost (Notion, Cal, Stripe, Loom, n8n, Cursor)'],
   0, 0),

  ('servizi-cash', 'Servizi · Cash flow', 'F1',  1,  9, '#6aa9ff',
   'Cash flow immediato vendendo expertise AI/automation a PMI. Reinvest 100% in audience e prodotto.',
   array['Cold outreach 20/giorno per 90 giorni','Pacchetti $1.5K-$8K','2-3 client/mese','Case study pubblici da ogni progetto'],
   50000, 1),

  ('content-audience', 'Content & Audience', 'F2',  2, 48, '#ff7ab6',
   'Asset che compounding: build in public always-on. X, LinkedIn, YouTube, Newsletter.',
   array['X: 1 thread/sett + 2 post/giorno','LinkedIn: 3 post B2B/sett','YouTube: 1 video/sett dal mese 6','Newsletter 1/sett dal mese 3'],
   null, 2),

  ('micro-saas-v1', 'Micro-SaaS v1', 'F3',  6, 14, '#5fd7d0',
   'Productize il problema piu ricorrente nei servizi. MVP -> launch -> iterazione retention-driven.',
   array['10 interviste validation','MVP 6-8 settimane','Pricing $29-$99/mese','Lancio: ProductHunt + audience + clienti F1'],
   80000, 3),

  ('scale-1', 'Scale Phase 1', 'F4', 12, 24, '#7cf0c0',
   'Da freelance a piccolo studio AI con prodotto principale. Team leverage, pricing up.',
   array['Hire: 1 VA + 1 dev junior','Pricing servizi +30-50%','Productized service','Lancio prodotto #2 (info-product/corso)'],
   300000, 4),

  ('scale-2', 'Scale Phase 2', 'F5', 24, 36, '#ffb86b',
   'Diversificazione revenue: SaaS + community premium + acquisizioni opportunistiche.',
   array['Team 3-5 persone, SOPs codificate','Community/membership premium','Acquisizione micro-SaaS ($20-80K)','Eventuale brand fisico DTC'],
   700000, 5),

  ('acceleration', 'Acceleration to $1M', 'F6', 36, 48, '#ffd166',
   'Sprint finale: paid acquisition, partnership, M&A o exit parziale.',
   array['Paid acquisition (LTV/CAC > 3)','Partnership distribuzione','Valutazione exit (3-5x ARR)','Re-investi in nuovo bet'],
   1050000, 6)
on conflict (slug) do update set
  name = excluded.name,
  start_month = excluded.start_month,
  end_month = excluded.end_month,
  color = excluded.color,
  description = excluded.description,
  deliverables = excluded.deliverables,
  target_amount = excluded.target_amount,
  position = excluded.position;

-- Milestones (revenue cumulato)
insert into milestones (month, label, target_amount) values
  ( 6, '$30K',  30000),
  (12, '$80K',  80000),
  (18, '$180K', 180000),
  (24, '$300K', 300000),
  (30, '$500K', 500000),
  (36, '$700K', 700000),
  (42, '$870K', 870000),
  (48, '$1.05M', 1050000)
on conflict do nothing;

-- Services iniziali
insert into services (name, provider, url, category, cost, currency, cycle, status, started_at, next_renewal, essential, is_public, notes, position) values
  ('Claude Max', 'Anthropic', 'https://claude.ai', 'AI', 100, 'USD', 'monthly', 'active', '2026-05-01', '2026-06-01', true, true,
   'Strumento principale: agente, coding, content, ricerca. Leva di produttivita primaria.', 0)
on conflict do nothing;

-- Snapshot iniziale
insert into snapshots (month, burn_monthly, services_count, revenue_month, revenue_cumulative, mrr, audience_size, notes) values
  ('2026-05', 100, 1, 0, 0, 0, 0, 'Punto di partenza. Solo Claude Max attivo.')
on conflict (month) do nothing;
