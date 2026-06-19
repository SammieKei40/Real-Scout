import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal, { FilterValues } from "../../components/explore/filter-modal";
import RecommendationCard from "../../components/home/recommendation-card";

const FILTERS = ["All", "House", "Villa", "Apartments", "Others"];

const PROPERTIES = [
  {
    id: "1",
    name: "La Grand Maison",
    location: "Tokyo, Japan",
    price: 12219,
    rating: 4.8,
    category: "Villa",
    image: require("../../../assets/images/properties/property1.jpg"),
  },
  {
    id: "2",
    name: "Skyline Loft",
    location: "New York, US",
    price: 1424,
    rating: 4.8,
    category: "Apartments",
    image: require("../../../assets/images/properties/property2.jpg"),
  },
  {
    id: "3",
    name: "Merialla Villa",
    location: "Miami, US",
    price: 17821,
    rating: 4.7,
    category: "Villa",
    image: require("../../../assets/images/properties/property3.jpg"),
  },
  {
    id: "4",
    name: "Azure Retreat",
    location: "Barcelona, Spain",
    price: 21469,
    rating: 4.9,
    category: "House",
    image: require("../../../assets/images/properties/property4.jpg"),
  },
  {
    id: "5",
    name: "The Ivory House",
    location: "London, UK",
    price: 9850,
    rating: 4.6,
    category: "House",
    image: require("../../../assets/images/properties/property5.jpg"),
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
  {
    id: "7",
    name: "Sunset Villa",
    location: "Bali, Indonesia",
    price: 8500,
    rating: 4.5,
    category: "Villa",
    image: require("../../../assets/images/properties/property7.jpg"),
  },
  {
    id: "8",
    name: "Harbor View",
    location: "Sydney, Australia",
    price: 25000,
    rating: 4.9,
    category: "House",
    image: require("../../../assets/images/properties/property8.jpg"),
  },
  {
    id: "9",
    name: "Urban Retreat",
    location: "Berlin, Germany",
    price: 11200,
    rating: 4.7,
    category: "Apartments",
    image: require("../../../assets/images/properties/property9.jpg"),
  },
  {
    id: "10",
    name: "Coastal Haven",
    location: "Malibu, US",
    price: 38000,
    rating: 4.8,
    category: "Others",
    image: require("../../../assets/images/properties/property10.jpg"),
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROPERTIES.filter((p) => {
      const matchesPill = activeFilter === "All" || p.category === activeFilter;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      const matchesPrice =
        !activeFilters ||
        (p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax);
      const matchesType =
        !activeFilters ||
        activeFilters.selectedTypes.length === 0 ||
        activeFilters.selectedTypes.includes(p.category);
      return matchesPill && matchesQuery && matchesPrice && matchesType;
    });
  }, [query, activeFilter, activeFilters]);

  const resultLabel =
    activeFilter === "All" ? "Properties" : activeFilter;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="flex-row items-center px-5 pt-2 pb-5 gap-3">
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            activeOpacity={0.8}
            className="w-10 h-10 rounded-full items-center justify-center bg-[#F0EEFF]"
          >
            <Ionicons name="arrow-back" size={20} color="#191d31" />
          </TouchableOpacity>

          <Text
            className="flex-1 font-rubik-bold text-black-russian text-base text-center"
            numberOfLines={1}
          >
            Search for Your Ideal Home
          </Text>

          <TouchableOpacity activeOpacity={0.7} className="relative p-1">
            <Ionicons name="notifications-outline" size={28} color="#191d31" />
            <View
              className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-purple"
              style={{ borderWidth: 1.5, borderColor: "#fff" }}
            />
          </TouchableOpacity>
        </View>

        <View className="px-5 gap-5">
          {/* Search bar */}
          <View
            className="flex-row items-center bg-ghost-white rounded-xl px-4 gap-3"
            style={{ borderWidth: 1, borderColor: "#8B5DFF1A" }}
          >
            <Ionicons name="search-outline" size={20} color="#666876" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search something"
              placeholderTextColor="#A0A0B0"
              returnKeyType="search"
              className="flex-1 font-rubik text-black-russian text-sm py-4"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={18} color="#666876" />
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.7} onPress={() => setFilterVisible(true)}>
              <Ionicons name="options-outline" size={20} color="#666876" />
            </TouchableOpacity>
          </View>

          {/* Filter pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  activeOpacity={0.8}
                  className={`px-5 py-2 rounded-full ${
                    isActive ? "bg-purple" : "bg-purple-light border border-[#E4E4E4]"
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

          {/* Result count */}
          <Text className="font-rubik-bold text-black-russian text-xl">
            Found{" "}
            <Text className="text-black-russian">{filtered.length} </Text>
            {resultLabel}
          </Text>

          {/* 2-column grid */}
          {filtered.length === 0 ? (
            <View className="items-center justify-center py-16 gap-3">
              <Ionicons name="home-outline" size={52} color="#D0D0D0" />
              <Text className="font-rubik-medium text-comet text-base">
                No properties found
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {Array.from({ length: Math.ceil(filtered.length / 2) }).map(
                (_, rowIndex) => {
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
                }
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(f) => setActiveFilters(f)}
      />
    </SafeAreaView>
  );
}
