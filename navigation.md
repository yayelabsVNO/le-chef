# Le Chef — карта навигации (с мостом fun → utility)

Главная стратегия: вход через игру, плавный спуск к утилите. Колесо и квиз стоят
на главной как точка входа, но каждый их результат ведёт глубже в продукт.

```
Home (главная)
├─ Spin the Wheel ───► WheelResult
│                       ├─ "Готовить дома" ─► RecipeDetail ─► Grocery (добавить недостающее) ─► Cart
│                       ├─ "Что из наличия" ─► ScanPhoto ─► IngredientsDetected ─► Recommendations
│                       └─ "Поесть вне дома" ─► Restaurants(map, по кухне) / Occasion ─► BookChef
│
├─ Quiz ────────────► QuizFlow (mood / повод / время / диета)
│                       └─► ResultSet: [3–5 рецептов] + [1 ресторан] + [позвать шефа]
│                            (результат пишется в Profile → улучшает Recommendations)
│
├─ Search / List of products ─► TypeOfFood ─► Ingredients ─► Grocery ─► Cart
├─ Scan photo ─► IngredientsDetected ─► Recommendations ─► RecipeDetail
├─ Categories (European/Asia/Seafood/Healthy/Fastfood/Streetfood) ─► RecipeList
├─ Countries (карта + флаги) ─► RecipeList(by country)
├─ My recepies / My favorites (карточка профиля Tim S.)
├─ Restaurants (список + Map + Filters) ─► RestaurantDetail
└─ Occasion (Business Meeting / Partner / Friends / Company)
     ├─ Make food at home ─► Make Your Own Dinner
     ├─ Choose a place ─► Restaurants
     ├─ Book the Chef ─► BookingFlow (Date)
     └─ Chef's online
```

## Таб-бар (постоянный, 5 иконок)
home · категории · центральная кнопка-лого (Home/игры) · корзина · профиль

## Ключевые правила навигации
1. Любой `WheelResult` и `QuizResult` обязаны иметь переход в рецепт / корзину / бронь — без тупиков.
2. Регистрация запрашивается лениво: только при сохранении (favorites / cart / booking).
3. Результаты игр и сканов пишутся в профиль и питают экран Recommendations.
4. Глубокие экраны (рецепт, корзина) достижимы и напрямую (Search/Scan), и через игру.
