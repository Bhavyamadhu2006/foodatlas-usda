type FoodImageRule = {
  test: (name: string) => boolean;
  url: string;
};

/**
 * Curated visual mapping for common USDA search terms.
 * We intentionally return null when we do not have a reasonably matching image,
 * rather than showing an unrelated generic salad photo.
 */
const foodImageRules: FoodImageRule[] = [
  {
    test: n => n.includes("soy milk") || n.includes("soymilk") || n.includes("soy beverage"),
    url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("almond milk") || n.includes("almond beverage"),
    url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("oat milk") || n.includes("oat beverage"),
    url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("milk"),
    url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("tofu"),
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("tempeh"),
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("rice"),
    url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("quinoa"),
    url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("oat"),
    url: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("yogurt"),
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("almond") || n.includes("peanut") || n.includes("nut butter"),
    url: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("berry") || n.includes("berries") || n.includes("strawberry") || n.includes("blueberry"),
    url: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("banana"),
    url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("avocado"),
    url: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("egg"),
    url: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("broccoli"),
    url: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("spinach") || n.includes("leafy green"),
    url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("potato"),
    url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("tomato"),
    url: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("cucumber"),
    url: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("bell pepper") || n.includes("sweet pepper"),
    url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("chickpea") || n.includes("garbanzo"),
    url: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("lentil"),
    url: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("black bean") || n.includes("kidney bean") || n.includes("bean"),
    url: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("salmon") || n.includes("fish"),
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=82"
  },
  {
    test: n => n.includes("chicken"),
    url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=82"
  }
];

export function imageForFoodName(name: string): string | null {
  const normalized = name.toLowerCase().replace(/[(),]/g, " ").replace(/\s+/g, " ").trim();
  return foodImageRules.find(rule => rule.test(normalized))?.url ?? null;
}
