
# Smart Bookmark App

A simple, real-time bookmark manager built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.

## Features

- **Google Authentication**: Sign up and log in securely with Google.
- **Private Bookmarks**: Row Level Security (RLS) ensures users can only see their own bookmarks.
- **Real-time Updates**: Add or delete a bookmark in one tab, and it updates instantly in all other tabs.
- **Responsive UI**: Beautiful, modern interface with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Google OAuth)
- **Realtime**: Supabase Realtime
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Getting Started

### 1. Requirements

- Node.js 18+
- A Supabase account

### 2. Setup Supabase

1. Create a new Supabase project.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy and run the SQL from `supabase/schema.sql` to create the table and policies.
4. Go to **Authentication -> Providers** and enable **Google**.
   - You will need a Google Cloud Project with OAuth credentials.
   - Add the Authorized Redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push this code to a handy GitHub repository.
2. Import the project in Vercel.
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in Vercel.
4. Deploy!

## Problems & Solutions

### 1. Next.js 15 Cookie Handling (Async)
**Problem**: In Next.js 15, `cookies()` is asynchronous, which broke the standard synchronous `createServerClient` pattern provided in older documentation.
**Solution**: I updated `src/lib/supabase/server.ts` to be an async function (`createClient`) that awaits `cookies()` before initializing the Supabase client. This ensures compatibility with the new Next.js strict mode.

### 2. Real-time Subscription Filtering
**Problem**: Subscribing to generic database changes (`*`) would expose all events to the client, potentially revealing other users' data (even if RLS blocks the initial fetch, realtime events can be tricky).
**Solution**: I used explicit filtering in the subscription: `filter: 'user_id=eq.${userId}'`. Combined with Row Level Security (RLS) on the database, this guarantees that users only receive events relevant to them.

### 3. Middleware Session Management
**Problem**: Maintaining the auth session across server and client components while handling token refreshes.
**Solution**: Implemented a robust middleware (`src/lib/supabase/middleware.ts`) that refreshes the session on every request by creating a Supabase client and updating cookies on the response object. This prevents users from being logged out unexpectedly.

### 4. Tailwind v4 Configuration
**Problem**: The project was initialized with the latest Tailwind v4, which uses a new `@import "tailwindcss";` syntax instead of the traditional directives.
**Solution**: Adapted the CSS structure to respect the new v4 format while ensuring custom styles and component classes work seamlessly.
