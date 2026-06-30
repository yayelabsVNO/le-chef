import { Pressable, View, StyleSheet, type ViewStyle } from "react-native";
import { colors, radius, shadow, spacing } from "../theme/tokens";

/**
 * Скруглённая карточка с мягкой тенью — базовый строительный блок (дизайн-система).
 * Если передан onPress — карточка кликабельна.
 */
export function Card({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.md,
    ...shadow.card,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
});
