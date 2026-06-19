import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  isLogout?: boolean;
}

export default function MenuItem({ icon, label, onPress, isLogout = false }: MenuItemProps) {
  const color = isLogout ? "#FF4B4B" : "#191d31";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center py-3.5 gap-4"
    >
      {/* Icon container */}
      <View
        className="w-10 h-10 rounded-xl items-center justify-center bg-white"
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>

      {/* Label */}
      <Text
        className={`flex-1 font-rubik-medium text-lg ${
          isLogout ? "text-[#FF4B4B]" : "text-black-russian"
        }`}
      >
        {label}
      </Text>

      {/* Chevron — hidden for logout */}
      {!isLogout && (
        <Ionicons name="chevron-forward" size={18} color="#A0A0B0" />
      )}
    </TouchableOpacity>
  );
}
