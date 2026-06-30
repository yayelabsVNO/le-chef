/**
 * Дизайн-токены Le Chef. Единый источник правды для цветов, отступов и
 * скруглений. frontend-dev строит компоненты ТОЛЬКО на этих токенах —
 * без хардкода цветов в экранах.
 */
export const colors = {
  primary: "#F26B1D", // фирменный оранжевый (логотип-колпак, акценты, активный таб)
  primaryDark: "#D4571A",
  background: "#FFFFFF", // белый фон
  surface: "#FFF7F1", // тёплый фон карточек
  border: "#F0E2D6",
  text: "#231C16",
  textMuted: "#8A7C6F",
  success: "#2E9E5B",
  danger: "#D7402B",
} as const;

export const radius = {
  card: 20, // крупные скруглённые карточки
  pill: 999,
  input: 14,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typography = {
  title: { fontSize: 24, fontWeight: "700" as const },
  heading: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  caption: { fontSize: 13, fontWeight: "400" as const, color: colors.textMuted },
} as const;

/** Мягкая тень для карточек (iOS + Android). */
export const shadow = {
  card: {
    shadowColor: "#7A4A1E",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
} as const;

export const theme = { colors, radius, spacing, typography, shadow };
export type Theme = typeof theme;
