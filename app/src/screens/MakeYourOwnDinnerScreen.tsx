import { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { Chip } from "../components/Chip";
import { RecipeCard } from "../components/RecipeCard";
import { colors, spacing, typography } from "../theme/tokens";
import { RECIPES } from "../data/recipes";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Частые продукты для быстрого выбора (MVP). */
const PANTRY = [
  "Яйцо", "Помидор", "Сыр", "Рис", "Говядина", "Шпинат",
  "Мука", "Молоко", "Чеснок", "Свинина",
];

/** Сколько ингредиентов рецепта есть в выбранном наборе. */
function matchCount(recipeIngredients: string[], selected: Set<string>): number {
  return recipeIngredients.filter((name) =>
    [...selected].some((s) => name.toLowerCase().includes(s.toLowerCase())),
  ).length;
}

/**
 * Make Your Own Dinner: выбираем продукты из наличия → рецепты, ранжированные
 * по числу совпавших ингредиентов. Без тупиков: карточка → RecipeDetail.
 */
export function MakeYourOwnDinnerScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  const matches = useMemo(() => {
    if (selected.size === 0) return [];
    return RECIPES.map((r) => ({
      recipe: r,
      score: matchCount(r.ingredients.map((i) => i.name), selected),
    }))
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selected]);

  return (
    <Screen>
      <Text style={styles.title}>Что есть дома?</Text>
      <Text style={styles.hint}>Отметьте продукты — подберём, что приготовить.</Text>

      <View style={styles.chips}>
        {PANTRY.map((name) => (
          <Chip
            key={name}
            label={name}
            selected={selected.has(name)}
            onPress={() => toggle(name)}
          />
        ))}
      </View>

      {selected.size > 0 && (
        <>
          <Text style={styles.section}>
            {matches.length ? "Можно приготовить" : "Совпадений нет — попробуйте другие продукты"}
          </Text>
          {matches.map(({ recipe, score }) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => navigation.navigate("RecipeDetail", { recipeId: recipe.id })}
            />
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginTop: spacing.md },
  hint: { ...typography.caption, marginBottom: spacing.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  section: { ...typography.heading, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
});
