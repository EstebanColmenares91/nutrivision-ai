import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Feature from "./Feature";

export default function FeaturesSection() {
  return (
    <Animated.View entering={FadeInUp.delay(400)} className="mb-12">
      <View className="flex-row justify-center space-x-8 mb-8 gap-2">
        <Feature iconName="trending-up" value="Track Progress" />
        <Feature iconName="target" value="AI Analysis" />
        <Feature iconName="heart" value="Health Score" />
      </View>
    </Animated.View>
  );
}
