import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useFadeSlideIn, useScalePress } from "../../hooks/use-animations";

interface FeaturedCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  image: string | number | { uri: string };
  animationIndex?: number;
}

const CARD_WIDTH = 250;
const CARD_HEIGHT = 340;

export default function FeaturedCard({
  id,
  name,
  location,
  price,
  rating,
  category,
  image,
  animationIndex = 0,
}: FeaturedCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const { opacity, translateY } = useFadeSlideIn(animationIndex * 70);
  const { scale, onPressIn, onPressOut } = useScalePress(0.96);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/property/[id]",
          params: { id, name, location, price: price.toString(), rating: rating.toString(), category },
        })
      }
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={{
          width: CARD_WIDTH,
          borderRadius: 16,
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        {/* Inner view handles overflow clip */}
        <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 16, overflow: "hidden" }}>
          {/* Property image */}
          <Image
            source={image}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            contentFit="cover"
          />

          {/* Rating badge — top right */}
          <View
            className="absolute flex-row items-center gap-1 bg-white px-2.5 py-1 rounded-full"
            style={{
              top: 14,
              right: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Ionicons name="star" size={15} color="#F7A723" />
            <Text className="font-rubik-semibold text-dodger-blue text-xs">{rating}</Text>
          </View>

          {/* Gradient overlay + info */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.85)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: CARD_HEIGHT * 0.6,
              paddingHorizontal: 14,
              paddingBottom: 14,
              justifyContent: "flex-end",
            }}
          >
            <Text className="font-rubik-bold text-white text-xl" numberOfLines={1}>
              {name}
            </Text>
            <Text className="font-rubik text-white text-base mb-2" style={{ opacity: 0.8 }}>
              {location}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="font-rubik-bold text-white text-xl">
                ${price.toLocaleString()}
              </Text>
              <TouchableOpacity
                onPress={() => setLiked((prev) => !prev)}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={22}
                  color={liked ? "#FF4B6E" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>
    </Pressable>
  );
}
