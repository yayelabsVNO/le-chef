import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { colors, spacing, typography } from "../theme/tokens";

/** Профиль (MVP: статичная карточка Tim S.). Вход ленивый — добавит backend-dev. */
export function ProfileScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Профиль</Text>
      <Card style={styles.card}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={40} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Tim S.</Text>
          <Text style={styles.email}>tim@lechef.app</Text>
        </View>
      </Card>

      {[
        { icon: "book-open-variant", label: "My recepies" },
        { icon: "heart-outline", label: "My favorites" },
        { icon: "cog-outline", label: "Настройки" },
      ].map((row) => (
        <Card key={row.label} style={styles.row}>
          <MaterialCommunityIcons name={row.icon as never} size={22} color={colors.primary} />
          <Text style={styles.rowText}>{row.label}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
  card: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { ...typography.heading, color: colors.text },
  email: { ...typography.caption },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm },
  rowText: { ...typography.body, color: colors.text, flex: 1 },
});
