import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal, { FilterValues } from "../../components/explore/filter-modal";
import FeaturedSection from "../../components/home/featured-section";
import HomeHeader from "../../components/home/header";
import RecommendationSection from "../../components/home/recommendation-section";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView
        className="flex-1 gap-3"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
        keyboardShouldPersistTaps="handled"
      >
        <HomeHeader
          query={query}
          onQueryChange={setQuery}
          onFilterPress={() => setFilterVisible(true)}
        />
        <FeaturedSection searchQuery={query} activeFilters={activeFilters} />
        <RecommendationSection searchQuery={query} activeFilters={activeFilters} />
      </ScrollView>

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(f) => setActiveFilters(f)}
      />
    </SafeAreaView>
  );
}
