import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, typography } from "../theme/tokens";

/**
 * Логотип Le Chef: контур поварского колпака + подпись «Le Chef».
 * size управляет масштабом иконки; подпись опциональна.
 */
export function Logo({ size = 64, showLabel = true }: { size?: number; showLabel?: boolean }) {
  return (
    <View style={styles.wrap}>
      <MaterialCommunityIcons name="chef-hat" size={size} color={colors.primary} />
      {showLabel && <Text style={[styles.label, { fontSize: size * 0.42 }]}>Le Chef</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: 4 },
  label: { ...typography.title, color: colors.primary, fontStyle: "italic" },
});
