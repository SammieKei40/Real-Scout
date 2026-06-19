import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabBarProps = NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]> extends (
  props: infer P
) => unknown
  ? P
  : never;

const TABS: {
  name: string;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: "index",
    label: "Home",
    activeIcon: "home",
    inactiveIcon: "home-outline",
  },
  {
    name: "explore",
    label: "Explore",
    activeIcon: "search",
    inactiveIcon: "search-outline",
  },
  {
    name: "profile",
    label: "Profile",
    activeIcon: "person",
    inactiveIcon: "person-outline",
  },
];

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className=""
      style={{
        paddingBottom: insets.bottom,
        borderTopWidth: 1,
        borderTopColor: "#8B5DFF1A",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 12,
        paddingTop: 1,
      }}
    >
      <View className="flex-row items-center ">
        {TABS.map((tab, index) => {
          const route = state.routes[index];
          const isFocused = state.index === index;

          if (!route) return null;

          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TouchableOpacity
              key={tab.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center py-5 gap-2"
            >
              <Ionicons
                name={isFocused ? tab.activeIcon : tab.inactiveIcon}
                size={24}
                color={isFocused ? "#8B5DFF" : "#666876"}
              />
              <Text
                className={`text-xs font-rubik-medium leading-4 ${
                  isFocused ? " text-purple" : " text-comet"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
