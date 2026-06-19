import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RecommendationCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  image: string | number | { uri: string };
}

export default function RecommendationCard({
  id,
  name,
  location,
  price,
  rating,
  category,
  image,
}: RecommendationCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() =>
        router.push({
          pathname: "/property/[id]",
          params: { id, name, location, price: price.toString(), rating: rating.toString(), category },
        })
      }
      className="flex-1 bg-white shadow-soft border border-purple-light rounded-2xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {/* Property image */}
      <View>
        <Image
          source={image}
          style={{ width: "100%", height: 120 }}
          contentFit="cover"
        />

        {/* Rating badge — top left */}
        <View
          className="absolute flex-row items-center gap-1 bg-white px-2 py-1 rounded-full"
          style={{
            top: 10,
            right: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Ionicons name="star" size={11} color="#F7A723" />
          <Text className="font-rubik-bold text-black-russian text-xs">{rating}</Text>
        </View>
      </View>

      {/* Card info */}
      <View className="px-3 pt-2.5 pb-3 gap-1">
        <Text className="font-rubik-bold text-black-russian text-sm" numberOfLines={1}>
          {name}
        </Text>
        <Text className="font-rubik text-comet text-xs" numberOfLines={1}>
          {location}
        </Text>

        {/* Price + heart */}
        <View className="flex-row items-center justify-between mt-1">
          <Text className="font-rubik-bold text-purple text-sm">
            ${price.toLocaleString()}
          </Text>
          <TouchableOpacity
            onPress={() => setLiked((p) => !p)}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? "#FF4B6E" : "#666876"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
