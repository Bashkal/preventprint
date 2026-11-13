-- PreventPrint – initial schema (v0)
-- Based on CLAUDE.md "Data model (planned)".
-- Run once: Supabase Dashboard > SQL Editor, or `supabase db push` with the CLI.

-- =========================================================
-- Types
-- =========================================================
create type public.medium as enum ('air', 'water', 'soil', 'chemicals');
create type public.setting as enum ('school', 'home', 'workshop', 'outdoors');
create type public.blueprint_status as enum ('draft', 'in_review', 'published');
create type public.section_type as enum (
  'health_risk',
  'application_code',
  'mechanical_design',
  'spatial_placement',
  'cost_adoption',
  'limitations_safety'
);

-- =========================================================
-- Team members (who may write). Add rows by hand after inviting users.
-- =========================================================
create table public.team_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_team_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.team_members where user_id = auth.uid());
$$;

-- =========================================================
-- Blueprints
-- title / summary are stored per language: {"en": "...", "tr": "..."}
-- =========================================================
create table public.blueprints (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title jsonb not null,
  summary jsonb not null default '{}'::jsonb,
  medium public.medium not null,
  setting public.setting not null,
  cost_try numeric(10, 2),
  status public.blueprint_status not null default 'draft',
  original_lang text not null default 'en',
  sections_done smallint not null default 0,  -- kept up to date by trigger below
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- Blueprint sections (one row per section per language)
-- =========================================================
create table public.blueprint_sections (
  id uuid primary key default gen_random_uuid(),
  blueprint_id uuid not null references public.blueprints (id) on delete cascade,
  section_type public.section_type not null,
  lang text not null check (lang ~ '^[a-z]{2}$'),
  content text not null default '',
  is_manual boolean not null default true,   -- false = machine-translated
  updated_at timestamptz not null default now(),
  unique (blueprint_id, section_type, lang)
);

-- =========================================================
-- Glossary, reviews (T6 evidence), submissions
-- =========================================================
create table public.glossary (
  id uuid primary key default gen_random_uuid(),
  term_en text not null unique,
  term_tr text not null,
  note text
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  blueprint_id uuid not null references public.blueprints (id) on delete cascade,
  reviewer text not null,
  notes text not null,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  medium public.medium,
  setting public.setting,
  lang text not null default 'en',
  content jsonb not null default '{}'::jsonb,   -- six sections as written by the contributor
  contact text,                                 -- optional; only what the form needs
  status text not null default 'new' check (status in ('new', 'accepted', 'rejected')),
  created_at timestamptz not null default now()
);

-- =========================================================
-- Triggers: updated_at and sections_done
-- =========================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blueprints_touch before update on public.blueprints
  for each row execute function public.touch_updated_at();
create trigger sections_touch before update on public.blueprint_sections
  for each row execute function public.touch_updated_at();

-- Counts how many of the six sections have text in the blueprint's original language
create or replace function public.refresh_sections_done()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  bp uuid := coalesce(new.blueprint_id, old.blueprint_id);
begin
  update public.blueprints b
  set sections_done = (
    select count(*) from public.blueprint_sections s
    where s.blueprint_id = b.id
      and s.lang = b.original_lang
      and length(trim(s.content)) > 0
  )
  where b.id = bp;
  return null;
end;
$$;

create trigger sections_count after insert or update or delete on public.blueprint_sections
  for each row execute function public.refresh_sections_done();

-- A blueprint cannot be published until all six sections are written
create or replace function public.check_publishable()
returns trigger language plpgsql as $$
begin
  if new.status = 'published' and new.sections_done < 6 then
    raise exception 'Blueprint % cannot be published: only % of 6 sections written', new.slug, new.sections_done;
  end if;
  return new;
end;
$$;

create trigger blueprints_publish_check before insert or update of status on public.blueprints
  for each row execute function public.check_publishable();

-- =========================================================
-- Row Level Security
-- Public: can see every blueprint card (title, medium, cost, progress),
--         but section text only when the blueprint is published.
-- Team:   full read/write.
-- Anyone: can send a submission (insert only).
-- =========================================================
alter table public.team_members enable row level security;
alter table public.blueprints enable row level security;
alter table public.blueprint_sections enable row level security;
alter table public.glossary enable row level security;
alter table public.reviews enable row level security;
alter table public.submissions enable row level security;

create policy "team reads team" on public.team_members
  for select to authenticated using (public.is_team_member());

create policy "public reads blueprint cards" on public.blueprints
  for select using (true);
create policy "team writes blueprints" on public.blueprints
  for all to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "public reads published sections" on public.blueprint_sections
  for select using (
    exists (select 1 from public.blueprints b where b.id = blueprint_id and b.status = 'published')
    or public.is_team_member()
  );
create policy "team writes sections" on public.blueprint_sections
  for all to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "public reads glossary" on public.glossary
  for select using (true);
create policy "team writes glossary" on public.glossary
  for all to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "team reads reviews" on public.reviews
  for select to authenticated using (public.is_team_member());
create policy "team writes reviews" on public.reviews
  for all to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "anyone submits" on public.submissions
  for insert with check (status = 'new');
create policy "team manages submissions" on public.submissions
  for all to authenticated using (public.is_team_member()) with check (public.is_team_member());

-- =========================================================
-- Seed: the three example blueprints (drafts, no section text yet)
-- =========================================================
insert into public.blueprints (slug, title, summary, medium, setting, cost_try) values
(
  'classroom-ventilation-indicator',
  '{"en": "Classroom ventilation indicator", "tr": "Sınıf havalandırma göstergesi"}',
  '{"en": "A small device that shows when classroom air is getting stale, so the class knows when to open the windows."}',
  'air', 'school', 1500
),
(
  'cleaning-products-storage',
  '{"en": "Safe storage and mixing of cleaning products", "tr": "Temizlik ürünlerinin güvenli saklanması ve karıştırılması"}',
  '{"en": "A home guide for storing, labelling and using cleaning products so that no one mixes or swallows them by mistake."}',
  'chemicals', 'home', null
),
(
  'seed-germination-soil-test',
  '{"en": "Seed-germination soil test", "tr": "Tohum çimlenmesiyle toprak testi"}',
  '{"en": "A step-by-step test that compares how seeds sprout in garden soil and in clean soil, as a first screen before growing food."}',
  'soil', 'home', null
);
