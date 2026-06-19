import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveScale } from "../../hooks/use-animations";

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
  { name: "index", label: "Home", activeIcon: "home", inactiveIcon: "home-outline" },
  { name: "explore", label: "Explore", activeIcon: "search", inactiveIcon: "search-outline" },
  { name: "profile", label: "Profile", activeIcon: "person", inactiveIcon: "person-outline" },
];

// ─── Isolated tab item so each can own its own scale animation ─────────────
function TabItem({
  tab,
  isFocused,
  accessibilityLabel,
  onPress,
  onLongPress,
}: {
  tab: (typeof TABS)[number];
  isFocused: boolean;
  accessibilityLabel: string | undefined;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const iconScale = useActiveScale(isFocused);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      className="flex-1 items-center justify-center py-5 gap-1.5"
    >
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <Ionicons
          name={isFocused ? tab.activeIcon : tab.inactiveIcon}
          size={24}
          color={isFocused ? "#8B5DFF" : "#666876"}
        />
      </Animated.View>
      <Text
        className={`text-xs font-rubik-medium leading-4 ${
          isFocused ? "text-purple" : "text-comet"
        }`}
      >
        {tab.label}
      </Text>
    
    </TouchableOpacity>
  );
}

// ─── Tab bar ────────────────────────────────────────────────────────────────
export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
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
      <View className="flex-row items-center">
        {TABS.map((tab, index) => {
          const route = state.routes[index];
          if (!route) return null;

          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

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
            <TabItem
              key={tab.name}
              tab={tab}
              isFocused={isFocused}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}
