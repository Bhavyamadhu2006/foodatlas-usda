import { notFound } from "next/navigation";
import Link from "next/link";
import { ingredientBySlug } from "@/lib/ingredients";
import NutritionPills from "@/components/NutritionPills";
import PortionCalculator from "@/components/PortionCalculator";

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = ingredientBySlug[slug];
  if (!ingredient) notFound();

  return (
    <div className="space-y-6">
      <Link href="/foods" className="text-[14px] font-extrabold text-forest-300">← Back to foods</Link>

      <section className="app-card overflow-hidden">
        <div className="grid md:grid-cols-[.9fr_1.1fr]">
          <img src={ingredient.image} alt={ingredient.name} className="h-[310px] w-full object-cover md:h-full md:min-h-[480px]" />
          <div className="p-6 md:p-9">
            <div className="eyebrow">{ingredient.category}</div>
            <h1 className="page-title mt-4">{ingredient.name}</h1>
            <p className="mt-5 text-[18px] leading-8 text-forest-200/85">{ingredient.description}</p>
            <div className="mt-6">
              <div className="mb-3 text-[13px] font-extrabold uppercase tracking-[.12em] text-forest-300">Nutrition per 100 g</div>
              <NutritionPills nutrition={ingredient.per100} />
            </div>
            <div className="mt-6 rounded-[20px] border border-forest-600 bg-forest-950/35 p-4">
              <div className="text-[13px] font-extrabold uppercase tracking-[.12em] text-forest-300">Tracking note</div>
              <p className="mt-2 text-[15px] leading-6 text-forest-200/80">{ingredient.notes}</p>
            </div>
          </div>
        </div>
      </section>

      <PortionCalculator name={ingredient.name} per100={ingredient.per100} defaultGrams={100} />
    </div>
  );
}
