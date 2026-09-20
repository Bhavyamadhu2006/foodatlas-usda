import type { Nutrition } from "@/lib/types";

export default function NutritionPills({ nutrition, compact = false }: { nutrition: Nutrition; compact?: boolean }) {
  const items = [
    ["Calories", `${Math.round(nutrition.calories)} kcal`],
    ["Protein", `${nutrition.protein.toFixed(1)} g`],
    ["Carbs", `${nutrition.carbs.toFixed(1)} g`],
    ["Fat", `${nutrition.fat.toFixed(1)} g`],
    ["Fiber", `${nutrition.fiber.toFixed(1)} g`]
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([label, value]) => (
        <div key={label} className={`rounded-full border border-forest-600 bg-forest-800 ${compact ? "px-2.5 py-1.5" : "px-3 py-2"}`}>
          <span className={`${compact ? "text-[11px]" : "text-[12px]"} font-bold text-forest-300/70`}>{label}</span>
          <span className={`${compact ? "ml-1 text-[12px]" : "ml-2 text-[13px]"} font-extrabold text-cream-50`}>{value}</span>
        </div>
      ))}
    </div>
  );
}
