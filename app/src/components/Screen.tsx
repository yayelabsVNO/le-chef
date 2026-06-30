import { ScrollView, View, StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../theme/tokens";

/** Обёртка экрана: белый фон, safe-area, опциональный скролл. */
export function Screen({
  children,
  scroll = true,
  style,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();
  const pad = { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.md };

  if (scroll) {
    return (
      <ScrollView
        style={styles.bg}
        contentContainerStyle={[pad, { paddingBottom: spacing.xl }, style]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
  return <View style={[styles.bg, pad, { flex: 1 }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.background },
});
