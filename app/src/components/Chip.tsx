import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../theme/tokens";

/** Небольшой выбираемый тег (выбор продуктов, диет, фильтров). */
export function Chip({
  label,
  selected = false,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.on : styles.off,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected ? styles.labelOn : styles.labelOff]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  on: { backgroundColor: colors.primary },
  off: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.85 },
  label: { ...typography.body },
  labelOn: { color: "#fff" },
  labelOff: { color: colors.text },
});
