-- Economic Architect OS starter schema for Supabase Postgres.
-- Run in Supabase SQL Editor. Never expose the service_role key to browser code.
create extension if not exists pgcrypto;
create type public.member_role as enum ('member','admin');
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role public.member_role not null default 'member',
  created_at timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id,email,role) values (new.id,new.email,'member') on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- SECURITY DEFINER helper avoids recursive RLS checks when policies need to test admin role.
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.notes (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 title text not null default 'Untitled note', body text not null default '', tags text[] not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.articles (
 id uuid primary key default gen_random_uuid(), author_id uuid not null references auth.users(id) on delete cascade,
 title text not null, slug text not null unique, excerpt text not null default '', body_md text not null default '', status text not null default 'draft' check(status in ('draft','review','published','archived')),
 source_urls text[] not null default '{}', published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.sources (
 id uuid primary key default gen_random_uuid(), name text not null, domain text not null, category text not null,
 description text not null default '', url text not null unique, cadence text not null default 'Reference',
 authority_type text not null default 'secondary', status text not null default 'active' check(status in ('active','review','retired')),
 last_checked_at timestamptz, created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.documents (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null, storage_path text not null unique, mime_type text, size_bytes bigint check(size_bytes is null or size_bytes <= 20971520),
 created_at timestamptz not null default now()
);
create table if not exists public.insight_runs (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 question text not null, goal text not null default '', source_urls text[] not null default '{}', result_md text not null default '', created_at timestamptz not null default now()
);
-- RLS is mandatory on every table reachable by the anon/authenticated roles.
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.articles enable row level security;
alter table public.sources enable row level security;
alter table public.documents enable row level security;
alter table public.insight_runs enable row level security;
drop policy if exists "profile self read" on public.profiles;
create policy "profile self read" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_admin());
drop policy if exists "notes owner all" on public.notes;
create policy "notes owner all" on public.notes for all to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
drop policy if exists "articles author all" on public.articles;
create policy "articles author all" on public.articles for all to authenticated using (author_id=(select auth.uid()) or public.is_admin()) with check (author_id=(select auth.uid()) or public.is_admin());
drop policy if exists "published articles public read" on public.articles;
create policy "published articles public read" on public.articles for select to anon,authenticated using (status='published');
drop policy if exists "sources read authenticated" on public.sources;
create policy "sources read authenticated" on public.sources for select to authenticated using (true);
drop policy if exists "sources admin write" on public.sources;
create policy "sources admin write" on public.sources for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "documents owner all" on public.documents;
create policy "documents owner all" on public.documents for all to authenticated using (owner_id=(select auth.uid()) or public.is_admin()) with check (owner_id=(select auth.uid()) or public.is_admin());
drop policy if exists "insight runs owner all" on public.insight_runs;
create policy "insight runs owner all" on public.insight_runs for all to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
-- Private PDF/document storage. Upload size/type limits should also be configured in Storage settings.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('private-documents','private-documents',false,20971520,array['application/pdf','text/plain','text/markdown'])
on conflict (id) do update set public=false,file_size_limit=20971520,allowed_mime_types=array['application/pdf','text/plain','text/markdown'];
drop policy if exists "private docs user folder read" on storage.objects;
create policy "private docs user folder read" on storage.objects for select to authenticated using (bucket_id='private-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "private docs user folder insert" on storage.objects;
create policy "private docs user folder insert" on storage.objects for insert to authenticated with check (bucket_id='private-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "private docs user folder delete" on storage.objects;
create policy "private docs user folder delete" on storage.objects for delete to authenticated using (bucket_id='private-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
-- After creating your own account, grant admin in the SQL editor using the exact email:
-- update public.profiles set role='admin' where email='YOUR_VERIFIED_EMAIL';
-- Do not expose an endpoint that lets users update their own role.
