# Le Chef — модель данных (контур)

Контракт сущностей для `backend-dev`. app-architect фиксирует **сущности, связи и
границы**; конкретные поля, типы, индексы, SQLModel-классы и миграции (Alembic) —
зона backend-dev. Контент рецептов и таксономия — зона recipe-curator (`/recipes`).

Соответствует `docs/api-contract.md` и `docs/screens.md`.

## ER-схема (контур)

```
User 1──1 DietProfile
User 1──* Favorite *──1 Recipe
User 1──* CartItem
User 1──* GroceryItem
User 1──* Booking *──0..1 Restaurant
User 1──* QuizResult
User 1──* ScanEvent

Recipe *──* Ingredient   (через RecipeIngredient: amount, unit)
Recipe *──1 Category
Recipe *──1 Country
Recipe *──* Diet         (теги)
Recipe  ·   meal_type    (enum/справочник)

ProductType 1──* CatalogIngredient   (Meat/Fish/Vegetables/Fruits/Bread/Nuts)
Restaurant *──1 Country ; Restaurant *──* Cuisine ; Restaurant *──* Occasion
WheelOption · (генерится с учётом DietProfile/наличия)
```

## Сущности

| Сущность | Назначение | Заметки |
|---|---|---|
| `User` | аккаунт | создаётся лениво (при первом сохранении) |
| `DietProfile` | диеты, аллергии, нелюбимое, уровень | питается результатами квиза/сканов |
| `Recipe` | рецепт | детальная схема — recipe-curator; ссылки на category/country/diet |
| `Ingredient` | ингредиент рецепта | связь с Recipe через `RecipeIngredient` |
| `RecipeIngredient` | связка | `amount`, `unit`, опц. `in_pantry` (вычисляемо) |
| `Category` | European/Asia/Seafood/Healthy/Fastfood/Streetfood | справочник |
| `Country` | страна кухни (карта/флаги) | справочник |
| `Diet` | тег диеты | справочник |
| `ProductType` | Meat/Fish/Vegetables/Fruits/Bread/Nuts | `GET /catalog/types` |
| `CatalogIngredient` | справочник ингредиентов | `GET /catalog/ingredients` |
| `GroceryItem` | чек-лист покупок | `checked: bool`, опц. `recipe_id` |
| `CartItem` | корзина | опц. `recipe_id` |
| `Restaurant` | ресторан | гео (lat/lng), cuisine, occasion |
| `Cuisine` | кухня ресторана | справочник |
| `Occasion` | Business Meeting/Partner/Friends/Company | справочник |
| `Booking` | бронь шефа | `occasion`, `date`, `place/restaurant_id`; оплата — внешний провайдер |
| `Favorite` | избранные рецепты | связка User↔Recipe |
| `QuizResult` | ответы квиза | пишет предпочтения в `DietProfile` |
| `WheelOption` | вариант колеса | может быть вычисляемым, не обязательно таблица |
| `ScanEvent` | факт скана | **только ссылка** на фото в объектном хранилище; персональные изображения не логируем |

## Границы и НФТ
- **Фото скана** → объектное хранилище (S3-совместимое); в БД только URL/ключ.
- **Оплата** брони — внешний провайдер; **данные карт не храним** (выбор провайдера —
  отдельный ADR от backend-dev).
- **Офлайн-кэш рецептов** (НФТ) — стратегия на устройстве (отдельный ADR); сервер
  отдаёт стабильные `id` и `updated_at` для инвалидизации.
- Справочники (Category/Country/Diet/ProductType/CatalogIngredient/Cuisine/Occasion)
  сидятся из `/recipes/taxonomy` (recipe-curator).

> Это контур, а не финальная схема. backend-dev оформляет SQLModel + миграции и
> фиксирует решения по индексам/денормализации отдельными ADR при необходимости.
