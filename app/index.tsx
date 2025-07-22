import { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";

import * as ImagePicker from "expo-image-picker";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import Button from "@/components/Button";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import { useMeal } from "@/store/food";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function Index() {
  const sparkleRotation = useSharedValue(0);
  const { updateMeal } = useMeal();

  const handleSelectFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    await fetchData(result);
  };

  const handleTakePhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    await fetchData(result);
  };

  const fetchData = async (res: ImagePicker.ImagePickerResult) => {
    if (res.canceled) return;
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          image: {
            inlineData: {
              data: res.assets[0].base64,
              mimeType: "image/jpeg",
            },
          },
        }),
      });

      const data = await response.json();
      updateMeal(data.data.meal_analysis);
      router.push({
        pathname: "/analyze",
        params: { imageUri: res.assets[0].uri },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    <View className="flex-1 bg-light-background">
      <View className="flex-1 justify-center items-center px-6">
        {/* Header Section */}
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
            Instantly analyze your meals for detailed{"\n"}nutrition information
            and health insights
          </Text>
        </Animated.View>

        {/* Features Section */}
        <Animated.View entering={FadeInUp.delay(400)} className="mb-12">
          <View className="flex-row justify-center space-x-8 mb-8 gap-2">
            <Feature iconName="trending-up" value="Track Progress" />
            <Feature iconName="target" value="AI Analysis" />
            <Feature iconName="heart" value="Health Score" />
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          className="w-full space-y-4"
        >
          <Button
            value="Take a Photo"
            iconName="camera"
            iconColor="white"
            onPress={handleTakePhoto}
            className="bg-primary-500 border-2 border-white/30 rounded-2xl p-6 flex-row items-center justify-center"
            textClassName=" text-lg font-semibold ml-3 text-white"
          />
          <Button
            value="Select from Gallery"
            iconName="image"
            className="bg-white/10 border-2 border-primary-500 rounded-2xl p-6 flex-row items-center justify-center"
            textClassName=" text-lg font-semibold ml-3 text-primary-500"
            iconColor="#77569c"
            onPress={handleSelectFromGallery}
          />
        </Animated.View>
        <Footer />
      </View>
    </View>
  );
}
