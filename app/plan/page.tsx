import RecipeCard from "@/components/RecipeCard";
import { recipeBySlug, sevenDayPlan } from "@/lib/recipes";

export default function PlanPage() {
  return (
    <div className="space-y-7">
      <header>
        <div className="eyebrow">7-day nutrition plan</div>
        <h1 className="page-title mt-4">My plan</h1>
        <p className="mt-4 max-w-[720px] text-[17px] leading-7 text-forest-200/80">
          Tap any recipe to open the full preparation, ingredient list and per-serving nutrition. Tap an ingredient inside a recipe to open its own page and portion calculator.
        </p>
      </header>

      {sevenDayPlan.map(day => (
        <section key={day.day}>
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-forest-500 bg-forest-800 font-serif text-[21px] text-cream-50">{day.day}</div>
            <div>
              <div className="text-[12px] font-extrabold uppercase tracking-[.12em] text-forest-300">Day {day.day}</div>
              <h2 className="font-serif text-[28px] text-cream-50">{day.day === 1 ? "Start simple" : day.day === 7 ? "Finish strong" : "Balanced & satisfying"}</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {day.recipes.map(slug => <RecipeCard key={slug} recipe={recipeBySlug[slug]} day={day.day} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
