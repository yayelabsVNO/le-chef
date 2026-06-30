import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { RecipeCard } from "../components/RecipeCard";
import { Card } from "../components/Card";
import { colors, spacing, typography } from "../theme/tokens";
import { RECIPES } from "../data/recipes";
import { useProfile } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Лимит по времени из предпочтения квиза. */
function timeLimit(pref?: string): number {
  if (pref === "15 минут") return 20;
  if (pref === "30 минут") return 30;
  return 999;
}

/**
 * Recommendations: подборка по предпочтениям из профиля (пишутся квизом/сканами).
 * Замыкает петлю fun → utility (navigation.md). Без предпочтений — популярное.
 */
export function RecommendationsScreen() {
  const navigation = useNavigation<Nav>();
  const prefs = useProfile((s) => s.preferences) as Record<string, string>;
  const hasPrefs = Object.keys(prefs).length > 0;

  const limit = timeLimit(prefs.time);
  const ranked = [...RECIPES]
    .filter((r) => r.minutes <= limit)
    .sort((a, b) => a.minutes - b.minutes);
  const list = ranked.length ? ranked : RECIPES;

  return (
    <Screen>
      <Text style={styles.title}>Рекомендации</Text>

      {hasPrefs ? (
        <Card style={styles.banner}>
          <MaterialCommunityIcons name="star-four-points" size={22} color={colors.primary} />
          <Text style={styles.bannerText}>
            На основе вашего квиза: {Object.values(prefs).join(" · ")}
          </Text>
        </Card>
      ) : (
        <Text style={styles.hint}>
          Пройдите квиз — и подборка станет точнее под ваши вкусы.
        </Text>
      )}

      <View style={{ height: spacing.md }} />
      {list.map((r) => (
        <RecipeCard
          key={r.id}
          recipe={r}
          onPress={() => navigation.navigate("RecipeDetail", { recipeId: r.id })}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginVertical: spacing.md },
  banner: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  bannerText: { ...typography.body, color: colors.text, flex: 1 },
  hint: { ...typography.caption, marginTop: spacing.sm },
});
