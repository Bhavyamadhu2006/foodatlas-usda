"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { recipeBySlug, sevenDayPlan } from "@/lib/recipes";

export default function PlanPage() {
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const sections = sevenDayPlan
      .map(day => document.getElementById(`day-${day.day}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          const day = Number(visible.target.id.replace("day-", ""));
          if (day) setActiveDay(day);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5]
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function jumpToDay(day: number) {
    setActiveDay(day);
    const section = document.getElementById(`day-${day}`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-7">
      <header>
        <div className="eyebrow">7-day nutrition plan</div>
        <h1 className="page-title mt-4">My plan</h1>
        <p className="mt-4 max-w-[720px] text-[17px] leading-7 text-forest-200/80">
          Tap a day below to jump straight to it. Tap any recipe for the full preparation,
          ingredients and per-serving nutrition.
        </p>
      </header>

      <div className="sticky top-[76px] z-30 -mx-1 rounded-[22px] border border-forest-600/80 bg-forest-950/95 p-2.5 shadow-xl shadow-black/20 backdrop-blur-xl lg:top-4">
        <div className="mb-2 px-1 text-[12px] font-extrabold uppercase tracking-[.12em] text-forest-300">
          Jump to day
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {sevenDayPlan.map(day => {
            const active = activeDay === day.day;
            return (
              <button
                key={day.day}
                type="button"
                onClick={() => jumpToDay(day.day)}
                aria-label={`Jump to day ${day.day}`}
                aria-pressed={active}
                className={`grid min-h-[48px] place-items-center rounded-[15px] border text-[17px] font-extrabold transition ${
                  active
                    ? "border-forest-300 bg-forest-500 text-forest-950 shadow-lg shadow-black/15"
                    : "border-forest-700 bg-forest-850 text-forest-200 active:bg-forest-700"
                }`}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      </div>

      {sevenDayPlan.map(day => (
        <section
          id={`day-${day.day}`}
          key={day.day}
          className="scroll-mt-[165px] lg:scroll-mt-[95px]"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest-500 bg-forest-800 font-serif text-[22px] text-cream-50">
                {day.day}
              </div>

              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-[.12em] text-forest-300">
                  Day {day.day}
                </div>
                <h2 className="font-serif text-[29px] text-cream-50">
                  {day.day === 1
                    ? "Start simple"
                    : day.day === 7
                      ? "Finish strong"
                      : "Balanced & satisfying"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hidden rounded-full border border-forest-600 bg-forest-850 px-3 py-2 text-[12px] font-extrabold text-forest-300 sm:inline-flex"
            >
              Top ↑
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {day.recipes.map(slug => (
              <RecipeCard key={slug} recipe={recipeBySlug[slug]} day={day.day} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
