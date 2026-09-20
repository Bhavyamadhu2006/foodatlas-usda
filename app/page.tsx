"use client";

import Link from "next/link";
import { useMemo } from "react";
import { sevenDayPlan, recipeBySlug } from "@/lib/recipes";
import { workouts } from "@/lib/workouts";
import { useAppStore } from "@/lib/store";
import RecipeCard from "@/components/RecipeCard";

export default function HomePage() {
  const name = useAppStore(s => s.name);
  const goals = useAppStore(s => s.goals);
  const logs = useAppStore(s => s.logs);
  const completed = useAppStore(s => s.completedWorkouts);

  const totals = useMemo(() => logs.reduce((a, x) => ({
    calories: a.calories + x.calories,
    protein: a.protein + x.protein,
    carbs: a.carbs + x.carbs,
    fat: a.fat + x.fat,
    fiber: a.fiber + x.fiber
  }), { calories:0, protein:0, carbs:0, fat:0, fiber:0 }), [logs]);

  const dayIndex = (new Date().getDay() + 6) % 7;
  const today = sevenDayPlan[dayIndex];
  const todayRecipes = today.recipes.map(slug => recipeBySlug[slug]);
  const nextWorkout = workouts.find(x => !completed.includes(x.day)) ?? workouts[0];
  const remaining = Math.max(0, goals.calories - totals.calories);

  return (
    <div className="space-y-6">
      <section className="app-card relative overflow-hidden p-6 md:p-9">
        <div className="absolute -right-10 -top-12 h-64 w-64 rounded-full border border-forest-500/20" />
        <div className="absolute right-8 top-10 text-[72px] text-forest-400/15">❧</div>
        <div className="relative max-w-[650px]">
          <div className="eyebrow">Nourish • Move • Thrive</div>
          <h1 className="page-title mt-5">Good morning,<br/><span className="text-forest-300">{name || "friend"}</span></h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-7 text-forest-200/80">
            Your food, portions, recipes, workout cycle and progress — in one calm place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/plan" className="btn-primary">Open my plan →</Link>
            <Link href="/foods" className="btn-secondary">Search foods</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
        <div className="app-card p-5 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="eyebrow">Today's nutrition</div>
              <h2 className="section-title mt-3">Calorie balance</h2>
            </div>
            <div className="text-right">
              <div className="font-serif text-[44px] leading-none text-cream-50">{Math.round(remaining)}</div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-[.12em] text-forest-300">kcal remaining</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Calories", totals.calories, goals.calories, "kcal"],
              ["Protein", totals.protein, goals.protein, "g"],
              ["Carbs", totals.carbs, goals.carbs, "g"],
              ["Fiber", totals.fiber, goals.fiber, "g"]
            ].map(([label, value, target, unit]) => {
              const pct = Math.min(100, Number(value) / Number(target) * 100);
              return (
                <div key={String(label)} className="rounded-[20px] border border-forest-600 bg-forest-950/35 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-bold text-forest-300">{label}</div>
                      <div className="mt-1 text-[24px] font-extrabold text-cream-50">{Math.round(Number(value))} <span className="text-[13px] text-forest-300">{unit}</span></div>
                    </div>
                    <div className="text-[12px] text-forest-300/70">of {target}</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-forest-400 to-forest-300" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Link href="/workouts" className="app-card overflow-hidden">
          <img src={nextWorkout.image} alt="" className="h-48 w-full object-cover" />
          <div className="p-5">
            <div className="eyebrow">Next workout • Day {nextWorkout.day}</div>
            <h2 className="mt-3 font-serif text-[30px] leading-tight text-cream-50">{nextWorkout.name}</h2>
            <p className="muted mt-2">{nextWorkout.minutes} min • {nextWorkout.type}</p>
          </div>
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">My plan • Day {today.day}</div>
            <h2 className="section-title mt-3">Today's recipes</h2>
          </div>
          <Link href="/plan" className="text-[14px] font-extrabold text-forest-300">See 7 days →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {todayRecipes.map(recipe => <RecipeCard key={recipe.slug} recipe={recipe} />)}
        </div>
      </section>
    </div>
  );
}
