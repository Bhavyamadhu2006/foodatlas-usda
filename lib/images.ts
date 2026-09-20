const fallbacks = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=82",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=82"
];

export function imageForFoodName(name: string) {
  const n = name.toLowerCase();
  if (n.includes("almond") || n.includes("peanut") || n.includes("nut butter")) return "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("rice")) return "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("tofu")) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("lentil") || n.includes("bean") || n.includes("chickpea")) return "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("oat")) return "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("yogurt")) return "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("berry") || n.includes("berries")) return "https://images.unsplash.com/photo-1425934398893-310a009a77f9?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("banana")) return "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("avocado")) return "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("egg")) return "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("broccoli")) return "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("potato")) return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("salmon") || n.includes("fish")) return "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("chicken")) return "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=82";
  if (n.includes("tomato")) return "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1000&q=82";
  return fallbacks[Math.abs(name.length) % fallbacks.length];
}
