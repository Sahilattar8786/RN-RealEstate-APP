import { Image, Text, View } from "react-native";

type LogoScreenProps = {
  title?: string;
  subtitle?: string;
};

export default function LogoScreen({
  title = "Create Account",
  subtitle = "Find Your Dream Home Today",
}: LogoScreenProps) {
  return (
    <View className="pt-12 pb-8">
      <Image
        source={require("../../assets/images/kribb.png")}
        className="w-32 h-16 mb-8"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">{title}</Text>
      <Text className="text-gray-500">{subtitle}</Text>
    </View>
  );
}
