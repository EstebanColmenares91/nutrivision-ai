import { useMeal } from "@/store/food";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function NutritionSummary() {
  const {
    meal_analysis: { meal_totals },
  } = useMeal();

  return (
    <>
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Nutrition Summary
      </Text>
      <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between mb-4">
          <View className="items-center flex-1">
            <Octicons name="flame" size={20} color="#ef4444" />
            <Text className="text-2xl font-bold text-gray-800 mt-1">
              {meal_totals.calories}
            </Text>
            <Text className="text-sm text-gray-600">Calories</Text>
          </View>
          <View className="items-center flex-1">
            <Octicons name="zap" size={20} color="#3b82f6" />
            <Text className="text-2xl font-bold text-gray-800 mt-1">
              {meal_totals.protein_g}g
            </Text>
            <Text className="text-sm text-gray-600">Protein</Text>
          </View>
          <View className="items-center flex-1">
            <View className="w-5 h-5 bg-yellow-500 rounded mb-1" />
            <Text className="text-2xl font-bold text-gray-800">
              {meal_totals.carbohydrates_g}g
            </Text>
            <Text className="text-sm text-gray-600">Carbs</Text>
          </View>
          <View className="items-center flex-1">
            <View className="w-5 h-5 bg-orange-500 rounded-full mb-1" />
            <Text className="text-2xl font-bold text-gray-800">
              {meal_totals.fats_g}g
            </Text>
            <Text className="text-sm text-gray-600">Fats</Text>
          </View>
        </View>
      </View>
    </>
  );
}
