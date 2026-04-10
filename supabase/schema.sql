-- VetAssistant database schema
-- Run this in your Supabase SQL Editor to create the tables

create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  species text not null check (species in ('chien', 'chat')),
  age_info text,
  problem text not null,
  module_slug text not null,
  checklist_data jsonb,
  questions_data jsonb,
  doubt_text text,
  ai_recommendation text,
  validation_status text default 'pending' check (validation_status in ('pending', 'validated', 'modified')),
  senior_feedback text,
  validated_at timestamptz
);

-- Index for listing recent cases
create index if not exists idx_cases_created_at on cases (created_at desc);

-- RLS policies (allow all for now — internal app)
alter table cases enable row level security;

create policy "Allow all operations" on cases
  for all
  using (true)
  with check (true);
