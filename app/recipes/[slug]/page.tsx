import { notFound } from "next/navigation";
import Link from "next/link";
import { recipeBySlug } from "@/lib/recipes";
import { ingredientBySlug } from "@/lib/ingredients";
import NutritionPills from "@/components/NutritionPills";

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipeBySlug[slug];
  if (!recipe) notFound();

  return (
    <div className="space-y-6">
      <Link href="/plan" className="text-[14px] font-extrabold text-forest-300">← Back to my plan</Link>

      <section className="app-card overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="h-[300px] w-full object-cover md:h-[430px]" />
        <div className="p-6 md:p-9">
          <div className="eyebrow">{recipe.meal} • {recipe.prepMinutes + recipe.cookMinutes} min</div>
          <h1 className="page-title mt-4">{recipe.name}</h1>
          <p className="mt-4 max-w-[780px] text-[18px] leading-8 text-forest-200/85">{recipe.description}</p>
          <div className="mt-5">
            <NutritionPills nutrition={recipe.nutrition} />
          </div>
          <div className="mt-3 text-[13px] text-forest-300/70">Nutrition shown per serving • {recipe.servings} serving{recipe.servings === 1 ? "" : "s"}</div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <section className="app-card p-5 md:p-7">
          <div className="eyebrow">Ingredients</div>
          <h2 className="section-title mt-3">What you’ll need</h2>
          <p className="muted mt-2">Tap an ingredient for its full nutrition page and gram-based portion calculator.</p>

          <div className="mt-5 space-y-3">
            {recipe.ingredients.map(item => {
              const ingredient = ingredientBySlug[item.slug];
              return (
                <Link key={item.slug} href={`/ingredients/${item.slug}`} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-[18px] border border-forest-600 bg-forest-950/35 p-3 transition hover:border-forest-400">
                  <img src={ingredient?.image} alt="" className="h-[72px] w-[72px] rounded-[15px] object-cover" />
                  <div>
                    <div className="text-[18px] font-extrabold text-cream-50">{ingredient?.name ?? item.slug}</div>
                    <div className="mt-1 text-[13px] leading-5 text-forest-200/70">{ingredient?.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[17px] font-extrabold text-cream-50">{item.amount} {item.unit}</div>
                    <div className="mt-1 text-[12px] font-bold text-forest-300">Details →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="app-card p-5 md:p-7">
          <div className="eyebrow">Preparation</div>
          <h2 className="section-title mt-3">How to make it</h2>
          <ol className="mt-6 space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[42px_1fr] gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 font-serif text-[20px] text-cream-50">{index + 1}</div>
                <p className="pt-1 text-[17px] leading-7 text-forest-200/90">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 rounded-[20px] border border-forest-600 bg-forest-950/35 p-4">
            <div className="text-[13px] font-extrabold uppercase tracking-[.12em] text-forest-300">Timing</div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div><b className="text-[22px] text-cream-50">{recipe.prepMinutes} min</b><div className="text-[13px] text-forest-300/70">prep</div></div>
              <div><b className="text-[22px] text-cream-50">{recipe.cookMinutes} min</b><div className="text-[13px] text-forest-300/70">cook</div></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
