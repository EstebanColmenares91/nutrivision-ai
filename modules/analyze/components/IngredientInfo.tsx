import { Item } from "@/models/food";
import { getHealthScoreBg } from "@/utils";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";

interface IngredientInfoProps {
  ingredient: Item;
  index: number;
}

export default function IngredientInfo(props: IngredientInfoProps) {
  return (
    <Animated.View
      entering={SlideInRight.delay(500 + props.index * 100)}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {props.ingredient.name}
          </Text>
          <Text className="text-gray-600 text-sm">
            {props.ingredient.estimated_weight_grams}g estimated
          </Text>
        </View>
        <View
          className={`px-2 py-1 rounded-full ${getHealthScoreBg(props.ingredient.health_score)}`}
        >
          <Text className="text-white text-xs font-semibold">
            {props.ingredient.health_score}
          </Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-lg p-3 mb-2">
        <Text className="text-xs text-gray-600 mb-2">NUTRITION PER 100G</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 text-sm">
            {props.ingredient.calculated_totals.calories} cal
          </Text>
          <Text className="text-gray-700 text-sm">
            {props.ingredient.calculated_totals.protein_g}g protein
          </Text>
          <Text className="text-gray-700 text-sm">
            {props.ingredient.calculated_totals.carbs_g}g carbs
          </Text>
          <Text className="text-gray-700 text-sm">
            {props.ingredient.calculated_totals.fats_g}g fat
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <Feather name="alert-triangle" size={16} color="#f59e0b" />
        <Text className="text-amber-600 text-sm ml-1">
          {props.ingredient.common_allergens.join(", ")}
        </Text>
      </View>
    </Animated.View>
  );
}
