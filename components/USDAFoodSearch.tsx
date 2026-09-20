"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { imageForFoodName } from "@/lib/images";

type USDAFood = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
  foodNutrients?: { nutrientId?: number; nutrientName?: string; unitName?: string; value?: number }[];
};

function nutrient(food: USDAFood, id: number, regex: RegExp) {
  const n = food.foodNutrients?.find(n => n.nutrientId === id || regex.test(n.nutrientName || ""));
  return Number(n?.value || 0);
}

export default function USDAFoodSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const result = useQuery({
    queryKey: ["usda-search", query],
    enabled: query.length > 1,
    queryFn: async () => {
      const res = await fetch(`/api/usda/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("USDA search failed");
      return res.json() as Promise<{ foods: USDAFood[] }>;
    }
  });

  return (
    <section className="app-card p-5 md:p-7">
      <div className="eyebrow">USDA FoodData Central</div>
      <h2 className="section-title mt-3">Search the USDA database</h2>
      <p className="muted mt-2">Search any food. Open a result to get its own page with a separate gram-based portion calculator.</p>

      <form
        className="mt-5 flex gap-2"
        onSubmit={e => { e.preventDefault(); setQuery(input.trim()); }}
      >
        <input className="input min-w-0 flex-1" value={input} onChange={e => setInput(e.target.value)} placeholder="almond butter, rice, tofu, salmon…" />
        <button className="btn-primary px-5" type="submit">Search</button>
      </form>

      <div className="mt-5 space-y-3">
        {result.isLoading && <div className="rounded-[20px] border border-dashed border-forest-600 p-6 text-center text-forest-200/70">Searching USDA…</div>}
        {result.isError && <div className="rounded-[20px] border border-dashed border-forest-600 p-6 text-center text-forest-200/70">USDA search is unavailable or rate limited. Add a USDA_API_KEY in Vercel for reliable use.</div>}
        {result.data?.foods?.map(food => {
          const kcal = nutrient(food, 1008, /energy/i);
          const protein = nutrient(food, 1003, /protein/i);
          const carbs = nutrient(food, 1005, /carbohydrate/i);
          const fat = nutrient(food, 1004, /lipid|fat/i);
          return (
            <Link
              href={`/foods/usda/${food.fdcId}`}
              key={food.fdcId}
              className="grid overflow-hidden rounded-[22px] border border-forest-600 bg-forest-950/30 sm:grid-cols-[140px_1fr_auto]"
            >
              <img src={imageForFoodName(food.description)} alt="" className="h-44 w-full object-cover sm:h-full" />
              <div className="p-5">
                <div className="text-[12px] font-extrabold uppercase tracking-[.12em] text-forest-300">{food.dataType || "USDA food"}</div>
                <h3 className="mt-2 font-serif text-[29px] leading-[1.04] text-cream-50">{food.description}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip">Protein {protein.toFixed(1)} g</span>
                  <span className="chip">Carbs {carbs.toFixed(1)} g</span>
                  <span className="chip">Fat {fat.toFixed(1)} g</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-forest-700 p-5 sm:block sm:border-l sm:border-t-0 sm:text-right">
                <div>
                  <div className="font-serif text-[32px] leading-none text-cream-50">{Math.round(kcal)}</div>
                  <div className="mt-1 text-[12px] font-bold text-forest-300">kcal / 100 g</div>
                </div>
                <div className="text-[13px] font-extrabold text-forest-300 sm:mt-8">Open →</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
