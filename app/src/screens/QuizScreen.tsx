import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { BubbleButton } from "../components/BubbleButton";
import { Button } from "../components/Button";
import { RecipeCard } from "../components/RecipeCard";
import { Card } from "../components/Card";
import { colors, spacing, typography } from "../theme/tokens";
import { RECIPES, type MockRecipe } from "../data/recipes";
import { useProfile } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Вопросы квиза (mood / повод / время / диета) — navigation.md. */
const QUESTIONS = [
  { key: "mood", title: "Какое настроение?", options: ["Лёгкое", "Сытное", "Сладкое", "Острое"] },
  { key: "occasion", title: "По какому поводу?", options: ["Будни", "Гости", "Свидание", "Компания"] },
  { key: "time", title: "Сколько есть времени?", options: ["15 минут", "30 минут", "Час и больше"] },
  { key: "diet", title: "Предпочтения по диете?", options: ["Любая", "Вегетарианская", "Без глютена", "Низкоугл."] },
] as const;

/** Подобрать 3 рецепта (MVP: по времени из ответа, иначе первые три). */
function pickRecipes(answers: Record<string, string>): MockRecipe[] {
  const limit = answers.time === "15 минут" ? 20 : answers.time === "30 минут" ? 30 : 999;
  const fit = RECIPES.filter((r) => r.minutes <= limit);
  return (fit.length >= 3 ? fit : RECIPES).slice(0, 3);
}

export function QuizScreen() {
  const navigation = useNavigation<Nav>();
  const setPreferences = useProfile((s) => s.setPreferences);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= QUESTIONS.length;

  const choose = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step + 1 >= QUESTIONS.length) {
      // Сабмит квиза пишет предпочтения в профиль → улучшает Recommendations.
      setPreferences(next);
    }
    setStep((s) => s + 1);
  };

  // ── Результат (ResultSet: рецепты + ресторан + позвать шефа; без тупиков) ──
  if (done) {
    const recipes = pickRecipes(answers);
    return (
      <Screen>
        <Text style={styles.resultTitle}>Готово! Вот что мы подобрали</Text>
        <Text style={styles.kicker}>
          {Object.values(answers).join(" · ")}
        </Text>

        <Text style={styles.section}>Рецепты для вас</Text>
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={() => navigation.navigate("RecipeDetail", { recipeId: r.id })}
          />
        ))}

        <Text style={styles.section}>Или поесть вне дома</Text>
        <Card style={styles.offerRow}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={colors.primary} />
          <Text style={styles.offerText}>Подобрать ресторан рядом</Text>
        </Card>
        <Button
          label="Выбрать ресторан"
          icon="map-marker-outline"
          variant="secondary"
          onPress={() => navigation.navigate("Restaurants", {})}
        />
        <Button
          label="Позвать шефа"
          icon="chef-hat"
          variant="secondary"
          style={{ marginTop: spacing.sm }}
          onPress={() => navigation.navigate("Occasion")}
        />

        <Button
          label="Пройти заново"
          icon="refresh"
          variant="secondary"
          style={{ marginTop: spacing.lg }}
          onPress={() => {
            setAnswers({});
            setStep(0);
          }}
        />
      </Screen>
    );
  }

  // ── Шаг квиза ──
  const q = QUESTIONS[step];
  return (
    <Screen>
      <View style={styles.dots}>
        {QUESTIONS.map((_, i) => (
          <View key={i} style={[styles.dot, i <= step ? styles.dotOn : styles.dotOff]} />
        ))}
      </View>
      <Text style={styles.step}>Вопрос {step + 1} из {QUESTIONS.length}</Text>
      <Text style={styles.question}>{q.title}</Text>

      <View style={styles.options}>
        {q.options.map((opt) => (
          <BubbleButton
            key={opt}
            label={opt}
            selected={answers[q.key] === opt}
            onPress={() => choose(q.key, opt)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: "row", gap: 8, justifyContent: "center", marginTop: spacing.md },
  dot: { height: 8, borderRadius: 4, flex: 1 },
  dotOn: { backgroundColor: colors.primary },
  dotOff: { backgroundColor: colors.border },
  step: { ...typography.caption, textAlign: "center", marginTop: spacing.md },
  question: { ...typography.title, color: colors.text, textAlign: "center", marginVertical: spacing.lg },
  options: { gap: spacing.md },
  resultTitle: { ...typography.title, color: colors.text, marginTop: spacing.md },
  kicker: { ...typography.caption, marginBottom: spacing.sm },
  section: { ...typography.heading, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  offerRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  offerText: { ...typography.body, color: colors.text },
});
