import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Footer() {
  return (
    <Animated.View
      entering={FadeInUp.delay(800)}
      className="absolute bottom-12 items-center"
    >
      <Text className="text-blue-200 text-sm text-center">
        Powered by advanced AI nutrition analysis
      </Text>
    </Animated.View>
  );
}
