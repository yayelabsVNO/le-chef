import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { colors, radius, spacing, typography } from "../theme/tokens";
import { MOCK_SCAN_RESULT } from "../data/recipes";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/**
 * Экран камеры (заглушка). По тапу "Scan photo" возвращает мок-список
 * ингредиентов; затем ведёт в каталог рецептов (без тупиков).
 */
export function ScanScreen() {
  const navigation = useNavigation<Nav>();
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<{ name: string; confidence: number }[] | null>(null);

  const scan = () => {
    setScanning(true);
    // Имитация распознавания (реальный вызов — POST /scan/photo у backend-dev).
    setTimeout(() => {
      setDetected(MOCK_SCAN_RESULT);
      setScanning(false);
    }, 700);
  };

  return (
    <Screen>
      <Text style={styles.title}>Сканировать продукты</Text>

      <View style={styles.frame}>
        <View style={styles.corner} />
        <MaterialCommunityIcons name="camera-outline" size={64} color={colors.primary} />
        <Text style={styles.frameHint}>Наведите камеру на продукты</Text>
      </View>

      <Button
        label={scanning ? "Распознаём…" : "Scan photo"}
        icon="camera"
        onPress={scan}
      />

      {detected && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Найдено:</Text>
          <View style={styles.chips}>
            {detected.map((d) => (
              <View key={d.name} style={styles.chip}>
                <Text style={styles.chipText}>
                  {d.name} · {Math.round(d.confidence * 100)}%
                </Text>
              </View>
            ))}
          </View>
          <Button
            label="Найти рецепты"
            icon="silverware-variant"
            variant="secondary"
            onPress={() => navigation.navigate("Tabs", { screen: "Categories" })}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginVertical: spacing.md },
  frame: {
    height: 300,
    borderRadius: radius.card,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  corner: { position: "absolute" },
  frameHint: { ...typography.caption },
  result: { marginTop: spacing.lg, gap: spacing.md },
  resultTitle: { ...typography.heading, color: colors.text },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { ...typography.body, color: colors.text },
});
