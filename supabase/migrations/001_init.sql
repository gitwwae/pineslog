-- pineslog — schema iniziale
-- Esegui questo file nel SQL Editor di Supabase (project > SQL > New query)

create extension if not exists "uuid-ossp";

-- =====================================================
-- SETTINGS (singleton key-value store)
-- =====================================================
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- =====================================================
-- PHASES (le 6 macro-fasi del Gantt)
-- =====================================================
create table if not exists phases (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  short_name text not null,
  start_month int not null,        -- 1..48
  end_month   int not null,
  color text not null,             -- hex
  description text,
  deliverables text[] default '{}',
  target_amount numeric,           -- USD cumulato a fine fase
  position int not null default 0, -- order in chart
  created_at timestamptz default now()
);

-- =====================================================
-- MILESTONES (diamanti gialli sul Gantt)
-- =====================================================
create table if not exists milestones (
  id uuid primary key default uuid_generate_v4(),
  month int not null,
  label text not null,
  target_amount numeric not null,   -- USD cumulato target
  achieved_amount numeric,
  achieved_at date,
  notes text,
  created_at timestamptz default now()
);

-- =====================================================
-- SERVICES (tool che uso, costi ricorrenti)
-- =====================================================
create type service_status as enum ('active','trial','paused','evaluating','cancelled');
create type service_cycle  as enum ('monthly','annual','quarterly','one_time');

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  provider text,
  url text,
  category text not null,           -- AI, Infra, Dev tools, Marketing, ...
  cost numeric not null default 0,
  currency text not null default 'USD',
  cycle service_cycle not null default 'monthly',
  status service_status not null default 'evaluating',
  started_at date,
  next_renewal date,
  essential boolean default false,
  is_public boolean default true,   -- mostrare in /stack pubblico
  notes text,
  position int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- monthly_cost calcolato
create or replace view services_monthly as
  select
    s.*,
    case s.cycle
      when 'monthly'     then s.cost
      when 'annual'      then s.cost / 12.0
      when 'quarterly'   then s.cost / 3.0
      when 'one_time'    then 0
    end as monthly_cost,
    case s.cycle
      when 'monthly'     then s.cost * 12
      when 'annual'      then s.cost
      when 'quarterly'   then s.cost * 4
      when 'one_time'    then s.cost
    end as annual_cost
  from services s;

-- =====================================================
-- LOG ENTRIES (post pubblici / field notes)
-- =====================================================
create table if not exists log_entries (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  body_md text not null default '',
  excerpt text,
  week_number int,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- SNAPSHOTS (mensili: burn, revenue, audience)
-- =====================================================
create table if not exists snapshots (
  id uuid primary key default uuid_generate_v4(),
  month text not null,              -- YYYY-MM
  burn_monthly numeric default 0,
  services_count int default 0,
  revenue_month numeric default 0,
  revenue_cumulative numeric default 0,
  mrr numeric default 0,
  audience_size int default 0,
  notes text,
  created_at timestamptz default now(),
  unique(month)
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table settings     enable row level security;
alter table phases       enable row level security;
alter table milestones   enable row level security;
alter table services     enable row level security;
alter table log_entries  enable row level security;
alter table snapshots    enable row level security;

-- Public read policies (chiunque puo' leggere — il sito e' pubblico)
create policy "public read settings"   on settings    for select using (true);
create policy "public read phases"     on phases      for select using (true);
create policy "public read milestones" on milestones  for select using (true);
create policy "public read services"   on services    for select using (is_public = true);
create policy "public read logs"       on log_entries for select using (published = true);
create policy "public read snapshots"  on snapshots   for select using (true);

-- Authenticated full access (admin)
create policy "auth all settings"   on settings    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all phases"     on phases      for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all milestones" on milestones  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all services"   on services    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all logs"       on log_entries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all snapshots"  on snapshots   for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =====================================================
-- TRIGGER updated_at
-- =====================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_services_updated  before update on services    for each row execute function set_updated_at();
create trigger trg_logs_updated      before update on log_entries for each row execute function set_updated_at();
