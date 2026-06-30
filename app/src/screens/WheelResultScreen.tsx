import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { RecipeImage } from "../components/RecipeImage";
import { Card } from "../components/Card";
import { colors, spacing, typography } from "../theme/tokens";
import { recipeById, RECIPES } from "../data/recipes";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, "WheelResult">;

/**
 * Результат колеса. ИНВАРИАНТ (navigation.md): три перехода «дальше в дело»,
 * никаких тупиков.
 */
export function WheelResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const recipeId = route.params.links.recipeId ?? RECIPES[0].id;
  const recipe = recipeById(recipeId) ?? RECIPES[0];

  return (
    <Screen>
      <Text style={styles.kicker}>Колесо выбрало</Text>
      <Card style={styles.hero}>
        <RecipeImage emoji={recipe.emoji} color={recipe.color} height={180} />
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.desc}>{recipe.description}</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          label="Готовить дома"
          icon="pot-steam"
          onPress={() => navigation.navigate("RecipeDetail", { recipeId: recipe.id })}
        />
        <Button
          label="Что из наличия"
          icon="camera"
          variant="secondary"
          onPress={() => navigation.navigate("ScanPhoto")}
        />
        <Button
          label="Поесть вне дома"
          icon="silverware-fork-knife"
          variant="secondary"
          onPress={() => navigation.navigate("Restaurants", {})}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { ...typography.caption, textAlign: "center", marginTop: spacing.sm },
  hero: { alignItems: "center", gap: spacing.sm, marginVertical: spacing.md },
  title: { ...typography.title, color: colors.text },
  desc: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  actions: { gap: spacing.md, marginTop: spacing.md },
});
