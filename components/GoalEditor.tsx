"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppStore } from "@/lib/store";

const schema = z.object({
  calories: z.coerce.number().min(800).max(5000),
  protein: z.coerce.number().min(0).max(400),
  carbs: z.coerce.number().min(0).max(800),
  fat: z.coerce.number().min(0).max(300),
  fiber: z.coerce.number().min(0).max(100)
});

type FormData = z.infer<typeof schema>;

export default function GoalEditor() {
  const goals = useAppStore(s => s.goals);
  const setGoals = useAppStore(s => s.setGoals);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: goals });

  return (
    <form
      className="app-card p-5 md:p-7"
      onSubmit={form.handleSubmit(values => setGoals(values))}
    >
      <h2 className="section-title">Daily nutrition targets</h2>
      <p className="muted mt-2">These are planning targets. You can change them at any time.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["calories", "Calories", "kcal"],
          ["protein", "Protein", "g"],
          ["carbs", "Carbohydrate", "g"],
          ["fat", "Fat", "g"],
          ["fiber", "Fiber", "g"]
        ].map(([key, label, unit]) => (
          <label key={key}>
            <span className="mb-2 block text-[14px] font-extrabold text-forest-200">{label}</span>
            <div className="relative">
              <input {...form.register(key as keyof FormData)} type="number" className="input pr-14" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-forest-300">{unit}</span>
            </div>
          </label>
        ))}
      </div>
      <button className="btn-primary mt-5" type="submit">Save goals</button>
    </form>
  );
}
