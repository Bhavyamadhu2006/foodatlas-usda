import Link from "next/link";
import type { Recipe } from "@/lib/types";
import NutritionPills from "./NutritionPills";

export default function RecipeCard({ recipe, day }: { recipe: Recipe; day?: number }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="app-card-soft group overflow-hidden transition hover:-translate-y-0.5 hover:border-forest-400/80">
      <img src={recipe.image} alt="" className="h-48 w-full object-cover md:h-56" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-forest-300">{day ? `Day ${day} • ` : ""}{recipe.meal}</span>
          <span className="text-[12px] font-bold text-forest-200/65">{recipe.prepMinutes + recipe.cookMinutes} min</span>
        </div>
        <h3 className="mt-2 font-serif text-[27px] leading-[1.06] text-cream-50">{recipe.name}</h3>
        <p className="mt-3 text-[15px] leading-6 text-forest-200/80">{recipe.description}</p>
        <div className="mt-4">
          <NutritionPills nutrition={recipe.nutrition} compact />
        </div>
      </div>
    </Link>
  );
}
