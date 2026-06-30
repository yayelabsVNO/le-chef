import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { BubbleButton } from "../components/BubbleButton";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme/tokens";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, "BookingFlow">;

const OCCASION_LABEL: Record<string, string> = {
  business_meeting: "Business Meeting",
  partner: "Partner",
  friends: "Friends",
  company: "Company",
};

/** Ближайшие 5 дат для выбора (метка + ISO-ключ). */
function nextDates(): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const base = new Date();
  for (let i = 1; i <= 5; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" }),
    });
  }
  return out;
}

/**
 * BookingFlow (navigation.md: Book the Chef → дата). Выбор даты → подтверждение.
 * Оплата — внешний провайдер; данные карт НЕ храним (api-contract).
 * Без тупиков: после брони — переход на главную.
 */
export function BookingFlowScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const occasion = route.params?.occasion;

  const [dates] = useState(nextDates);
  const [date, setDate] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    const chosen = dates.find((d) => d.key === date);
    return (
      <Screen>
        <View style={styles.success}>
          <View style={styles.successIcon}>
            <MaterialCommunityIcons name="check" size={48} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Бронь подтверждена!</Text>
          <Text style={styles.successText}>
            Шеф приедет {chosen?.label}
            {occasion ? ` · ${OCCASION_LABEL[occasion]}` : ""}.
          </Text>
          <Text style={styles.note}>
            Оплата пройдёт через защищённого провайдера — данные карты мы не храним.
          </Text>
          <Button
            label="На главную"
            icon="home-variant"
            onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Бронь шефа</Text>

      <Card style={styles.chef}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="chef-hat" size={28} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.chefName}>Chef Marco</Text>
          <Text style={styles.chefMeta}>Итальянская кухня · ⭐ 4.9</Text>
        </View>
      </Card>

      {occasion && <Text style={styles.occasion}>Повод: {OCCASION_LABEL[occasion]}</Text>}

      <Text style={styles.section}>Выберите дату</Text>
      <View style={styles.dates}>
        {dates.map((d) => (
          <BubbleButton
            key={d.key}
            label={d.label}
            selected={date === d.key}
            onPress={() => setDate(d.key)}
          />
        ))}
      </View>

      <Button
        label={date ? "Подтвердить бронь" : "Сначала выберите дату"}
        icon="calendar-check"
        onPress={() => date && setConfirmed(true)}
        style={{ marginTop: spacing.xl, opacity: date ? 1 : 0.5 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginVertical: spacing.md },
  chef: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  chefName: { ...typography.heading, color: colors.text },
  chefMeta: { ...typography.caption },
  occasion: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
  section: { ...typography.heading, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  dates: { gap: spacing.sm },
  success: { alignItems: "center", gap: spacing.md, paddingTop: spacing.xl },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: { ...typography.title, color: colors.text },
  successText: { ...typography.body, color: colors.text, textAlign: "center" },
  note: { ...typography.caption, textAlign: "center", marginBottom: spacing.md },
});
