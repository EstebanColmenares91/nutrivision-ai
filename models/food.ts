export interface Meal {
  meal_analysis: Food;
}

export interface Food {
  dish_name: string;
  items: Item[];
  meal_totals: Totals;
  nutritional_highlights: NutritionalHighlights;
}

export interface Item {
  name: string;
  confidence: number;
  estimated_weight_grams: number;
  nutrition_per_100g: NutritionPer100G;
  calculated_totals: Totals;
  common_allergens: string[];
  health_score: number;
  portion_description: string;
}

export interface Totals {
  calories: number;
  protein_g: number;
  carbs_g?: number;
  fats_g: number;
  carbohydrates_g?: number;
}

export interface NutritionPer100G {
  calories: number;
  protein_g: number;
  carbohydrates_g: number;
  sugars_g: number;
  fiber_g: number;
  fats_g: number;
}

export interface NutritionalHighlights {
  highest_vitamin: Highest;
  highest_mineral: Highest;
}

export interface Highest {
  name: string;
  amount: number;
  unit: string;
  daily_value_percentage: number;
}
