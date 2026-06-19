import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface HomeHeaderProps {
  query: string;
  onQueryChange: (text: string) => void;
  onFilterPress: () => void;
}

export default function HomeHeader({ query, onQueryChange, onFilterPress }: HomeHeaderProps) {
  return (
    <View className="px-5 pt-2 gap-6">
      {/* Greeting row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Image
            source={require("../../../assets/1.jpeg")}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            contentFit="cover"
          />
          <View className="gap-0.5">
            <Text className="font-rubik text-comet text-xs">Good Morning</Text>
            <Text className="font-rubik-medium text-black-russian text-base">Sammie Kei</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.7} className="relative p-1">
          <Ionicons name="notifications-outline" size={28} color="#191d31" />
          <View
            className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-purple"
            style={{ borderWidth: 1.5, borderColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View
        className="flex-row items-center bg-ghost-white rounded-xl px-4 gap-3"
        style={{ borderWidth: 1, borderColor: "#8B5DFF1A" }}
      >
        <Ionicons name="search-outline" size={20} color="#666876" />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search something"
          placeholderTextColor="#A0A0B0"
          returnKeyType="search"
          className="flex-1 font-rubik text-black-russian text-sm py-4"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => onQueryChange("")} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={18} color="#666876" />
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color="#666876" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
