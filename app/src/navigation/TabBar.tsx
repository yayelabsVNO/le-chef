import { View, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, shadow } from "../theme/tokens";

/**
 * Кастомный нижний таб-бар Le Chef: оранжевый фон, 5 слотов с приподнятой
 * центральной круглой кнопкой-лого (контур колпака). Центр — действие «домой/игры».
 */
const ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Home: "home-variant",
  Categories: "view-grid-outline",
  Cart: "cart-outline",
  Profile: "account-outline",
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const routes = state.routes; // [Home, Categories, Cart, Profile]

  const renderTab = (index: number) => {
    const route = routes[index];
    const focused = state.index === index;
    return (
      <Pressable
        key={route.key}
        style={styles.tab}
        hitSlop={8}
        onPress={() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        }}
      >
        <MaterialCommunityIcons
          name={ICONS[route.name] ?? "circle-outline"}
          size={26}
          color={focused ? "#fff" : "rgba(255,255,255,0.65)"}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom || 8 }]}>
      {renderTab(0)}
      {renderTab(1)}

      {/* Центральная кнопка-лого: возврат на Home/игры */}
      <Pressable
        style={styles.center}
        onPress={() => navigation.navigate("Home")}
        hitSlop={8}
      >
        <MaterialCommunityIcons name="chef-hat" size={30} color={colors.primary} />
      </Pressable>

      {renderTab(2)}
      {renderTab(3)}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 44 },
  center: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28, // приподнята над баром
    borderWidth: 4,
    borderColor: colors.primary,
    ...shadow.card,
  },
});
