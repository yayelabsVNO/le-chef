/**
 * Типизированный клиент к бэкенду Le Chef. Зеркалит docs/api-contract.md —
 * это контракт между frontend-dev и backend-dev. Новый эндпоинт сперва в
 * api-contract.md, затем тут, затем в /api.
 *
 * Аутентификация ленивая: Bearer-токен добавляется только когда он есть
 * (сохранение favorites / cart / booking). Гостю доступен весь просмотр.
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

let authToken: string | null = null;
export function setAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string>),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return (await res.json()) as T;
}

// Минимальные типы ответов; полные схемы — за recipe-curator / backend-dev.
export interface RecipeSummary {
  id: string;
  title: string;
  country?: string;
  category?: string;
}
export interface WheelSpinResult {
  result: string;
  links: { recipe_id?: string; scan?: boolean; restaurants_query?: string };
}

export const api = {
  // Рецепты
  listRecipes: (q?: Record<string, string>) =>
    request<{ items: RecipeSummary[] }>(`/recipes${toQuery(q)}`),
  getRecipe: (id: string) => request<unknown>(`/recipes/${id}`),
  recommendations: () => request<{ items: RecipeSummary[] }>("/recommendations"),

  // Распознавание
  scanPhoto: (form: FormData) =>
    request<{ ingredients: { name: string; confidence: number }[] }>("/scan/photo", {
      method: "POST",
      body: form,
      headers: {}, // FormData сам выставит multipart boundary
    }),

  // Каталог и покупки
  catalogTypes: () => request<unknown>("/catalog/types"),
  getGrocery: () => request<unknown>("/grocery"),
  getCart: () => request<unknown>("/cart"),

  // Игры (мост fun → utility)
  wheelOptions: () => request<unknown>("/wheel/options"),
  wheelSpin: () => request<WheelSpinResult>("/wheel/spin", { method: "POST" }),
  quiz: () => request<unknown>("/quiz"),
  submitQuiz: (answers: unknown) =>
    request<unknown>("/quiz/submit", { method: "POST", body: JSON.stringify(answers) }),

  // Рестораны и шефы
  restaurants: (q?: Record<string, string>) => request<unknown>(`/restaurants${toQuery(q)}`),
  occasions: () => request<unknown>("/occasions"),
  book: (payload: unknown) =>
    request<unknown>("/bookings", { method: "POST", body: JSON.stringify(payload) }),

  // Профиль
  me: () => request<unknown>("/me"),
  favorites: () => request<unknown>("/me/favorites"),
};

function toQuery(q?: Record<string, string>): string {
  if (!q || Object.keys(q).length === 0) return "";
  return `?${new URLSearchParams(q).toString()}`;
}
