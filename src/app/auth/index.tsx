import { useRouter } from "expo-router";
import { Animated, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "../../../assets/svg/google.svg";
import { useFadeIn, useFadeSlideIn } from "../../hooks/use-animations";

export default function AuthScreen() {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const imageOpacity = useFadeIn(0);
  const { opacity: copyOpacity, translateY: copyTranslateY } = useFadeSlideIn(140);
  const { opacity: btnOpacity, translateY: btnTranslateY } = useFadeSlideIn(320);

  const imageHeight = Math.min(height * 0.48, 552);

  const headlineFontSize = width < 380 ? 26 : 32;
  const headlineLineHeight = width < 380 ? 34 : 44;

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      {/* House image */}
      <Animated.View style={{ opacity: imageOpacity, width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../../assets/house-scout.png")}
          style={{ width: "100%", height: imageHeight, borderRadius: 12 }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Auth content — flex-1 so it fills whatever remains after the image */}
      <View className="flex-1 px-6 pb-4" style={{ justifyContent: "space-between" }}>
        {/* Copy */}
        <Animated.View
          className="items-center"
          style={{ opacity: copyOpacity, transform: [{ translateY: copyTranslateY }], paddingTop: 12 }}
        >
          <Text className="font-rubik !text-comet uppercase text-base leading-tight tracking-wider">
            Welcome to Real Scout
          </Text>
          <View className="mt-2 items-center">
            <Text
              className="font-rubik-bold text-black-russian text-center"
              style={{ fontSize: headlineFontSize, lineHeight: headlineLineHeight }}
            >
              {"Let's Get You Closer"}
            </Text>
            <Text
              className="font-rubik-bold text-center"
              style={{ fontSize: headlineFontSize, lineHeight: headlineLineHeight }}
            >
              <Text className="text-black-russian">To </Text>
              <Text className="text-purple">Your Ideal Home</Text>
            </Text>
          </View>
          <Text
            className="font-rubik !text-comet text-center"
            style={{ fontSize: height < 700 ? 15 : 18, lineHeight: height < 700 ? 22 : 44 }}
          >
            Login to Real Scout with Google
          </Text>
        </Animated.View>

        {/* Google sign-in button — always anchored to the bottom */}
        <Animated.View style={{ opacity: btnOpacity, transform: [{ translateY: btnTranslateY }] }}>
          <TouchableOpacity
            className="bg-white flex-row items-center justify-center px-6 gap-3 rounded-full"
            style={{
              backgroundColor: "#ffffff",
              shadowOpacity: 0.2,
              shadowRadius: 60,
              elevation: 1,
              paddingVertical: height < 700 ? 14 : 18,
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
