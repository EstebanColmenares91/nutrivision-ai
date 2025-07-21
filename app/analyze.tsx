import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

const mockNutritionData = {
  dish_name: "Salmon and Roasted Vegetable Salad",
  items: [
    {
      name: "Salmon",
      confidence: 0.95,
      estimated_weight_grams: 150,
      nutrition_per_100g: {
        calories: 208,
        protein_g: 20,
        carbohydrates_g: 0,
        sugars_g: 0,
        fiber_g: 0,
        fats_g: 13,
      },
      calculated_totals: {
        calories: 312,
        protein_g: 30,
        carbs_g: 0,
        fats_g: 19.5,
      },
      common_allergens: ["Fish"],
      health_score: 8,
      portion_description: "1 fillet",
    },
    {
      name: "Lettuce",
      confidence: 0.9,
      estimated_weight_grams: 50,
      nutrition_per_100g: {
        calories: 15,
        protein_g: 1.4,
        carbohydrates_g: 2.2,
        sugars_g: 0.8,
        fiber_g: 1.2,
        fats_g: 0.2,
      },
      calculated_totals: {
        calories: 7.5,
        protein_g: 0.7,
        carbs_g: 1.1,
        fats_g: 0.1,
      },
      common_allergens: [],
      health_score: 9,
      portion_description: "1 cup",
    },
    {
      name: "Broccoli",
      confidence: 0.85,
      estimated_weight_grams: 75,
      nutrition_per_100g: {
        calories: 34,
        protein_g: 2.8,
        carbohydrates_g: 6.6,
        sugars_g: 1.7,
        fiber_g: 2.6,
        fats_g: 0.4,
      },
      calculated_totals: {
        calories: 25.5,
        protein_g: 2.1,
        carbs_g: 4.95,
        fats_g: 0.3,
      },
      common_allergens: [],
      health_score: 8,
      portion_description: "1/2 cup florets",
    },
    {
      name: "Cauliflower",
      confidence: 0.8,
      estimated_weight_grams: 60,
      nutrition_per_100g: {
        calories: 25,
        protein_g: 1.9,
        carbohydrates_g: 5,
        sugars_g: 1.9,
        fiber_g: 2,
        fats_g: 0.3,
      },
      calculated_totals: {
        calories: 15,
        protein_g: 1.14,
        carbs_g: 3,
        fats_g: 0.18,
      },
      common_allergens: [],
      health_score: 8,
      portion_description: "1/2 cup florets",
    },
    {
      name: "Zucchini",
      confidence: 0.8,
      estimated_weight_grams: 50,
      nutrition_per_100g: {
        calories: 17,
        protein_g: 1.2,
        carbohydrates_g: 3.1,
        sugars_g: 2.5,
        fiber_g: 1,
        fats_g: 0.3,
      },
      calculated_totals: {
        calories: 8.5,
        protein_g: 0.6,
        carbs_g: 1.55,
        fats_g: 0.15,
      },
      common_allergens: [],
      health_score: 8,
      portion_description: "1/2 cup diced",
    },
    {
      name: "Red Bell Pepper",
      confidence: 0.85,
      estimated_weight_grams: 40,
      nutrition_per_100g: {
        calories: 31,
        protein_g: 1,
        carbohydrates_g: 6,
        sugars_g: 4,
        fiber_g: 2.1,
        fats_g: 0.3,
      },
      calculated_totals: {
        calories: 12.4,
        protein_g: 0.4,
        carbs_g: 2.4,
        fats_g: 0.12,
      },
      common_allergens: [],
      health_score: 8,
      portion_description: "1/4 cup diced",
    },
    {
      name: "Almonds",
      confidence: 0.75,
      estimated_weight_grams: 10,
      nutrition_per_100g: {
        calories: 579,
        protein_g: 21.2,
        carbohydrates_g: 21.6,
        sugars_g: 4.4,
        fiber_g: 12.5,
        fats_g: 49.9,
      },
      calculated_totals: {
        calories: 57.9,
        protein_g: 2.12,
        carbs_g: 2.16,
        fats_g: 4.99,
      },
      common_allergens: ["Nuts"],
      health_score: 7,
      portion_description: "1 tbsp slivered",
    },
    {
      name: "Parmesan Cheese",
      confidence: 0.7,
      estimated_weight_grams: 5,
      nutrition_per_100g: {
        calories: 431,
        protein_g: 38,
        carbohydrates_g: 4.1,
        sugars_g: 1,
        fiber_g: 0,
        fats_g: 29,
      },
      calculated_totals: {
        calories: 21.55,
        protein_g: 1.9,
        carbs_g: 0.205,
        fats_g: 1.45,
      },
      common_allergens: ["Dairy"],
      health_score: 6,
      portion_description: "1 tsp grated",
    },
  ],
  meal_totals: {
    calories: 458.45,
    protein_g: 38.96,
    carbohydrates_g: 15.365,
    fats_g: 26.79,
  },
  nutritional_highlights: {
    highest_vitamin: {
      name: "Vitamin C",
      amount: 89.2,
      unit: "mg",
      daily_value_percentage: 99,
    },
    highest_mineral: {
      name: "Selenium",
      amount: 30.5,
      unit: "mcg",
      daily_value_percentage: 55,
    },
  },
};

export default function AnalysisScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Photo and Dish Info */}
        <Animated.View entering={FadeInUp.delay(200)} className="p-4">
          <View className="bg-gray-100 rounded-2xl mb-4 overflow-hidden">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-64"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 p-4">
              <Text className="text-white text-xl font-bold mb-1">
                {mockNutritionData.dish_name}
              </Text>
              {/* <Text className="text-white/80 text-sm">
                {mockNutritionData.portionDescription}
              </Text> */}
            </View>
          </View>

          {/* Health Score */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Feather name="award" size={20} color="#10b981" />
                <Text className="text-lg font-semibold text-gray-800 ml-2">
                  Health Score
                </Text>
              </View>
              {/* <View className="flex-row items-center">
                <Text
                  className={`text-2xl font-bold mr-2 ${getHealthScoreColor(mockNutritionData.healthScore)}`}
                >
                  {mockNutritionData.healthScore}
                </Text>
                <View
                  className={`w-12 h-12 rounded-full ${getHealthScoreBg(mockNutritionData.healthScore)} items-center justify-center`}
                >
                  <Text className="text-white font-bold">A+</Text>
                </View>
              </View> */}
            </View>
          </View>
        </Animated.View>

        {/* Nutrition Summary */}
        <Animated.View entering={FadeInUp.delay(300)} className="px-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Nutrition Summary
          </Text>
          <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4">
            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1">
                <Octicons name="flame" size={20} color="#ef4444" />
                <Text className="text-2xl font-bold text-gray-800 mt-1">
                  {mockNutritionData.meal_totals.calories}
                </Text>
                <Text className="text-sm text-gray-600">Calories</Text>
              </View>
              <View className="items-center flex-1">
                <Octicons name="zap" size={20} color="#3b82f6" />
                <Text className="text-2xl font-bold text-gray-800 mt-1">
                  {mockNutritionData.meal_totals.protein_g}g
                </Text>
                <Text className="text-sm text-gray-600">Protein</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-5 h-5 bg-yellow-500 rounded mb-1" />
                <Text className="text-2xl font-bold text-gray-800">
                  {mockNutritionData.meal_totals.carbohydrates_g}g
                </Text>
                <Text className="text-sm text-gray-600">Carbs</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-5 h-5 bg-orange-500 rounded-full mb-1" />
                <Text className="text-2xl font-bold text-gray-800">
                  {mockNutritionData.meal_totals.fats_g}g
                </Text>
                <Text className="text-sm text-gray-600">Fats</Text>
              </View>
            </View>
          </View>

          {/* Top Nutrients */}
          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1 bg-green-50 rounded-xl p-3">
              <Text className="text-green-700 font-semibold text-xs mb-1">
                HIGHEST VITAMIN
              </Text>
              <Text className="text-green-800 font-bold">
                {mockNutritionData.nutritional_highlights.highest_vitamin.name}
              </Text>
              <Text className="text-green-700 text-sm">
                {
                  mockNutritionData.nutritional_highlights.highest_vitamin
                    .amount
                }
                {mockNutritionData.nutritional_highlights.highest_vitamin.unit}(
                {
                  mockNutritionData.nutritional_highlights.highest_vitamin
                    .daily_value_percentage
                }
                % DV)
              </Text>
            </View>
            <View className="flex-1 bg-purple-50 rounded-xl p-3">
              <Text className="text-purple-700 font-semibold text-xs mb-1">
                HIGHEST MINERAL
              </Text>
              <Text className="text-purple-800 font-bold">
                {mockNutritionData.nutritional_highlights.highest_mineral.name}
              </Text>
              <Text className="text-purple-700 text-sm">
                {
                  mockNutritionData.nutritional_highlights.highest_mineral
                    .amount
                }
                {mockNutritionData.nutritional_highlights.highest_mineral.unit}(
                {
                  mockNutritionData.nutritional_highlights.highest_mineral
                    .daily_value_percentage
                }
                % DV)
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Ingredients Breakdown */}
        <Animated.View entering={FadeInUp.delay(400)} className="px-4 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Ingredients Breakdown
          </Text>
          {mockNutritionData.items.map((ingredient, index) => (
            <Animated.View
              key={index}
              entering={SlideInRight.delay(500 + index * 100)}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    {ingredient.name}
                  </Text>
                  {/* <Text className="text-gray-600 text-sm">
                    {ingredient.weight}g estimated
                  </Text> */}
                </View>
                <View
                  className={`px-2 py-1 rounded-full ${getHealthScoreBg(ingredient.health_score)}`}
                >
                  <Text className="text-white text-xs font-semibold">
                    {ingredient.health_score}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 rounded-lg p-3 mb-2">
                <Text className="text-xs text-gray-600 mb-2">
                  NUTRITION PER 100G
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-gray-700 text-sm">
                    {ingredient.calculated_totals.calories} cal
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    {ingredient.calculated_totals.protein_g}g protein
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    {ingredient.calculated_totals.carbs_g}g carbs
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    {ingredient.calculated_totals.fats_g}g fat
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Feather name="alert-triangle" size={16} color="#f59e0b" />
                <Text className="text-amber-600 text-sm ml-1">
                  {ingredient.common_allergens.join(", ")}
                </Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
