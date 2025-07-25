import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="analyze"
          options={{
            presentation: "modal",
            title: "Nutrition Analysis",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
