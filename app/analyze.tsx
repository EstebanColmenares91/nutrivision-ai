import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

import { useMeal } from "@/store/food";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export default function AnalysisScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const { meal_analysis } = useMeal();

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
                {meal_analysis.dish_name}
              </Text>
              <Text className="text-white/80 text-sm">
                {meal_analysis.portionDescription}
              </Text>
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
              <View className="flex-row items-center">
                <Text
                  className={`text-2xl font-bold mr-2 ${getHealthScoreColor(meal_analysis.meal_totals.health_score)}`}
                >
                  {meal_analysis.meal_totals.health_score}
                </Text>
                <View
                  className={`w-12 h-12 rounded-full ${getHealthScoreBg(meal_analysis.meal_totals.health_score)} items-center justify-center`}
                >
                  <Text className="text-white font-bold">A+</Text>
                </View>
              </View> 
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
                  {meal_analysis.meal_totals.calories}
                </Text>
                <Text className="text-sm text-gray-600">Calories</Text>
              </View>
              <View className="items-center flex-1">
                <Octicons name="zap" size={20} color="#3b82f6" />
                <Text className="text-2xl font-bold text-gray-800 mt-1">
                  {meal_analysis.meal_totals.protein_g}g
                </Text>
                <Text className="text-sm text-gray-600">Protein</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-5 h-5 bg-yellow-500 rounded mb-1" />
                <Text className="text-2xl font-bold text-gray-800">
                  {meal_analysis.meal_totals.carbohydrates_g}g
                </Text>
                <Text className="text-sm text-gray-600">Carbs</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-5 h-5 bg-orange-500 rounded-full mb-1" />
                <Text className="text-2xl font-bold text-gray-800">
                  {meal_analysis.meal_totals.fats_g}g
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
                {meal_analysis.nutritional_highlights.highest_vitamin.name}
              </Text>
              <Text className="text-green-700 text-sm">
                {
                  meal_analysis.nutritional_highlights.highest_vitamin
                    .amount
                }
                {meal_analysis.nutritional_highlights.highest_vitamin.unit}(
                {
                  meal_analysis.nutritional_highlights.highest_vitamin
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
                {meal_analysis.nutritional_highlights.highest_mineral.name}
              </Text>
              <Text className="text-purple-700 text-sm">
                {
                  meal_analysis.nutritional_highlights.highest_mineral
                    .amount
                }
                {meal_analysis.nutritional_highlights.highest_mineral.unit}(
                {
                  meal_analysis.nutritional_highlights.highest_mineral
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
          {meal_analysis.items.map((ingredient, index) => (
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
                  <Text className="text-gray-600 text-sm">
                    {ingredient.estimated_weight_grams}g estimated
                  </Text>
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
