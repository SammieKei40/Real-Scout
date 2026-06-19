import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "../../../assets/svg/google.svg";

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      {/* House image */}
      <Image
        source={require("../../../assets/house-scout.png")}
        style={{ width: 399, height: 552, borderRadius: 12 }}
        resizeMode="cover"
      />

      {/* Auth content */}
      <View className="flex-1 px-6 justify-between">
        {/* Copy */}
        <View className="items-center">
          <Text className="font-rubik !text-comet uppercase text-base leading-tight tracking-wider">
            Welcome to Real Scout
          </Text>
          <View className="mt-2 items-center">
            <Text
              className="font-rubik-bold text-black-russian text-center"
              style={{ fontSize: 32, lineHeight: 44 }}
            >
              {"Let's Get You Closer"}
            </Text>
            <Text
              className="font-rubik-bold text-center"
              style={{ fontSize: 32, lineHeight: 44 }}
            >
              <Text className="text-black-russian">To </Text>
              <Text className="text-purple">Your Ideal Home</Text>
            </Text>
          </View>
          <Text className="font-rubik text-sm !text-comet text-center"
          
              style={{ fontSize: 18, lineHeight: 44 }}
          >
            Login to Real Scout with Google
          </Text>
        </View>

        {/* Google sign-in button */}
        <TouchableOpacity
          className="flex-row items-center justify-center px-6 gap-3 !rounded-full py-[18px] bg-white shadow-card"
          activeOpacity={0.7}
          onPress={() => router.replace("/(tabs)")}
        >
          <GoogleIcon />
          <Text className="font-rubik-medium text-lg text-black-russian">
            Sign In with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
