import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FilterValues } from "../explore/filter-modal";
import RecommendationCard from "./recommendation-card";

const FILTERS = ["All", "House", "Villa", "Apartments", "Others"];

const ALL_PROPERTIES = [
  {
    id: "1",
    name: "La Grand Maison",
    location: "Tokyo, Japan",
    price: 12219,
    rating: 4.8,
    category: "Villa",
    image: require("../../../assets/images/properties/property5.jpg"),
  },
  {
    id: "2",
    name: "Skyline Loft",
    location: "New York, US",
    price: 1424,
    rating: 4.8,
    category: "Apartments",
    image: require("../../../assets/images/properties/property7.jpg"),
  },
  {
    id: "3",
    name: "Merialla Villa",
    location: "Miami, US",
    price: 17821,
    rating: 4.7,
    category: "Villa",
    image: require("../../../assets/images/properties/property8.jpg"),
  },
  {
    id: "4",
    name: "Azure Retreat",
    location: "Barcelona, Spain",
    price: 21469,
    rating: 4.9,
    category: "House",
    image: require("../../../assets/images/properties/property9.jpg"),
  },
  {
    id: "5",
    name: "The Ivory House",
    location: "London, UK",
    price: 9850,
    rating: 4.6,
    category: "House",
    image: require("../../../assets/images/properties/property10.jpg"),
  },
  {
    id: "6",
    name: "Modernica Suite",
    location: "Los Angeles, US",
    price: 14300,
    rating: 4.8,
    category: "Apartments",
    image: require("../../../assets/images/properties/property6.jpg"),
  },
];

interface RecommendationSectionProps {
  searchQuery?: string;
  activeFilters?: FilterValues | null;
}

export default function RecommendationSection({ searchQuery = "", activeFilters }: RecommendationSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_PROPERTIES.filter((p) => {
      const matchesPill = activeFilter === "All" || p.category === activeFilter;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchesPrice = !activeFilters || (p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax);
      const matchesType = !activeFilters || activeFilters.selectedTypes.length === 0 || activeFilters.selectedTypes.includes(p.category);
      return matchesPill && matchesQuery && matchesPrice && matchesType;
    });
  }, [activeFilter, searchQuery, activeFilters]);

  return (
    <View className="mt-7 gap-4">
      {/* Section header */}
      <View className="flex-row items-center justify-between px-5">
        <Text className="font-rubik-bold text-black-russian text-xl">
          Our Recommendation
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="font-rubik-medium text-purple text-sm">See All</Text>
        </TouchableOpacity>
      </View>

      {/* Filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
              className={`px-5 py-2 rounded-full ${
                isActive
                  ? "bg-purple"
                  : "bg-purple-light border border-[#E4E4E4]"
              }`}
            >
              <Text
                className={`font-rubik-medium text-sm ${
                  isActive ? "text-white" : "text-black-russian"
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2-column grid */}
      {filtered.length === 0 ? (
        <View className="items-center justify-center py-16 gap-3">
          <Ionicons name="home-outline" size={52} color="#D0D0D0" />
          <Text className="font-rubik-medium text-comet text-base">
            No properties found
          </Text>
        </View>
      ) : (
      <View className="px-5 gap-4">
        {Array.from({ length: Math.ceil(filtered.length / 2) }).map((_, rowIndex) => {
          const left = filtered[rowIndex * 2];
          const right = filtered[rowIndex * 2 + 1];
          return (
            <View key={rowIndex} className="flex-row gap-4">
              <RecommendationCard
                id={left.id}
                name={left.name}
                location={left.location}
                price={left.price}
                rating={left.rating}
                category={left.category}
                image={left.image}
              />
              {right ? (
                <RecommendationCard
                  id={right.id}
                  name={right.name}
                  location={right.location}
                  price={right.price}
                  rating={right.rating}
                  category={right.category}
                  image={right.image}
                />
              ) : (
                <View className="flex-1" />
              )}
            </View>
          );
        })}
      </View>
      )}
    </View>
  );
}
