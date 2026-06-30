import { Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/tokens";

type Variant = "primary" | "secondary";

/** Основная кнопка дизайн-системы. primary — оранжевая, secondary — контурная. */
export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  style?: ViewStyle;
}) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={isPrimary ? "#fff" : colors.primary}
        />
      )}
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: "#fff", borderWidth: 2, borderColor: colors.primary },
  pressed: { opacity: 0.85 },
  label: { ...typography.heading },
  labelPrimary: { color: "#fff" },
  labelSecondary: { color: colors.primary },
});
