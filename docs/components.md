# Le Chef — дизайн-система и инвентарь компонентов

Контракт UI-компонентов для `frontend-dev`. app-architect задаёт набор и границы;
вёрстку и состояния делает frontend-dev. Все компоненты строятся **только** на
`app/src/theme/tokens.ts` — без хардкода цветов/отступов.

Структура папок (предлагаемая):
```
app/src/components/
  primitives/   базовые (Button, Card, Chip, Input, Text, Icon, ...)
  layout/       Screen, Header, TabBar, Section
  feature/      составные, по подсистемам (recipe, games, booking, scan, map)
```

---

## 1. Примитивы (`components/primitives`)

| Компонент | Назначение | Ключевые пропсы | Токены |
|---|---|---|---|
| `Button` | основное действие | `variant: primary\|secondary\|ghost`, `onPress`, `loading`, `disabled` | `colors.primary`, `radius.pill` |
| `Card` | крупная скруглённая карточка | `onPress?`, `padding`, `children` | `radius.card`, `colors.surface`, `border` |
| `Chip` | тег/выбор (диета, ингредиент) | `selected`, `label`, `onPress`, `confidence?` | `colors.primary`, `radius.pill` |
| `Input` | поле ввода/поиска | `value`, `onChangeText`, `icon?`, `placeholder` | `radius.input`, `border` |
| `Text` | типографика | `variant: title\|heading\|body\|caption` | `typography.*` |
| `Icon` | иконки таб-бара и действий | `name`, `size`, `color` | `colors.*` |
| `EmptyState` | пустые списки/корзина | `title`, `hint`, `action?` | `colors.textMuted` |
| `Loader` | ожидание (скан, сети) | `size` | `colors.primary` |
| `AuthGate` | ленивый вход при сохранении | `children`, `reason` (favorites/cart/booking) | — |

---

## 2. Лейаут (`components/layout`)

| Компонент | Назначение |
|---|---|
| `Screen` | обёртка экрана (safe-area, фон, скролл) |
| `Header` | заголовок + back; вариант с лого-колпаком |
| `TabBar` | кастомный 5-иконочный таб-бар с приподнятой центральной кнопкой-лого |
| `Section` | заголовок секции + контент (для Home/Detail) |

---

## 3. Составные по подсистемам (`components/feature`)

### recipe
- `RecipeCard` — превью рецепта (используется в RecipeList, Recommendations, MyFavorites).
- `FilterBar` / `FilterSheet` — фильтры списка (category/country/diet/mealType).
- `Paginator` — догрузка списка.
- `IngredientList`, `StepList`, `Hero`, `FavoriteButton` — экран RecipeDetail.

### catalog & cart
- `IngredientPicker` + `SelectedChips` — выбор ингредиентов (Ingredients, MYOD).
- `ChecklistRow` + `AddToCartBar` — Grocery.
- `CartItemRow` — Cart.
- `CategoryGrid` / `CategoryCarousel` — Categories / Home.

### games (мост fun → utility)
- `WheelCanvas` + `SpinButton` — SpinTheWheel.
- `ResultCard` + `NextActionButtons` — WheelResult/QuizResult (минимум 1 переход — инвариант).
- `QuestionStepper` + `ProgressDots` + `ResultSet` — Quiz.

### scan
- `CameraView` + `CaptureButton` — ScanPhoto.
- `DetectedChips` (с confidence) + `EditableList` — IngredientsDetected.

### map & restaurants
- `MapView` (карта стран/ресторанов), `FlagGrid`, `WorldMap` — Countries/Restaurants.
- `RestaurantCard` — Restaurants/RestaurantDetail.

### booking
- `DatePicker`, `OccasionSummary`, `PayHandoff` — BookChef/BookingFlow.
  (`PayHandoff` уводит к внешнему провайдеру оплаты — карты не храним.)

### profile
- `ProfileHeader`, `SettingsList`.

---

## Принципы
1. Примитив не знает про API — данные приходят пропсами; запросы делает экран.
2. Состояния обязательны: loading / empty / error для всего, что ходит в сеть.
3. Доступность (НФТ): минимальная зона нажатия 44pt, контраст текста к фону.
4. Один компонент = одна зона ответственности; композиция вместо «умных» экранов.
