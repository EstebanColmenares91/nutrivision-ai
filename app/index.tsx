import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl text-center">
        Edit app/index.tsx to edit this screen.
      </Text>
      <TouchableOpacity onPress={() => router.push("/analyze")}>
        <Text>Present modal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/analyze")}>
        <Text>Select from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/analyze")}>
        <Text>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
