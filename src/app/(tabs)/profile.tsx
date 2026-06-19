import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuItem from "../../components/profile/menu-item";

function Divider() {
  return <View className="h-px bg-[#F0F0F0] my-1" />;
}

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <Text className="font-rubik-semibold text-black-russian text-xl">Profile</Text>
          <TouchableOpacity activeOpacity={0.7} className="relative p-1">
            <Ionicons name="notifications-outline" size={28} color="#191d31" />
            <View
              className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-purple"
              style={{ borderWidth: 1.5, borderColor: "#fff" }}
            />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="items-center mt-2 mb-6">
          <View className="relative">
            <Image
              source={require("../../../assets/logo.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              contentFit="cover"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute bottom-0 right-0 w-8 h-8 bg-purple rounded-xl items-center justify-center"
              style={{
                shadowColor: "#8B5DFF",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Ionicons name="pencil" size={15} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text className="font-rubik-semibold text-black-russian text-2xl mt-4">
            Sammie Kei
          </Text>
        </View>

        <View className="px-5">
          <Divider />

          {/* Group 1 — Booking & Payments */}
          <MenuItem icon="calendar-outline" label="My Booking" />
          <MenuItem icon="card-outline" label="Payments" />

          <Divider />

          {/* Group 2 — Account settings */}
          <MenuItem icon="person-outline" label="Profile" />
          <MenuItem icon="notifications-outline" label="Notification" />
          <MenuItem icon="shield-checkmark-outline" label="Security" />
          <MenuItem icon="globe-outline" label="Language" />
          <MenuItem icon="information-circle-outline" label="Help Center" />
          <MenuItem icon="people-outline" label="Invite Friends" />

          {/* Logout */}
          <MenuItem icon="log-out-outline" label="Logout" isLogout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
