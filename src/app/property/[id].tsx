import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFadeIn, useFadeSlideIn } from "../../hooks/use-animations";

// ─── Image lookup by property id ───────────────────────────────────────────
const PROPERTY_IMAGES: Record<string, ReturnType<typeof require>> = {
  "1": require("../../../assets/images/properties/property1.jpg"),
  "2": require("../../../assets/images/properties/property2.jpg"),
  "3": require("../../../assets/images/properties/property3.jpg"),
  "4": require("../../../assets/images/properties/property4.jpg"),
  "5": require("../../../assets/images/properties/property5.jpg"),
  "6": require("../../../assets/images/properties/property6.jpg"),
  "7": require("../../../assets/images/properties/property7.jpg"),
  "8": require("../../../assets/images/properties/property8.jpg"),
  "9": require("../../../assets/images/properties/property9.jpg"),
  "10": require("../../../assets/images/properties/property10.jpg"),
};

const GALLERY_IMAGES = [
  require("../../../assets/images/properties/property7.jpg"),
  require("../../../assets/images/properties/property8.jpg"),
  require("../../../assets/images/properties/property9.jpg"),
];

const FACILITIES = [
  { icon: "car-outline" as const, label: "Car Parking" },
  { icon: "water-outline" as const, label: "Swimming Pool" },
  { icon: "barbell-outline" as const, label: "Gym & Fitness" },
  { icon: "restaurant-outline" as const, label: "Restaurant" },
  { icon: "wifi-outline" as const, label: "Wi-fi & Network" },
  { icon: "paw-outline" as const, label: "Pet Center" },
  { icon: "walk-outline" as const, label: "Sport Center" },
  { icon: "shirt-outline" as const, label: "Laundry" },
];

// ─── Sub-components ─────────────────────────────────────────────────────────
function SectionTitle({ label }: { label: string }) {
  return (
    <Text className="font-rubik-bold text-black-russian text-lg mb-4">{label}</Text>
  );
}

function SpecItem({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="w-9 h-9 rounded-lg bg-[#F0EEFF] items-center justify-center">
        <Ionicons name={icon} size={18} color="#8B5DFF" />
      </View>
      <Text className="font-rubik-medium text-black-russian text-sm">{value}</Text>
    </View>
  );
}

function FacilityItem({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View className="items-center gap-2" style={{ width: "25%" }}>
      <View className="w-14 h-14 rounded-full bg-[#F0EEFF] items-center justify-center">
        <Ionicons name={icon} size={24} color="#8B5DFF" />
      </View>
      <Text className="font-rubik text-comet text-xs text-center" numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// ─── Screen ─────────────────────────────────────────────────────────────────
export default function PropertyDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, name, location, price, rating, category } = useLocalSearchParams<{
    id: string;
    name: string;
    location: string;
    price: string;
    rating: string;
    category: string;
  }>();

  const [liked, setLiked] = useState(false);
  const heroOpacity = useFadeIn(0);
  const { opacity: cardOpacity, translateY: cardTranslateY } = useFadeSlideIn(160);
  const image = PROPERTY_IMAGES[id] ?? PROPERTY_IMAGES["1"] ?? "";
  const formattedPrice = Number(price).toLocaleString();
  const categoryLabel = (category ?? "Property").toUpperCase();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {/* ── Hero image ── */}
        <Animated.View style={{ height: 320, opacity: heroOpacity }}>
          <Image
            source={image}
            style={{ width: "100%", height: 320 }}
            contentFit="cover"
          />

          {/* Top gradient for button contrast */}
          <LinearGradient
            colors={["rgba(0,0,0,0.45)", "transparent"]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120 }}
          />

          {/* Top buttons */}
          <View
            className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5"
            style={{ paddingTop: insets.top + 12 }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={26} color="#fff" />
            </TouchableOpacity>

            <View className="flex-row items-center gap-4">
              <TouchableOpacity activeOpacity={0.7} onPress={() => setLiked((p) => !p)}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={24}
                  color={liked ? "#FF4B6E" : "#fff"}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="paper-plane-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dot pagination */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: i === 0 ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === 0 ? "#8B5DFF" : "rgba(255,255,255,0.6)",
                }}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── White content card ── */}
        <Animated.View
          className="bg-white px-5 pt-6"
          style={{ marginTop: -24, opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }}
        >
          {/* Name */}
          <Text className="font-rubik-bold text-black-russian text-2xl mb-3">
            {name}
          </Text>

          {/* Category + rating */}
          <View className="flex-row items-center gap-3 mb-5">
            <View className="px-3 py-1 rounded bg-[#8B5DFF1A]">
              <Text className="font-rubik-bold text-purple text-xs">
                {categoryLabel}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="star" size={14} color="#F7A723" />
              <Text className="font-rubik-medium text-black-russian text-sm">
                {rating} (1,275 reviews)
              </Text>
            </View>
          </View>

          {/* Specs */}
          <View className="flex-row items-center gap-6 mb-5 flex-wrap">
            <SpecItem icon="bed-outline" value="8 Beds" />
            <SpecItem icon="water-outline" value="3 Bath" />
            <SpecItem icon="resize-outline" value="2000 sqft" />
          </View>

          <View className="h-px bg-[#F0F0F0] mb-6" />

          {/* ── Agent ── */}
          <View className="mb-6">
            <SectionTitle label="Agent" />
            <View className="flex-row items-center">
              <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 52, height: 52, borderRadius: 26 }}
                contentFit="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="font-rubik-bold text-black-russian text-base">
                  Natasya Wilodra
                </Text>
                <Text className="font-rubik text-comet text-sm">Owner</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full border border-[#E4E4E4] items-center justify-center"
                >
                  <Ionicons name="chatbubble-outline" size={18} color="#8B5DFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full border border-[#E4E4E4] items-center justify-center"
                >
                  <Ionicons name="call-outline" size={18} color="#8B5DFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Overview ── */}
          <View className="mb-6">
            <SectionTitle label="Overview" />
            <Text className="font-rubik text-comet text-sm leading-6">
              Sleek, modern 2-bedroom apartment with open living space, high-end finishes, and city views. Minutes from downtown, dining, and transit.
            </Text>
          </View>

          {/* ── Facilities ── */}
          <View className="mb-6">
            <SectionTitle label="Facilities" />
            <View className="flex-row flex-wrap gap-y-5">
              {FACILITIES.map((f) => (
                <FacilityItem key={f.label} icon={f.icon} label={f.label} />
              ))}
            </View>
          </View>

          {/* ── Gallery ── */}
          <View className="mb-6">
            <SectionTitle label="Gallery" />
            <View className="flex-row gap-2">
              {GALLERY_IMAGES.map((src, i) => (
                <View
                  key={i}
                  className="flex-1 rounded-xl overflow-hidden"
                  style={{ height: 100 }}
                >
                  <Image
                    source={src}
                    style={{ width: "100%", height: 100 }}
                    contentFit="cover"
                  />
                  {i === 2 && (
                    <View className="absolute inset-0 bg-black/60 items-center justify-center rounded-xl">
                      <Text className="font-rubik-bold text-white text-xl">20+</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* ── Location ── */}
          <View className="mb-6">
            <SectionTitle label="Location" />
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="location-outline" size={18} color="#8B5DFF" />
              <Text className="font-rubik text-comet text-sm flex-1">
                Grand City St. 100, New York, United States
              </Text>
            </View>

            {/* Map placeholder */}
            <View
              className="rounded-2xl overflow-hidden bg-[#EEF0F8]"
              style={{ height: 180 }}
            >
              {/* Decorative streets */}
              <View style={{ position: "absolute", left: 0, right: 0, top: "38%", height: 16, backgroundColor: "#fff" }} />
              <View style={{ position: "absolute", left: 0, right: 0, top: "65%", height: 16, backgroundColor: "#fff" }} />
              <View style={{ position: "absolute", top: 0, bottom: 0, left: "38%", width: 16, backgroundColor: "#fff" }} />
              <View style={{ position: "absolute", top: 0, bottom: 0, right: "28%", width: 16, backgroundColor: "#fff" }} />

              {/* Pin */}
              <View className="absolute inset-0 items-center justify-center">
                <View
                  className="bg-purple rounded-full p-3"
                  style={{
                    shadowColor: "#8B5DFF",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Ionicons name="location" size={22} color="#fff" />
                </View>
              </View>
            </View>
          </View>

          {/* ── Reviews ── */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={20} color="#F7A723" />
                <Text className="font-rubik-bold text-black-russian text-base">
                  4.8 (1,275 reviews)
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="font-rubik-medium text-purple text-sm">See All</Text>
              </TouchableOpacity>
            </View>

            {/* Review card */}
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ width: 44, height: 44, borderRadius: 22 }}
                  contentFit="cover"
                />
                <Text className="font-rubik-bold text-black-russian text-base">
                  Charolette Hanlin
                </Text>
              </View>
              <Text className="font-rubik text-comet text-sm leading-5">
                The apartment is very clean and modern. I really like the interior design. Looks like I'll feel at home 😊
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="heart-outline" size={16} color="#666876" />
                  <Text className="font-rubik text-comet text-sm">938</Text>
                </View>
                <Text className="font-rubik text-comet text-sm">6 days ago</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* ── Fixed booking bar ── */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white flex-row items-center justify-between px-5"
        style={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <View>
          <Text className="font-rubik text-comet text-xs uppercase tracking-widest">
            Price
          </Text>
          <Text className="font-rubik-bold text-purple text-2xl">
            ${formattedPrice}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-purple rounded-full px-8 py-4"
        >
          <Text className="font-rubik-bold text-white text-base">Booking Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
