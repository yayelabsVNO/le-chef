# Le Chef — спецификация экранов

Контракт экранов для `frontend-dev`. Дополняет `navigation.md` (потоки) и
`app/src/navigation/types.ts` (маршруты и параметры). Для каждого экрана:
**назначение · данные (API) · действия/переходы · ключевые компоненты**.

Правила:
- Все цвета/отступы — только из `app/src/theme/tokens.ts`.
- Имена маршрутов и параметры — строго из `types.ts`. Новый экран → сперва в
  `types.ts` (зона app-architect), потом вёрстка.
- Инвариант «без тупиков»: экраны-результаты игр обязаны вести дальше.
- Регистрация ленивая: гость видит всё, токен спрашивается только при сохранении
  (favorites / cart / booking).

---

## Таб-бар (постоянный, 5 иконок)
`Home · Categories · HomeHub(центр, лого) · Cart · Profile`. Активная иконка —
`colors.primary`. Центральная — приподнятая круглая кнопка-колпак, ведёт на Home/игры.

---

## Tabs

### Home
- **Назначение:** точка входа; поиск + входы в игры (мост fun → utility).
- **Данные:** — (статично) ; опц. `GET /recommendations` для блока «для вас».
- **Действия:** Search-бар → `Search`; «Spin the Wheel» → `SpinTheWheel`;
  «Quiz» → `Quiz`; карточки категорий → `RecipeList`.
- **Компоненты:** SearchBar, BigCTA (колесо/квиз), CategoryCarousel, LogoHeader.

### Categories
- **Назначение:** European / Asia / Seafood / Healthy / Fastfood / Streetfood.
- **Данные:** статичный список категорий (+ опц. счётчики из бэка).
- **Действия:** категория → `RecipeList { category }`.
- **Компоненты:** CategoryGrid (крупные скруглённые карточки).

### HomeHub (центральная кнопка)
- **Назначение:** хаб игр/возврат на Home.
- **Действия:** → `SpinTheWheel`, `Quiz`, `ScanPhoto`.
- **Компоненты:** HubActions.

### Cart
- **Назначение:** корзина покупок.
- **Данные:** `GET /cart` (require auth — иначе CTA логина).
- **Действия:** изменить кол-во, перейти к покупке; → `Grocery` (чек-лист).
- **Компоненты:** CartItemRow, EmptyState, AuthGate.

### Profile (Tim S.)
- **Назначение:** профиль, мои рецепты/избранное, предпочтения.
- **Данные:** `GET /me`.
- **Действия:** → `MyRecipes`, `MyFavorites`; вход/регистрация (лениво).
- **Компоненты:** ProfileHeader, SettingsList, AuthGate.

---

## Игры (features/games) — мост fun → utility

### SpinTheWheel
- **Назначение:** анимация колеса.
- **Данные:** `GET /wheel/options` (учёт профиля/наличия).
- **Действия:** spin → `POST /wheel/spin` → `WheelResult { result, links }`.
- **Компоненты:** WheelCanvas, SpinButton.

### WheelResult
- **Назначение:** результат + переход «дальше в дело» (НЕ тупик).
- **Данные:** из параметров (`links`).
- **Действия (≥1 обязателен):** «Готовить дома» → `RecipeDetail`; «Что из наличия»
  → `ScanPhoto`; «Поесть вне дома» → `Restaurants` / `Occasion`.
- **Компоненты:** ResultCard, NextActionButtons.

### Quiz → QuizFlow → QuizResult
- **Назначение:** mood / повод / время / диета → подборка.
- **Данные:** `GET /quiz`; submit `POST /quiz/submit` → `{ recipes, restaurant, chef_offer }`.
- **Побочный эффект:** пишет предпочтения в профиль → улучшает `Recommendations`.
- **Действия:** результат → `RecipeDetail` / `Restaurants` / `BookChef` (≥1).
- **Компоненты:** QuestionStepper, ProgressDots, ResultSet.

---

## Готовка дома

### Search
- **Назначение:** поиск рецептов/продуктов.
- **Данные:** `GET /recipes?query=`.
- **Действия:** → `RecipeList` или `TypeOfFood`.
- **Компоненты:** SearchInput, ResultsList.

### TypeOfFood
- **Назначение:** выбор типа продукта (Meat/Fish/Vegetables/Fruits/Bread/Nuts).
- **Данные:** `GET /catalog/types`.
- **Действия:** тип → `Ingredients { typeId }`.

### Ingredients
- **Назначение:** выбор ингредиентов из справочника.
- **Данные:** `GET /catalog/ingredients`.
- **Действия:** собрать набор → `RecipeList` или `MakeYourOwnDinner`.
- **Компоненты:** IngredientPicker, SelectedChips.

### RecipeList
- **Назначение:** список рецептов по фильтру (`category/country/mealType/diet/query`).
- **Данные:** `GET /recipes` + пагинация.
- **Действия:** карточка → `RecipeDetail { recipeId }`.
- **Компоненты:** RecipeCard, FilterBar, Paginator.

### RecipeDetail
- **Назначение:** деталь рецепта (схема — recipe-curator).
- **Данные:** `GET /recipes/{id}`.
- **Действия:** в избранное (`POST /me/favorites/{id}`, auth); «добавить недостающее»
  → `Grocery { fromRecipeId }`.
- **Компоненты:** Hero, IngredientList, StepList, FavoriteButton.

### Grocery (чек-лист)
- **Назначение:** недостающие ингредиенты как чек-лист.
- **Данные:** `GET /grocery`, `POST /grocery/items`, `PATCH /grocery/items/{id}`.
- **Действия:** отметить checked; добавить в `Cart`.
- **Компоненты:** ChecklistRow, AddToCartBar.

### MakeYourOwnDinner
- **Назначение:** собрать блюдо из выбранных ингредиентов.
- **Данные:** `GET /recommendations` по набору.
- **Действия:** → `RecipeDetail` / `Grocery`.

---

## Распознавание

### ScanPhoto
- **Назначение:** камера → распознать продукты.
- **Данные:** `POST /scan/photo` (multipart). НФТ: скорость; фото — в хранилище,
  не логируем персональные изображения.
- **Действия:** результат → `IngredientsDetected { ingredients }`.
- **Компоненты:** CameraView, CaptureButton, Loader.

### IngredientsDetected
- **Назначение:** подтвердить/поправить распознанное.
- **Действия:** → `Recommendations`.
- **Компоненты:** DetectedChips (с confidence), EditableList.

### Recommendations
- **Назначение:** рекомендации по продуктам/истории/вкусам.
- **Данные:** `GET /recommendations`.
- **Действия:** карточка → `RecipeDetail`.

---

## Страны и рестораны

### Countries
- **Назначение:** карта + флаги.
- **Действия:** страна → `RecipeList { country }`.
- **Компоненты:** WorldMap, FlagGrid.

### Restaurants
- **Назначение:** список + карта + фильтры (`country/cuisine/occasion`).
- **Данные:** `GET /restaurants`.
- **Действия:** → `RestaurantDetail { restaurantId }`.
- **Компоненты:** MapView, RestaurantCard, FilterSheet.

### RestaurantDetail
- **Данные:** `GET /restaurants/{id}`.
- **Действия:** → `BookingFlow { restaurantId }`.

---

## Поводы и бронь шефа (features/booking)

### Occasion
- **Назначение:** Business Meeting / Partner / Friends / Company.
- **Данные:** `GET /occasions`.
- **Ветки:** «готовить дома» → `MakeYourOwnDinner`; «выбрать место» → `Restaurants`;
  «позвать шефа» → `BookChef`; «шеф онлайн».

### BookChef → BookingFlow
- **Назначение:** бронь шефа (occasion, date, place).
- **Данные:** `POST /bookings` (auth). Оплата — внешний провайдер (карты не храним).
- **Компоненты:** DatePicker, OccasionSummary, PayHandoff.

---

## Профиль (детали)

### MyRecipes / MyFavorites
- **Данные:** `GET /me/favorites` (и сохранённые рецепты).
- **Действия:** карточка → `RecipeDetail`.
- **Компоненты:** RecipeCard, EmptyState.
