import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type FeatherIconName = "camera" | "image";

interface ButtonProps extends TouchableOpacityProps {
  value: string;
  iconName: FeatherIconName;
  iconColor?: string;
  iconSize?: number;
  textClassName?: string;
}

export default function Button({
  value,
  iconName,
  iconColor = "#3b82f6",
  iconSize = 24,
  textClassName = "text-primary-600 text-lg font-semibold ml-3",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      className="bg-white rounded-2xl p-6 flex-row items-center justify-center shadow-lg"
      {...props}
    >
      <Feather name={iconName} size={iconSize} color={iconColor} />
      <Text className={textClassName}>{value}</Text>
    </TouchableOpacity>
  );
}
