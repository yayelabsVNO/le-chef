# Le Chef — контракт API (черновик v0.1)

Единая точка правды между backend-dev и frontend-dev. Любой новый эндпоинт
сначала описывается здесь, потом реализуется. Формат: JSON, аутентификация —
Bearer-токен (лениво, только для сохранения данных).

## Рецепты
- `GET /recipes` — список (фильтры: category, country, meal_type, diet, query; пагинация).
- `GET /recipes/{id}` — деталь (см. схему в recipe-curator.md).
- `GET /recommendations` — по продуктам/истории/вкусам из профиля.

## Распознавание
- `POST /scan/photo` — multipart image → `{ ingredients: [{name, confidence}] }`.
  Картинка → в объектное хранилище, в БД только ссылка. Перс. изображения не логируем.
- `POST /scan/voice` — audio/text → текстовый поиск рецептов.

## Продукты и покупки
- `GET /catalog/types` — Meat/Fish/Vegetables/Fruits/Bread/Nuts.
- `GET /catalog/ingredients` — справочник ингредиентов.
- `GET /grocery` / `POST /grocery/items` / `PATCH /grocery/items/{id}` — чек-лист (checked).
- `GET /cart` / `POST /cart/items` — корзина.

## Игры (мост fun → utility)
- `GET /wheel/options` — варианты для колеса (с учётом профиля/наличия).
- `POST /wheel/spin` → `{ result, links: { recipe_id, scan: true, restaurants_query } }`.
  ВАЖНО: ответ всегда содержит хотя бы одну ссылку «дальше в дело».
- `GET /quiz` — вопросы. `POST /quiz/submit` → `{ recipes: [...], restaurant, chef_offer }`.
  Сабмит квиза также пишет предпочтения в профиль.

## Рестораны и шефы
- `GET /restaurants` — список + гео (фильтры: country, cuisine, occasion).
- `GET /restaurants/{id}`.
- `GET /occasions` — Business Meeting / Partner / Friends / Company.
- `POST /bookings` — бронь шефа (occasion, date, place). Оплата — через внешнего
  провайдера, данные карт на нашей стороне не храним (TODO: выбрать провайдера).

## Профиль
- `POST /auth/register`, `POST /auth/login`.
- `GET /me`, `GET /me/favorites`, `POST /me/favorites/{recipe_id}`.

> Статусы ошибок: 400 валидация, 401 нет токена, 404 не найдено, 422 семантика, 429 лимиты.
> Версия v0.1 — заполняется по мере реализации backend-dev.
