import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { IngredientRow } from "../components/IngredientRow";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme/tokens";
import { useGrocery } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Grocery: чек-лист (оранжевый круг с галочкой / серый круг). */
export function GroceryScreen() {
  const navigation = useNavigation<Nav>();
  const items = useGrocery((s) => s.items);
  const toggle = useGrocery((s) => s.toggle);

  if (items.length === 0) {
    return (
      <Screen scroll={false}>
        <Text style={styles.title}>Grocery</Text>
        <View style={styles.empty}>
          <MaterialCommunityIcons name="cart-outline" size={64} color={colors.border} />
          <Text style={styles.emptyText}>Список пуст</Text>
          <Text style={styles.emptyHint}>
            Откройте рецепт и добавьте недостающие ингредиенты сюда.
          </Text>
          <Button
            label="К рецептам"
            variant="secondary"
            icon="silverware-variant"
            onPress={() => navigation.navigate("Tabs", { screen: "Categories" })}
          />
        </View>
      </Screen>
    );
  }

  const remaining = items.filter((i) => !i.checked).length;

  return (
    <Screen>
      <Text style={styles.title}>Grocery</Text>
      <Text style={styles.subtitle}>Осталось купить: {remaining} из {items.length}</Text>
      {items.map((item) => (
        <IngredientRow
          key={item.id}
          name={item.name}
          checkable
          checked={item.checked}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.caption, marginBottom: spacing.sm },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.sm, padding: spacing.lg },
  emptyText: { ...typography.heading, color: colors.text },
  emptyHint: { ...typography.body, color: colors.textMuted, textAlign: "center", marginBottom: spacing.md },
});
