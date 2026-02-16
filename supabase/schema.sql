
-- 1. Create the bookmarks table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  url text not null
);

-- 2. Enable Row Level Security (RLS)
alter table bookmarks enable row level security;

-- 3. Create policies
-- Policy for SELECT: Users can only see their own bookmarks
create policy "Users can view their own bookmarks" on bookmarks
  for select using (auth.uid() = user_id);

-- Policy for INSERT: Users can only insert bookmarks for themselves
create policy "Users can insert their own bookmarks" on bookmarks
  for insert with check (auth.uid() = user_id);

-- Policy for DELETE: Users can only delete their own bookmarks
create policy "Users can delete their own bookmarks" on bookmarks
  for delete using (auth.uid() = user_id);

-- 4. Enable Realtime updates
-- Check if publication exists first to avoid error, usually supabase_realtime exists by default on Supabase projects.
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime for all tables;
commit;
-- OR simpler:
alter publication supabase_realtime add table bookmarks;
