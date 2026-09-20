"use client";

import { useQuery } from "@tanstack/react-query";
import { imageForFoodName } from "@/lib/images";
import FoodImage from "./FoodImage";
import PortionCalculator from "./PortionCalculator";
import NutritionPills from "./NutritionPills";

function nutrient(data: any, id: number, regex: RegExp) {
  const item = data?.foodNutrients?.find((x: any) => x?.nutrient?.id === id || regex.test(x?.nutrient?.name || ""));
  return Number(item?.amount || 0);
}

export default function USDAFoodDetail({ fdcId }: { fdcId: string }) {
  const q = useQuery({
    queryKey: ["usda-food", fdcId],
    queryFn: async () => {
      const res = await fetch(`/api/usda/food/${fdcId}`);
      if (!res.ok) throw new Error("USDA food failed");
      return res.json();
    }
  });

  if (q.isLoading) return <div className="app-card p-8 text-center text-forest-200">Loading USDA food…</div>;
  if (q.isError || !q.data) return <div className="app-card p-8 text-center text-forest-200">This USDA food could not be loaded.</div>;

  const food = q.data;
  const per100 = {
    calories: nutrient(food, 1008, /energy/i),
    protein: nutrient(food, 1003, /protein/i),
    carbs: nutrient(food, 1005, /carbohydrate/i),
    fat: nutrient(food, 1004, /lipid|fat/i),
    fiber: nutrient(food, 1079, /fiber/i)
  };

  return (
    <div className="space-y-6">
      <section className="app-card overflow-hidden">
        <div className="grid md:grid-cols-[.9fr_1.1fr]">
          <FoodImage src={imageForFoodName(food.description || "food")} alt={food.description || "USDA food"} className="h-[320px] w-full object-cover md:h-full md:min-h-[470px]" />
          <div className="p-6 md:p-9">
            <div className="eyebrow">{food.dataType || "USDA FoodData Central"}</div>
            <h1 className="page-title mt-4">{food.description}</h1>
            {food.brandOwner && <p className="mt-3 text-[15px] font-bold text-forest-300">{food.brandOwner}</p>}
            <p className="mt-5 text-[17px] leading-7 text-forest-200/80">USDA nutrient values below are shown per 100 g. Use the separate calculator to scale them to the amount you actually eat.</p>
            <div className="mt-6">
              <NutritionPills nutrition={per100} />
            </div>
          </div>
        </div>
      </section>
      <PortionCalculator name={food.description || "USDA food"} per100={per100} />
    </div>
  );
}
