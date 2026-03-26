-- Email Deliverability Quiz — leads table
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null,
  email       text not null,
  send_volume text,
  raw_points  int not null,
  health_score int not null,
  tier        text not null,
  tier_label  text not null,
  answers     jsonb not null default '[]'
);

-- Insert-only for anon key (no public reads)
alter table public.leads enable row level security;

create policy "Allow anon insert"
  on public.leads
  for insert
  to anon
  with check (true);
