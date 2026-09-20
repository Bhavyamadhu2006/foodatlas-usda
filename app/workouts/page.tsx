"use client";

import { workouts } from "@/lib/workouts";
import { useAppStore } from "@/lib/store";

export default function WorkoutsPage() {
  const completed = useAppStore(s => s.completedWorkouts);
  const toggle = useAppStore(s => s.toggleWorkout);

  return (
    <div className="space-y-7">
      <header>
        <div className="eyebrow">Repeatable 14-day cycle</div>
        <h1 className="page-title mt-4">Workout plan</h1>
        <p className="mt-4 max-w-[760px] text-[17px] leading-7 text-forest-200/80">
          A complete original circuit-style strength, cardio and recovery plan designed to repeat every two weeks.
        </p>
      </header>

      {[1, 2].map(week => (
        <section key={week}>
          <div className="mb-4">
            <div className="eyebrow">Week {week}</div>
            <h2 className="section-title mt-3">{week === 1 ? "Foundation & technique" : "Progression & consistency"}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {workouts.filter(w => w.week === week).map(w => {
              const done = completed.includes(w.day);
              return (
                <article key={w.day} className="app-card overflow-hidden">
                  <img src={w.image} alt="" className="h-52 w-full object-cover" />
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[12px] font-extrabold uppercase tracking-[.12em] text-forest-300">Day {w.day} • {w.type}</div>
                        <h3 className="mt-2 font-serif text-[29px] leading-tight text-cream-50">{w.name}</h3>
                        <p className="mt-2 text-[14px] text-forest-200/70">{w.minutes} min</p>
                      </div>
                      <button onClick={() => toggle(w.day)} className={done ? "btn-primary px-4 py-2 text-[13px]" : "btn-secondary px-4 py-2 text-[13px]"}>
                        {done ? "✓ Done" : "Mark done"}
                      </button>
                    </div>
                    <p className="mt-4 text-[15px] leading-6 text-forest-200/80">{w.summary}</p>
                    <ol className="mt-5 space-y-3">
                      {w.instructions.map((step, i) => (
                        <li key={step} className="grid grid-cols-[32px_1fr] gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-forest-700 text-[13px] font-extrabold text-cream-50">{i + 1}</div>
                          <p className="text-[15px] leading-6 text-forest-200/85">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
