import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { RecipeImage } from "../components/RecipeImage";
import { IngredientRow } from "../components/IngredientRow";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme/tokens";
import { recipeById, RECIPES } from "../data/recipes";
import { useGrocery } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, "RecipeDetail">;

export function RecipeDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const recipe = recipeById(route.params.recipeId) ?? RECIPES[0];
  const addItems = useGrocery((s) => s.addItems);

  const addToGrocery = () => {
    addItems(recipe.ingredients.map((i) => i.name));
    // Без тупиков: ведём пользователя в корзину/чек-лист.
    navigation.navigate("Tabs", { screen: "Cart" });
  };

  return (
    <Screen>
      <RecipeImage emoji={recipe.emoji} color={recipe.color} height={200} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.desc}>{recipe.description}</Text>

      <Text style={styles.section}>Ингредиенты</Text>
      {recipe.ingredients.map((ing) => (
        <IngredientRow key={ing.name} name={ing.name} amount={ing.amount} />
      ))}

      <Text style={styles.section}>Шаги</Text>
      {recipe.steps.map((step, i) => (
        <View key={i} style={styles.step}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <Button
        label="Добавить недостающее в Grocery"
        icon="cart-plus"
        onPress={addToGrocery}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginTop: spacing.md },
  desc: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  section: { ...typography.heading, color: colors.text, marginTop: spacing.lg, marginBottom: 4 },
  step: { flexDirection: "row", gap: spacing.sm, paddingVertical: spacing.sm, alignItems: "flex-start" },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: { color: "#fff", fontWeight: "700" },
  stepText: { ...typography.body, color: colors.text, flex: 1, lineHeight: 22 },
});
