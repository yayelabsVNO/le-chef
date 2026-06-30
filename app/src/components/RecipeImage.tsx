import { View, Text, StyleSheet, type ViewStyle } from "react-native";
import { radius } from "../theme/tokens";

/**
 * Фото-плейсхолдер рецепта: цветной фон + крупное эмодзи. Заменяет реальные
 * ассеты в MVP. Когда появятся фото из API, тут будет <Image source={{uri}} />.
 */
export function RecipeImage({
  emoji,
  color,
  height = 160,
  style,
}: {
  emoji: string;
  color: string;
  height?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.box, { backgroundColor: color, height }, style]}>
      <Text style={[styles.emoji, { fontSize: height * 0.42 }]}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    borderRadius: radius.card,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  emoji: { textAlign: "center" },
});
