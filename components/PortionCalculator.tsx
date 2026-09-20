"use client";

import type { Nutrition } from "@/lib/types";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";

export default function PortionCalculator({
  name,
  per100,
  defaultGrams = 100
}: {
  name: string;
  per100: Nutrition;
  defaultGrams?: number;
}) {
  const [grams, setGrams] = useState(defaultGrams);
  const addFood = useAppStore(s => s.addFood);

  const scaled = useMemo(() => {
    const factor = grams / 100;
    return {
      calories: per100.calories * factor,
      protein: per100.protein * factor,
      carbs: per100.carbs * factor,
      fat: per100.fat * factor,
      fiber: per100.fiber * factor
    };
  }, [grams, per100]);

  return (
    <section className="app-card p-5 md:p-7">
      <div className="mb-5">
        <div className="eyebrow">Portion calculator</div>
        <h2 className="section-title mt-3">How much are you eating?</h2>
        <p className="muted mt-2">Enter the edible portion in grams. Nutrition updates instantly from the per-100 g values above.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-end">
        <label>
          <span className="mb-2 block text-[14px] font-extrabold text-forest-200">Portion size</span>
          <div className="relative">
            <input
              value={grams}
              onChange={e => setGrams(Math.max(0, Number(e.target.value) || 0))}
              type="number"
              min={0}
              step={1}
              className="input pr-14 text-[22px] font-extrabold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-forest-300">g</span>
          </div>
        </label>

        <div className="rounded-[22px] border border-forest-500/60 bg-forest-800 p-4">
          <div className="text-[13px] font-bold uppercase tracking-[0.11em] text-forest-300">This portion</div>
          <div className="mt-1 font-serif text-[38px] leading-none text-cream-50">{Math.round(scaled.calories)} kcal</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[14px] text-forest-200 sm:grid-cols-4">
            <div><b className="text-cream-50">{scaled.protein.toFixed(1)} g</b><br/>protein</div>
            <div><b className="text-cream-50">{scaled.carbs.toFixed(1)} g</b><br/>carbs</div>
            <div><b className="text-cream-50">{scaled.fat.toFixed(1)} g</b><br/>fat</div>
            <div><b className="text-cream-50">{scaled.fiber.toFixed(1)} g</b><br/>fiber</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[50, 100, 150, 200, 250].map(g => (
          <button key={g} onClick={() => setGrams(g)} className="chip hover:bg-forest-700">{g} g</button>
        ))}
      </div>

      <button
        className="btn-primary mt-5 w-full md:w-auto"
        onClick={() =>
          addFood({
            name,
            grams,
            calories: scaled.calories,
            protein: scaled.protein,
            carbs: scaled.carbs,
            fat: scaled.fat,
            fiber: scaled.fiber
          })
        }
      >
        Add this portion to today
      </button>
    </section>
  );
}
