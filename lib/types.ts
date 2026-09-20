export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

export type Ingredient = {
  slug: string;
  name: string;
  description: string;
  image: string;
  per100: Nutrition;
  category: string;
  notes: string;
};

export type RecipeIngredient = {
  slug: string;
  amount: number;
  unit: string;
  note?: string;
};

export type Recipe = {
  slug: string;
  name: string;
  meal: "Breakfast" | "Lunch" | "Dinner";
  description: string;
  image: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  nutrition: Nutrition;
  ingredients: RecipeIngredient[];
  steps: string[];
};

export type WorkoutDay = {
  day: number;
  week: 1 | 2;
  type: string;
  name: string;
  minutes: number;
  image: string;
  summary: string;
  instructions: string[];
};
