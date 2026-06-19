import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RangeSlider from "./range-slider";

const PROPERTY_TYPES = ["House", "Villa", "Apartments", "Others", "Condos", "Studios"];

export interface FilterValues {
  priceMin: number;
  priceMax: number;
  selectedTypes: string[];
  bedrooms: number;
  bathrooms: number;
  sizeMin: number;
  sizeMax: number;
}

const DEFAULT_FILTERS: FilterValues = {
  priceMin: 0,
  priceMax: 50000,
  selectedTypes: [],
  bedrooms: 0,
  bathrooms: 0,
  sizeMin: 500,
  sizeMax: 5000,
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply?: (filters: FilterValues) => void;
}

function SectionTitle({ label }: { label: string }) {
  return (
    <Text className="font-rubik-bold text-black-russian text-lg mb-4">{label}</Text>
  );
}

function Counter({
  label,
  value,
  onDecrement,
  onIncrement,
}: {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between py-4">
      <Text className="font-rubik-medium text-comet text-base">{label}</Text>
      <View className="flex-row items-center gap-5">
        <TouchableOpacity
          onPress={onDecrement}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="remove" size={20} color="#8B5DFF" />
        </TouchableOpacity>
        <Text className="font-rubik-bold text-black-russian text-base w-5 text-center">
          {value}
        </Text>
        <TouchableOpacity
          onPress={onIncrement}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="add" size={20} color="#8B5DFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function FilterModal({ visible, onClose, onApply }: Props) {
  const insets = useSafeAreaInsets();

  const [priceMin, setPriceMin] = useState(DEFAULT_FILTERS.priceMin);
  const [priceMax, setPriceMax] = useState(DEFAULT_FILTERS.priceMax);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(DEFAULT_FILTERS.selectedTypes);
  const [bedrooms, setBedrooms] = useState(DEFAULT_FILTERS.bedrooms);
  const [bathrooms, setBathrooms] = useState(DEFAULT_FILTERS.bathrooms);
  const [sizeMin, setSizeMin] = useState(DEFAULT_FILTERS.sizeMin);
  const [sizeMax, setSizeMax] = useState(DEFAULT_FILTERS.sizeMax);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const reset = () => {
    setPriceMin(DEFAULT_FILTERS.priceMin);
    setPriceMax(DEFAULT_FILTERS.priceMax);
    setSelectedTypes(DEFAULT_FILTERS.selectedTypes);
    setBedrooms(DEFAULT_FILTERS.bedrooms);
    setBathrooms(DEFAULT_FILTERS.bathrooms);
    setSizeMin(DEFAULT_FILTERS.sizeMin);
    setSizeMax(DEFAULT_FILTERS.sizeMax);
  };

  const handleApply = () => {
    onApply?.({ priceMin, priceMax, selectedTypes, bedrooms, bathrooms, sizeMin, sizeMax });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end" }}>
        {/* Sheet */}
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "92%",
          }}
        >
          {/* Header */}
          <View className="flex-row items-center px-5 pt-5 pb-4">
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="w-9 h-9 rounded-full items-center justify-center bg-[#F0EEFF]"
            >
              <Ionicons name="arrow-back" size={18} color="#191d31" />
            </TouchableOpacity>
            <Text className="flex-1 text-center font-rubik-bold text-black-russian text-lg">
              Filter
            </Text>
            <TouchableOpacity onPress={reset} activeOpacity={0.7}>
              <Text className="font-rubik-medium text-purple text-base">Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
          >
            {/* Price Range */}
            <View className="mb-7">
              <SectionTitle label="Price Range" />
              <RangeSlider
                min={0}
                max={50000}
                low={priceMin}
                high={priceMax}
                onLowChange={setPriceMin}
                onHighChange={setPriceMax}
                prefix="$"
                showBars
              />
            </View>

            {/* Property Type */}
            <View className="mb-7">
              <SectionTitle label="Property Type" />
              <View className="flex-row flex-wrap gap-3">
                {PROPERTY_TYPES.map((type) => {
                  const active = selectedTypes.includes(type);
                  return (
                    <TouchableOpacity
                      key={type}
                      onPress={() => toggleType(type)}
                      activeOpacity={0.8}
                      className={`px-5 py-2.5 rounded-full ${
                        active ? "bg-purple" : "bg-white border border-[#E4E4E4]"
                      }`}
                    >
                      <Text
                        className={`font-rubik-medium text-sm ${
                          active ? "text-white" : "text-black-russian"
                        }`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Home Details */}
            <View className="mb-7">
              <SectionTitle label="Home Details" />
              <Counter
                label="Bedrooms"
                value={bedrooms}
                onDecrement={() => setBedrooms((v) => Math.max(0, v - 1))}
                onIncrement={() => setBedrooms((v) => v + 1)}
              />
              <View className="h-px bg-[#F0F0F0]" />
              <Counter
                label="Bathrooms"
                value={bathrooms}
                onDecrement={() => setBathrooms((v) => Math.max(0, v - 1))}
                onIncrement={() => setBathrooms((v) => v + 1)}
              />
            </View>

            {/* Building Size */}
            <View className="mb-4">
              <SectionTitle label="Building Size" />
              <RangeSlider
                min={500}
                max={5000}
                low={sizeMin}
                high={sizeMax}
                onLowChange={setSizeMin}
                onHighChange={setSizeMax}
                showBars={false}
              />
            </View>
          </ScrollView>

          {/* Set Filter button */}
          <View
            className="px-5 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.85}
              className="bg-purple rounded-full py-4 items-center"
            >
              <Text className="font-rubik-bold text-white text-base">Set Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
