# Smart Mart (Next.js + Supabase + Tailwind + shadcn/ui)

Smart Mart is a modern e‑commerce frontend built with Next.js App Router, Tailwind CSS, shadcn/ui, and Supabase. The project uses a professional red as the primary brand color and green as secondary/success across components.

## Tech Stack
- Next.js (App Router, SSR)
- Supabase (Database, Auth)
- Tailwind CSS + shadcn/ui
- TypeScript

## Project Structure
- app/
  - layout.tsx: Root layout and global styles
  - page.tsx: Home page
  - globals.css: Tailwind + imported design tokens
- src/
  - components/: UI and app components
  - lib/
    - supabase/
      - client.ts: Browser Supabase client
      - server.ts: Server Supabase client (SSR)
  - hooks/, pages/, etc. (migrated incrementally as needed)
- middleware.ts: Ensures auth session is refreshed (Supabase)
- tailwind.config.ts: Tailwind configuration and theme tokens wiring
- next.config.mjs: Next configuration

## Environment Variables
Create a file named `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Optionally, include other variables as you expand features (e.g., third‑party APIs).

## Getting Started (Local Dev)
1) Install dependencies

```
npm install
```

2) Copy environment template and fill values

```
cp .env.local.example .env.local
# edit .env.local with your Supabase URL and anon key
```

3) Run the dev server

```
npm run dev
```

Open http://localhost:3000 in your browser.

## Supabase Integration
This project uses `@supabase/auth-helpers-nextjs` to manage auth across server and client:
- `middleware.ts` refreshes the session on navigation.
- `src/lib/supabase/server.ts` provides a server client for SSR/route handlers.
- `src/lib/supabase/client.ts` provides a browser client for client components.

Note: The `@supabase/auth-helpers-nextjs` package is currently marked deprecated upstream in favor of `@supabase/ssr`. If you prefer the newer package, we can switch to `@supabase/ssr` with minimal changes.

## Styling and Design Tokens
Tailwind is configured to read styles from `app/**/*.{ts,tsx}` and `src/**/*.{ts,tsx}`. Global CSS includes reusable design tokens:
- Primary: professional red
- Secondary/Success: green
- Accent: deep blue
- Utilities: gradient helpers, glow shadows, charts palette

You can find tokens and CSS utilities in `src/index.css` and they’re imported by `app/globals.css`.

## Scripts
- `npm run dev` — Start Next.js dev server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint with Next.js ESLint config

## Deployment (Vercel)
This project is Vercel‑ready out of the box. Steps:
1) Push your repository to GitHub/GitLab/Bitbucket.
2) Import the repo into Vercel.
3) Set the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4) Deploy — Vercel will detect Next.js and build automatically.

## Migration Notes (from Vite + React)
- Routing is now handled by the App Router under `app/`.
- The previous Tailwind tokens were kept and imported into Next via `app/globals.css`.
- Supabase client initialization has been split into server and browser helpers for SSR.
- Vite configs and scripts have been replaced with Next.js equivalents.

## Roadmap / Next Steps
- Migrate remaining routes/pages from `src/pages` into `app/` segments.
- Introduce protected routes for user dashboards using SSR and middleware.
- Add route‑level code‑splitting patterns and tuning if needed.
- Replace placeholder OpenGraph/Twitter images with branded assets.
- Optional: Switch from `@supabase/auth-helpers-nextjs` to `@supabase/ssr` to align with upstream.

## License
Proprietary — All rights reserved.
