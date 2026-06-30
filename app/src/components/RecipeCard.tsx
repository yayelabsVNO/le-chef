import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "./Card";
import { RecipeImage } from "./RecipeImage";
import { colors, spacing, typography } from "../theme/tokens";
import type { MockRecipe } from "../data/recipes";

/** Переиспользуемая карточка рецепта (Recipes, Recommendations, Favorites). */
export function RecipeCard({ recipe, onPress }: { recipe: MockRecipe; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={styles.card}>
      <RecipeImage emoji={recipe.emoji} color={recipe.color} height={140} />
      <View style={styles.body}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {recipe.description}
        </Text>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="clock-outline" size={16} color={colors.textMuted} />
          <Text style={styles.meta}>{recipe.minutes} мин</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md, padding: spacing.sm },
  body: { padding: spacing.sm, gap: 4 },
  title: { ...typography.heading, color: colors.text },
  desc: { ...typography.body, color: colors.textMuted },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  meta: { ...typography.caption },
});
