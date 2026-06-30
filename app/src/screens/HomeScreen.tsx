import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { Logo } from "../components/Logo";
import { Button } from "../components/Button";
import { colors, radius, spacing, typography, shadow } from "../theme/tokens";
import { RECIPES } from "../data/recipes";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  // Колесо: выбираем случайное блюдо и ведём в WheelResult (без тупиков).
  const spin = () => {
    const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    navigation.navigate("WheelResult", {
      result: recipe.title,
      links: { recipeId: recipe.id },
    });
  };

  const openCatalog = () => navigation.navigate("Tabs", { screen: "Categories" });
  const openQuiz = () => navigation.navigate("Quiz");

  return (
    <Screen>
      <View style={styles.logoBlock}>
        <Logo size={88} />
        <Text style={styles.tagline}>Что приготовить сегодня?</Text>
      </View>

      <Pressable style={styles.search} onPress={openCatalog}>
        <MaterialCommunityIcons name="magnify" size={22} color={colors.textMuted} />
        <Text style={styles.searchText}>Поиск рецептов и продуктов</Text>
      </Pressable>

      <View style={styles.games}>
        <Button label="Spin the Wheel" icon="ferris-wheel" onPress={spin} />
        <Button label="Quiz" icon="head-question-outline" variant="secondary" onPress={openQuiz} />
      </View>

      <Text style={styles.hint}>
        Крутаните колесо — оно подскажет блюдо и куда двигаться дальше.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoBlock: { alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.lg },
  tagline: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    ...shadow.card,
    marginBottom: spacing.xl,
  },
  searchText: { ...typography.body, color: colors.textMuted },
  games: { gap: spacing.md },
  hint: { ...typography.caption, textAlign: "center", marginTop: spacing.lg },
});
