import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    await fetchData(result);
  };

  const takePhoto = async () => {
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
    setImage(res.assets[0].uri);
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

      console.log(data.data?.meal_analysis);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl text-center">
        Edit app/index.tsx to edit this screen.
      </Text>

      <Image source={image} className="h-14 w-14" />

      <TouchableOpacity onPress={() => router.push("/analyze")}>
        <Text>Present modal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage()}>
        <Text>Select from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => takePhoto()}>
        <Text>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
