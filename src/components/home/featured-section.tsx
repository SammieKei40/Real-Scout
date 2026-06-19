import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FilterValues } from "../explore/filter-modal";
import { useFadeSlideIn } from "../../hooks/use-animations";
import FeaturedCard from "./featured-card";

const FEATURED_PROPERTIES = [
  {
    id: "1",
    name: "Merialla Villa",
    location: "New York, US",
    price: 12219,
    rating: 4.8,
    category: "Villa",
    image: require("../../../assets/images/properties/property1.jpg"),
  },
  {
    id: "2",
    name: "Modernica Apartments",
    location: "New York, US",
    price: 22452,
    rating: 4.7,
    category: "Apartments",
    image: require("../../../assets/images/properties/property2.jpg"),
  },
  {
    id: "3",
    name: "La Grand Maison",
    location: "Tokyo, Japan",
    price: 17821,
    rating: 4.9,
    category: "House",
    image: require("../../../assets/images/properties/property3.jpg"),
  },
  {
    id: "4",
    name: "Skyline Residence",
    location: "Los Angeles, US",
    price: 31500,
    rating: 4.8,
    category: "Apartments",
    image: require("../../../assets/images/properties/property4.jpg"),
  },
  {
    id: "5",
    name: "The Ivory House",
    location: "Miami, US",
    price: 19800,
    rating: 4.6,
    category: "House",
    image: require("../../../assets/images/properties/property5.jpg"),
  },
  {
    id: "6",
    name: "Azure Retreat",
    location: "Barcelona, Spain",
    price: 28300,
    rating: 4.9,
    category: "Villa",
    image: require("../../../assets/images/properties/property6.jpg"),
  },
];

interface FeaturedSectionProps {
  searchQuery?: string;
  activeFilters?: FilterValues | null;
}

export default function FeaturedSection({ searchQuery = "", activeFilters }: FeaturedSectionProps) {
  const router = useRouter();
  const { opacity: headerOpacity, translateY: headerTranslateY } = useFadeSlideIn(0);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FEATURED_PROPERTIES.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchesPrice = !activeFilters || (p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax);
      const matchesType = !activeFilters || activeFilters.selectedTypes.length === 0 || activeFilters.selectedTypes.includes(p.category);
      return matchesQuery && matchesPrice && matchesType;
    });
  }, [searchQuery, activeFilters]);


  return (
    <View className="mt-7 gap-4">
      {/* Section header */}
      <Animated.View
        className="flex-row items-center justify-between px-5"
        style={{ opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }}
      >
        <Text className="font-rubik-semibold text-black-russian text-xl">Featured</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(tabs)/explore")}>
          <Text className="font-rubik-medium text-purple text-sm">See All</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Horizontal scroll or empty state */}
      {filtered.length === 0 ? (
        <View className="items-center justify-center py-10 gap-3">
          <Ionicons name="home-outline" size={48} color="#D0D0D0" />
          <Text className="font-rubik-medium text-comet text-base">
            No properties found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
          renderItem={({ item, index }) => (
            <FeaturedCard
              id={item.id}
              name={item.name}
              location={item.location}
              price={item.price}
              rating={item.rating}
              category={item.category}
              image={item.image}
              animationIndex={index}
            />
          )}
        />
      )}
    </View>
  );
}
