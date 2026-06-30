/**
 * Контракт навигации Le Chef — типизированный список маршрутов.
 * Это архитектурная точка правды: соответствует docs/navigation.md.
 * Любой новый экран сначала добавляется сюда, потом реализуется (frontend-dev).
 *
 * Правило (см. navigation.md): результаты игр и сканов НЕ должны быть тупиками —
 * каждый ведёт в рецепт / корзину / бронь.
 */

/** Результат колеса/квиза всегда несёт хотя бы одну ссылку «дальше в дело». */
export interface FunResultLinks {
  recipeId?: string;
  scan?: boolean;
  restaurantsQuery?: string;
  chefOffer?: boolean;
}

export type RecipeListFilter = {
  category?: string;
  country?: string;
  mealType?: string;
  diet?: string;
  query?: string;
};

export type OccasionType = "business_meeting" | "partner" | "friends" | "company";

/**
 * Нижний таб-бар. Визуально 5 слотов: home · категории · центральная
 * кнопка-лого · корзина · профиль. Центральная кнопка-лого — UI-действие
 * (возврат на Home/игры), а не отдельный маршрут, поэтому здесь 4 экрана.
 */
export type RootTabParamList = {
  Home: undefined; // главная: поиск, колесо, квиз
  Categories: undefined; // каталог рецептов (MVP)
  Cart: undefined; // Grocery / корзина
  Profile: undefined; // профиль, My recepies, My favorites
};

import type { NavigatorScreenParams } from "@react-navigation/native";

/** Глубокие экраны поверх табов (стек). */
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList>;

  // Игры (мост fun → utility) — отдельная подсистема, точка расширения
  SpinTheWheel: undefined;
  WheelResult: { result: string; links: FunResultLinks };
  Quiz: undefined;
  QuizFlow: undefined;
  QuizResult: { links: FunResultLinks };

  // Поиск / каталог / готовка дома
  Search: undefined;
  TypeOfFood: undefined;
  Ingredients: { typeId?: string };
  RecipeList: RecipeListFilter;
  RecipeDetail: { recipeId: string };
  Grocery: { fromRecipeId?: string }; // чек-лист недостающего
  MakeYourOwnDinner: undefined;

  // Распознавание
  ScanPhoto: undefined;
  IngredientsDetected: { ingredients: { name: string; confidence: number }[] };
  Recommendations: undefined;

  // Страны
  Countries: undefined;

  // Рестораны
  Restaurants: { country?: string; cuisine?: string; occasion?: OccasionType };
  RestaurantDetail: { restaurantId: string };

  // Поводы и бронь шефа — отдельная подсистема, точка расширения
  Occasion: undefined;
  BookChef: { occasion?: OccasionType };
  BookingFlow: { occasion?: OccasionType; restaurantId?: string };

  // Профиль
  MyRecipes: undefined;
  MyFavorites: undefined;
};
