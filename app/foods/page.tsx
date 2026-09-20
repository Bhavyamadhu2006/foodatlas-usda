import IngredientCard from "@/components/IngredientCard";
import USDAFoodSearch from "@/components/USDAFoodSearch";
import { ingredients } from "@/lib/ingredients";

export default function FoodsPage() {
  return (
    <div className="space-y-7">
      <header>
        <div className="eyebrow">Food & ingredients</div>
        <h1 className="page-title mt-4">Clear nutrition, one food at a time</h1>
        <p className="mt-4 max-w-[760px] text-[17px] leading-7 text-forest-200/80">
          Ingredient cards use larger photos, larger names and easy-to-scan nutrition. The portion calculator lives on each ingredient’s own page so this screen stays clean.
        </p>
      </header>

      <USDAFoodSearch />

      <section>
        <div className="mb-4">
          <div className="eyebrow">Common ingredients</div>
          <h2 className="section-title mt-3">Browse the ingredient library</h2>
        </div>
        <div className="grid gap-4">
          {ingredients.map(ingredient => <IngredientCard key={ingredient.slug} ingredient={ingredient} />)}
        </div>
      </section>
    </div>
  );
}
