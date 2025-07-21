import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

type FeatherIconName = "trending-up" | "target" | "heart";

interface FeatureProps {
  value: string;
  iconName: FeatherIconName;
  iconColor?: string;
  iconSize?: number;
}

export default function Feature({
  value,
  iconName,
  iconSize = 24,
  iconColor = "white",
}: FeatureProps) {
  return (
    <View className="items-center">
      <View className="bg-white/10 rounded-full p-3 mb-2">
        <Feather name={iconName} size={iconSize} color={iconColor} />
      </View>
      <Text className="text-white text-xs font-medium">{value}</Text>
    </View>
  );
}
