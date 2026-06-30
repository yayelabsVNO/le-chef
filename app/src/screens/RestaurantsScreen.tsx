import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { colors, spacing, typography } from "../theme/tokens";

/**
 * Рестораны — лёгкая заглушка для MVP (цель кнопки «Поесть вне дома», не тупик).
 * Полный экран (карта + фильтры) реализуется позже по api-contract.md.
 */
const MOCK = [
  { id: "1", name: "Trattoria Roma", cuisine: "Итальянская", rating: 4.7 },
  { id: "2", name: "Seoul Kitchen", cuisine: "Корейская", rating: 4.6 },
  { id: "3", name: "Burger House", cuisine: "Американская", rating: 4.4 },
];

export function RestaurantsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Рестораны рядом</Text>
      {MOCK.map((r) => (
        <Card key={r.id} style={styles.card}>
          <View style={styles.pic}>
            <MaterialCommunityIcons name="storefront-outline" size={28} color={colors.primary} />
          </View>
          <View style={styles.body}>
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.cuisine}>{r.cuisine}</Text>
          </View>
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" size={16} color={colors.primary} />
            <Text style={styles.ratingText}>{r.rating}</Text>
          </View>
        </Card>
      ))}
      <Text style={styles.note}>Карта и фильтры — в следующей итерации.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
  card: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  pic: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1 },
  name: { ...typography.heading, color: colors.text },
  cuisine: { ...typography.caption },
  rating: { flexDirection: "row", alignItems: "center", gap: 2 },
  ratingText: { ...typography.body, color: colors.text },
  note: { ...typography.caption, textAlign: "center", marginTop: spacing.sm },
});
