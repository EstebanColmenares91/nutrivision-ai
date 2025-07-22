import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Footer() {
  return (
    <Animated.View
      entering={FadeInUp.delay(800)}
      className="absolute bottom-0 top-0 items-center"
    >
      <Text className="text-light-text-muted text-sm text-center">
        Powered by advanced AI nutrition analysis
      </Text>
    </Animated.View>
  );
}
