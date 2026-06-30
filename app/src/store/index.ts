import { create } from "zustand";

/**
 * Каркас глобального состояния (Zustand). app-architect задаёт срезы и их
 * границы; конкретные действия/селекторы наполняет frontend-dev.
 *
 * Срезы намеренно разделены по подсистемам, чтобы игры и бронь шефа можно
 * было развивать независимо (см. ADR-0003, точки расширения).
 */

export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
}

interface ProfileState {
  /** Ленивый вход: null = гость. Токен ставится только при сохранении. */
  token: string | null;
  preferences: Record<string, unknown>; // питается результатами квиза/сканов
  setToken: (t: string | null) => void;
}

interface CartState {
  items: { recipeId?: string; name: string }[];
  add: (item: { recipeId?: string; name: string }) => void;
  clear: () => void;
}

interface GroceryState {
  items: GroceryItem[];
  toggle: (id: string) => void;
}

export const useProfile = create<ProfileState>((set) => ({
  token: null,
  preferences: {},
  setToken: (token) => set({ token }),
}));

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] }),
}));

export const useGrocery = create<GroceryState>((set) => ({
  items: [],
  toggle: (id) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    })),
}));
