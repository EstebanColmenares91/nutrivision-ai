import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import DishInfo from "@/modules/analyze/components/DishInfo";
import IngredientsList from "@/modules/analyze/components/IngredientsList";
import NutritionSummary from "@/modules/analyze/components/NutritionSummary";
import { useMeal } from "@/store/food";

export default function AnalysisScreen() {
  const {
    meal_analysis: { nutritional_highlights },
  } = useMeal();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <DishInfo />

        <Animated.View entering={FadeInUp.delay(300)} className="px-4 mb-4">
          <NutritionSummary />

          {/* Top Nutrients */}
          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1 bg-green-50 rounded-xl p-3">
              <Text className="text-green-700 font-semibold text-xs mb-1">
                HIGHEST VITAMIN
              </Text>
              <Text className="text-green-800 font-bold">
                {nutritional_highlights.highest_vitamin.name}
              </Text>
              <Text className="text-green-700 text-sm">
                {nutritional_highlights.highest_vitamin.amount}
                {nutritional_highlights.highest_vitamin.unit}(
                {nutritional_highlights.highest_vitamin.daily_value_percentage}%
                DV)
              </Text>
            </View>
            <View className="flex-1 bg-purple-50 rounded-xl p-3">
              <Text className="text-purple-700 font-semibold text-xs mb-1">
                HIGHEST MINERAL
              </Text>
              <Text className="text-purple-800 font-bold">
                {nutritional_highlights.highest_mineral.name}
              </Text>
              <Text className="text-purple-700 text-sm">
                {nutritional_highlights.highest_mineral.amount}
                {nutritional_highlights.highest_mineral.unit}(
                {nutritional_highlights.highest_mineral.daily_value_percentage}%
                DV)
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Ingredients Breakdown */}
        <Animated.View entering={FadeInUp.delay(400)} className="px-4 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Ingredients Breakdown
          </Text>
          <IngredientsList />
        </Animated.View>
      </ScrollView>
    </View>
  );
}
