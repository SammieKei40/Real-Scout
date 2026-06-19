import { useRouter } from "expo-router";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "../../../assets/svg/google.svg";
import { useFadeIn, useFadeSlideIn } from "../../hooks/use-animations";

export default function AuthScreen() {
  const router = useRouter();
  const imageOpacity = useFadeIn(0);
  const { opacity: copyOpacity, translateY: copyTranslateY } = useFadeSlideIn(140);
  const { opacity: btnOpacity, translateY: btnTranslateY } = useFadeSlideIn(320);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      {/* House image */}
      <Animated.View style={{ opacity: imageOpacity, width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../../assets/house-scout.png")}
          style={{ width: "100%", height: 552, borderRadius: 12 }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Auth content */}
      <View className="flex-1 px-6 gap-3 pb-6">
        {/* Copy */}
        <Animated.View
          className="items-center"
          style={{ opacity: copyOpacity, transform: [{ translateY: copyTranslateY }] }}
        >
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
          <Text
            className="font-rubik text-sm !text-comet text-center"
            style={{ fontSize: 18, lineHeight: 44 }}
          >
            Login to Real Scout with Google
          </Text>
        </Animated.View>

        {/* Google sign-in button */}
        <Animated.View style={{ opacity: btnOpacity, transform: [{ translateY: btnTranslateY }], marginTop: "auto" }}>
          <TouchableOpacity
            className="bg-white flex-row items-center justify-center px-6 gap-3 rounded-full py-[18px]"
            style={{
              backgroundColor: "#ffffff",
              shadowOpacity: 0.2,
              shadowRadius: 60,
              elevation: 1,
            }}
            onPress={() => router.replace("/(tabs)")}
          >
            <GoogleIcon />
            <Text className="font-rubik-medium text-lg text-black-russian">
              Sign In with Google
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
