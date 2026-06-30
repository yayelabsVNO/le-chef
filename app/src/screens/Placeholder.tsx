import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";

/**
 * Заглушка экрана. app-architect задаёт каркас навигации; конкретную вёрстку
 * каждого экрана делает frontend-dev, заменяя Placeholder на реальный компонент
 * в screens registry. Сам экран не несёт бизнес-логики.
 */
export function Placeholder({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.note}>Экран-заглушка — реализует frontend-dev.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: { ...typography.title, color: colors.text },
  note: { ...typography.caption },
});
