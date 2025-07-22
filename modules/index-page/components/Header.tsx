import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Header() {
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    sparkleRotation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  const animatedSparkleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sparkleRotation.value}deg` }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      className="items-center mb-12"
    >
      <View className="relative mb-6">
        <View className="bg-primary-100 rounded-full p-6 mb-4">
          <Feather name="target" size={48} color="#77569c" />
        </View>
        <Animated.View
          style={[animatedSparkleStyle]}
          className="absolute -top-2 -right-2"
        >
          <Ionicons name="sparkles-outline" size={24} color="#fbbf24" />
        </Animated.View>
      </View>

      <Text className="text-light-text-primary text-4xl font-bold text-center mb-3">
        NutriVision AI
      </Text>
      <Text className="text-light-text-secondary text-lg text-center leading-6">
        Instantly analyze your meals for detailed{"\n"}nutrition information and
        health insights
      </Text>
    </Animated.View>
  );
}
