import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../theme/tokens";

/**
 * Строка ингредиента. Два режима:
 *  - простой (RecipeDetail): имя + количество;
 *  - чек-лист (Grocery): тогл — оранжевый круг с галочкой / серый круг.
 */
export function IngredientRow({
  name,
  amount,
  checkable = false,
  checked = false,
  onToggle,
}: {
  name: string;
  amount?: string;
  checkable?: boolean;
  checked?: boolean;
  onToggle?: () => void;
}) {
  const Inner = (
    <View style={styles.row}>
      {checkable && (
        <View style={[styles.circle, checked ? styles.circleOn : styles.circleOff]}>
          {checked && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
        </View>
      )}
      <Text style={[styles.name, checked && styles.nameChecked]}>{name}</Text>
      {amount ? <Text style={styles.amount}>{amount}</Text> : null}
    </View>
  );

  if (checkable && onToggle) {
    return (
      <Pressable onPress={onToggle} hitSlop={8} style={styles.press}>
        {Inner}
      </Pressable>
    );
  }
  return Inner;
}

const styles = StyleSheet.create({
  press: { borderRadius: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    minHeight: 44, // тач-зона ≥ 44pt
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  circleOn: { backgroundColor: colors.primary },
  circleOff: { borderWidth: 2, borderColor: colors.border },
  name: { ...typography.body, color: colors.text, flex: 1 },
  nameChecked: { color: colors.textMuted, textDecorationLine: "line-through" },
  amount: { ...typography.caption },
});
