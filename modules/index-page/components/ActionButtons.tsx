import Spinner from "@/components/Spinner";
import { analyze } from "@/services/analyze";
import { useMeal } from "@/store/food";
import { apiHandler } from "@/utils";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "./Button";

export default function ActionButtons() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { updateMeal } = useMeal();
  const router = useRouter();

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
    setLoading(true);
    const [data, error] = await apiHandler(
      analyze(res.assets[0].base64 as string)
    );

    console.log("data", data);
    console.log("error", error);

    if (error || data.error) {
      Alert.alert(
        "Ha ocurrido un error con la API",
        `${data.error || "Por favor intente más tarde."}`
      );
      setLoading(false);
      return;
    }

    updateMeal(data.data.meal_analysis);
    router.push({
      pathname: "/analyze",
      params: { imageUri: res.assets[0].uri },
    });
    setLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(600)}
      className="w-full space-y-4"
    >
      <Button
        value="Take a Photo"
        iconName="camera"
        iconColor="white"
        onPress={handleTakePhoto}
        buttonClassName={`bg-primary-500`}
        textClassName="text-white"
      />
      <Button
        value="Select from Gallery"
        iconName="image"
        buttonClassName="bg-white/10 border-2 border-primary-500"
        textClassName="text-primary-500"
        iconColor="#77569c"
        onPress={handleSelectFromGallery}
      />
    </Animated.View>
  );
}
