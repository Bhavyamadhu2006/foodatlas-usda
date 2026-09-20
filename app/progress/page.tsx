"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import ProgressChart from "@/components/ProgressChart";

export default function ProgressPage() {
  const weights = useAppStore(s => s.weights);
  const completed = useAppStore(s => s.completedWorkouts);
  const addWeight = useAppStore(s => s.addWeight);
  const [weight, setWeight] = useState("");

  return (
    <div className="space-y-6">
      <header>
        <div className="eyebrow">Progress</div>
        <h1 className="page-title mt-4">Small changes add up</h1>
        <p className="mt-4 max-w-[700px] text-[17px] leading-7 text-forest-200/80">Track body weight and workout consistency without turning every day into a judgment.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="app-card p-5"><div className="text-[13px] font-bold text-forest-300">Workout completion</div><div className="mt-2 font-serif text-[40px] text-cream-50">{completed.length}/14</div></div>
        <div className="app-card p-5"><div className="text-[13px] font-bold text-forest-300">Latest weight</div><div className="mt-2 font-serif text-[40px] text-cream-50">{weights.length ? `${weights[weights.length-1].weight} kg` : "—"}</div></div>
        <div className="app-card p-5"><div className="text-[13px] font-bold text-forest-300">Entries</div><div className="mt-2 font-serif text-[40px] text-cream-50">{weights.length}</div></div>
      </section>

      <section className="app-card p-5 md:p-7">
        <h2 className="section-title">Weight trend</h2>
        <div className="mt-5"><ProgressChart data={weights} /></div>
        <form
          className="mt-5 flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            const n = Number(weight);
            if (n > 0) { addWeight(n); setWeight(""); }
          }}
        >
          <input value={weight} onChange={e => setWeight(e.target.value)} className="input min-w-0 flex-1" type="number" step=".1" placeholder="Weight in kg" />
          <button className="btn-primary" type="submit">Add</button>
        </form>
      </section>
    </div>
  );
}
