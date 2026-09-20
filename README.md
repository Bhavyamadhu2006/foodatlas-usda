# My Fitness & Diet — React / Next.js / Tailwind

A deployable Next.js app with:
- React + TypeScript
- Tailwind CSS
- Zustand persisted local state
- TanStack Query
- React Hook Form + Zod
- Recharts
- optional Supabase client scaffold
- server-side USDA FoodData Central proxy
- responsive iPhone + iPad layouts
- installable web-app manifest

## Deploy to Vercel

1. Upload the **contents of this folder** to the root of your GitHub repository.
2. Import the repository into Vercel.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `USDA_API_KEY` = your USDA FoodData Central API key
4. Deploy.

`DEMO_KEY` is used when `USDA_API_KEY` is not configured, but it can be rate limited.

Supabase is optional in this version. The UI works immediately using local browser storage. Add Supabase env vars later if you want account-based cloud sync.

## Important workout note
The included 14-day plan is an original circuit-style strength/conditioning plan. It is not a reproduction of a proprietary paid workout program.

## Mobile install
On iPhone/iPad: Safari → Share → Add to Home Screen.
