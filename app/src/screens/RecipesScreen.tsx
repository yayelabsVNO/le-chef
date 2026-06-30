import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { RecipeCard } from "../components/RecipeCard";
import { colors, spacing, typography } from "../theme/tokens";
import { RECIPES } from "../data/recipes";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Каталог рецептов (MVP: мок-данные). Карточка → RecipeDetail. */
export function RecipesScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <Screen>
      <Text style={styles.title}>Рецепты</Text>
      {RECIPES.map((r) => (
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
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
});
