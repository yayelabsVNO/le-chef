import { create } from "zustand";

/**
 * Глобальное состояние (Zustand). Срезы разделены по подсистемам, чтобы игры и
 * бронь шефа развивались независимо (ADR-0003).
 *
 * MVP: активно используется срез Grocery (чек-лист). Профиль/корзина — заделы.
 */

export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
}

interface ProfileState {
  token: string | null; // null = гость; ленивый вход
  preferences: Record<string, unknown>;
  setToken: (t: string | null) => void;
}

interface GroceryState {
  items: GroceryItem[];
  /** Добавить ингредиенты (по имени), без дублей. */
  addItems: (names: string[]) => void;
  toggle: (id: string) => void;
  clear: () => void;
}

export const useProfile = create<ProfileState>((set) => ({
  token: null,
  preferences: {},
  setToken: (token) => set({ token }),
}));

let groceryCounter = 0;

export const useGrocery = create<GroceryState>((set) => ({
  items: [],
  addItems: (names) =>
    set((s) => {
      const existing = new Set(s.items.map((i) => i.name.toLowerCase()));
      const fresh = names
        .filter((n) => !existing.has(n.toLowerCase()))
        .map((name) => ({ id: `g_${groceryCounter++}`, name, checked: false }));
      return { items: [...s.items, ...fresh] };
    }),
  toggle: (id) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    })),
  clear: () => set({ items: [] }),
}));
