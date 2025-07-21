import { Meal } from "@/models/food";
import { create } from "zustand";

interface MealState {
  meal_analysis: Meal;
  updateMeal: (newMeal: Meal) => void;
}

export const useStore = create<MealState>()((set) => ({
  meal_analysis: {} as Meal,
  updateMeal: (newMeal) => set({ meal_analysis: newMeal }),
}));
