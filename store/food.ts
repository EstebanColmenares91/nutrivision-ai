import { Food } from "@/models/food";
import { create } from "zustand";

interface MealState {
  meal_analysis: Food;
  updateMeal: (newMeal: Food) => void;
}

export const useMeal = create<MealState>()((set) => ({
  meal_analysis: {} as Food,
  updateMeal: (newMeal) => set({ meal_analysis: newMeal }),
}));
