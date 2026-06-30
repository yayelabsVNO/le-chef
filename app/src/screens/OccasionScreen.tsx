import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { BubbleButton } from "../components/BubbleButton";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme/tokens";
import type { OccasionType, RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Поводы (api-contract: GET /occasions). */
const OCCASIONS: { label: string; value: OccasionType }[] = [
  { label: "Business Meeting", value: "business_meeting" },
  { label: "Partner", value: "partner" },
  { label: "Friends", value: "friends" },
  { label: "Company", value: "company" },
];

/**
 * Occasion (navigation.md): выбор повода → 4 ветки.
 * Make food at home → каталог; Choose a place → Restaurants;
 * Book the Chef → BookingFlow; Chef's online → BookingFlow (онлайн-вариант).
 * Без тупиков: до выбора повода ветки скрыты.
 */
export function OccasionScreen() {
  const navigation = useNavigation<Nav>();
  const [occasion, setOccasion] = useState<OccasionType | null>(null);

  return (
    <Screen>
      <Text style={styles.title}>Какой повод?</Text>
      <View style={styles.options}>
        {OCCASIONS.map((o) => (
          <BubbleButton
            key={o.value}
            label={o.label}
            selected={occasion === o.value}
            onPress={() => setOccasion(o.value)}
          />
        ))}
      </View>

      {occasion && (
        <View style={styles.branches}>
          <Text style={styles.section}>Как организуем?</Text>
          <Button
            label="Готовить дома"
            icon="pot-steam"
            variant="secondary"
            onPress={() => navigation.navigate("MakeYourOwnDinner")}
          />
          <Button
            label="Выбрать место"
            icon="map-marker-outline"
            variant="secondary"
            onPress={() => navigation.navigate("Restaurants", { occasion })}
          />
          <Button
            label="Позвать шефа"
            icon="chef-hat"
            onPress={() => navigation.navigate("BookingFlow", { occasion })}
          />
          <Button
            label="Шеф онлайн"
            icon="video-outline"
            variant="secondary"
            onPress={() => navigation.navigate("BookingFlow", { occasion })}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginVertical: spacing.md },
  options: { gap: spacing.md },
  branches: { gap: spacing.md, marginTop: spacing.xl },
  section: { ...typography.heading, color: colors.text },
});
