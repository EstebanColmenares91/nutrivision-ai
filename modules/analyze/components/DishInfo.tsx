import { useMeal } from "@/store/food";
import {
  getAlphaNumericValue,
  getHealthScoreBg,
  getHealthScoreColor,
} from "@/utils";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function DishInfo() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const {
    meal_analysis: { dish_name, portionDescription, meal_totals },
  } = useMeal();

  return (
    <Animated.View entering={FadeInUp.delay(200)} className="p-4">
      <View className="bg-gray-100 rounded-2xl mb-4 overflow-hidden">
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 256 }}
          contentFit="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 p-2.5 bg-[#252525] opacity-90">
          <Text className="text-white text-xl font-bold mb-1">{dish_name}</Text>
          <Text className="text-white/80 text-sm">{portionDescription}</Text>
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
              className={`text-2xl font-bold mr-2 ${getHealthScoreColor(meal_totals.health_score)}`}
            >
              {meal_totals.health_score}
            </Text>
            <View
              className={`w-12 h-12 rounded-full ${getHealthScoreBg(meal_totals.health_score)} items-center justify-center`}
            >
              <Text className="text-white font-bold">
                {getAlphaNumericValue(meal_totals.health_score)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
