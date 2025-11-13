-- Create activities table
create table if not exists public.activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  type text not null,
  start_time timestamptz not null,
  end_time timestamptz,
  duration integer,
  amount integer,
  unit text,
  diaper_type text,
  notes text,
  activity_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.activities enable row level security;

-- Create policies
create policy "Users can view their own activities"
  on public.activities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on public.activities for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own activities"
  on public.activities for update
  using (auth.uid() = user_id);

create policy "Users can delete their own activities"
  on public.activities for delete
  using (auth.uid() = user_id);

-- Create index for better performance
create index if not exists activities_user_id_idx on public.activities(user_id);
create index if not exists activities_type_idx on public.activities(type);
create index if not exists activities_start_time_idx on public.activities(start_time);
