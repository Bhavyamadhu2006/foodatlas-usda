import Link from "next/link";
import type { Ingredient } from "@/lib/types";
import NutritionPills from "./NutritionPills";

export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link href={`/ingredients/${ingredient.slug}`} className="app-card-soft group grid overflow-hidden md:grid-cols-[180px_1fr]">
      <img src={ingredient.image} alt="" className="h-52 w-full object-cover md:h-full md:min-h-[220px]" />
      <div className="p-5 md:p-6">
        <div className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-forest-300">{ingredient.category}</div>
        <h3 className="mt-2 font-serif text-[31px] leading-[1.02] text-cream-50">{ingredient.name}</h3>
        <p className="mt-3 text-[16px] leading-6 text-forest-200/80">{ingredient.description}</p>
        <div className="mt-4">
          <NutritionPills nutrition={ingredient.per100} compact />
        </div>
        <div className="mt-4 text-[13px] font-extrabold text-forest-300">Open details & portion calculator →</div>
      </div>
    </Link>
  );
}
