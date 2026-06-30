import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, spacing, typography, shadow } from "../theme/tokens";

/**
 * Кнопка-«пузырь» из дизайн-системы (квиз, Make Your Own Dinner).
 * selected — залитая оранжевым; иначе контурная.
 */
export function BubbleButton({
  label,
  onPress,
  selected = false,
}: {
  label: string;
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bubble,
        selected ? styles.on : styles.off,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected ? styles.labelOn : styles.labelOff]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  on: { backgroundColor: colors.primary },
  off: { backgroundColor: "#fff", borderWidth: 2, borderColor: colors.border },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  label: { ...typography.heading },
  labelOn: { color: "#fff" },
  labelOff: { color: colors.text },
});
