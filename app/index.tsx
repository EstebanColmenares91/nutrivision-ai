// React Native.
import { View } from "react-native";

// Page Components.
import ActionButtons from "@/modules/index-page/components/ActionButtons";
import FeaturesSection from "@/modules/index-page/components/FeaturesSection";
import Header from "@/modules/index-page/components/Header";

export default function Index() {
  return (
    <View className="flex-1 bg-light-background">
      <View className="flex-1 justify-center items-center px-6">
        <Header />
        <FeaturesSection />
        <ActionButtons />
      </View>
    </View>
  );
}
