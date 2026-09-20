"use client";

import { useAppStore } from "@/lib/store";
import GoalEditor from "@/components/GoalEditor";

export default function ProfilePage() {
  const name = useAppStore(s => s.name);
  const setName = useAppStore(s => s.setName);

  return (
    <div className="space-y-6">
      <header>
        <div className="eyebrow">Profile & settings</div>
        <h1 className="page-title mt-4">Make the app yours</h1>
      </header>

      <section className="app-card p-5 md:p-7">
        <h2 className="section-title">Profile</h2>
        <label className="mt-5 block max-w-lg">
          <span className="mb-2 block text-[14px] font-extrabold text-forest-200">Your name</span>
          <input value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Name shown on your dashboard" />
        </label>
      </section>

      <GoalEditor />

      <section className="app-card p-5 md:p-7">
        <h2 className="section-title">USDA API</h2>
        <p className="muted mt-2">For deployment, store your USDA key in Vercel as <code className="rounded bg-forest-950 px-2 py-1 text-forest-200">USDA_API_KEY</code>. The key stays server-side and is not exposed in the browser.</p>
      </section>

      <section className="app-card p-5 md:p-7">
        <h2 className="section-title">Cloud sync</h2>
        <p className="muted mt-2">Supabase support is scaffolded in this project. The app works immediately with local browser storage; Supabase can be connected later for login and cross-device syncing.</p>
      </section>
    </div>
  );
}
