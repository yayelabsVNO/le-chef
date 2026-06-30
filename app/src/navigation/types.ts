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

/** Постоянный нижний таб-бар из 5 иконок. */
export type RootTabParamList = {
  Home: undefined; // главная: поиск, колесо, квиз
  Categories: undefined; // European/Asia/Seafood/Healthy/Fastfood/Streetfood
  HomeHub: undefined; // центральная кнопка-лого → Home/игры
  Cart: undefined; // корзина
  Profile: undefined; // профиль, My recepies, My favorites
};

/** Глубокие экраны поверх табов (стек). */
export type RootStackParamList = {
  Tabs: undefined;

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
