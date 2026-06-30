# Le Chef — команда агентов

Четыре субагента, каждый отвечает за своё направление. Запускаются из Claude Code
командой `/agents` или автоматически, когда задача подходит под описание агента.

| Агент | Направление | Когда вызывать |
|---|---|---|
| `app-architect` | Архитектура приложения, навигация, общий каркас | Старт проекта, новые большие фичи, структура экранов |
| `backend-dev` | API, БД, распознавание фото/голоса, бизнес-логика | Эндпоинты, модели данных, интеграции, авторизация |
| `frontend-dev` | Экраны, компоненты, состояние, дизайн-система | Вёрстка экранов из макетов, UI-компоненты, навигация в коде |
| `recipe-curator` | Сбор, структурирование и наполнение рецептов | Парсинг/нормализация рецептов, теги, ингредиенты, сидинг БД |

## Рекомендованный стек (можно поменять)
- **Frontend:** React Native + Expo + TypeScript, Zustand (стейт), React Navigation
- **Backend:** FastAPI (Python) + PostgreSQL + SQLModel, S3-совместимое хранилище фото
- **Распознавание продуктов по фото:** vision-модель (внешний API) → список ингредиентов
- **Голос:** speech-to-text → текстовый поиск

## Карта экранов (из макетов)
Главная (логотип-кнопка, поиск, Spin the Wheel, Quiz) → List of products / Type of food →
Ingredients → Grocery (чек-лист покупок) → Scan photo → Recommendations →
My recepies / My favorites → Restaurants (список + карта) → Occasion (Business Meeting:
Make food / Choose place / Book the Chef / Chef's online) → Make Your Own Dinner →
Countries (карта + флаги).

## Правило взаимодействия
Каждый агент работает только в своей зоне и оставляет TODO-комментарий, если задача
выходит за её рамки, передавая её профильному агенту. Контракты API описываются в
`/docs/api-contract.md` — это единая точка правды между backend и frontend.

## Структура репозитория (каркас от app-architect)
```
app/       Frontend — Expo RN + TS (навигация, токены, Zustand, api-клиент)
api/       Backend  — FastAPI + PostgreSQL + SQLModel (роутеры-заглушки по контракту)
recipes/   Данные рецептов и таксономия (recipe-curator)
docs/      api-contract.md · navigation.md · screens.md · components.md · data-model.md · competitors.md · adr/
```
Стек зафиксирован в [docs/adr/0001-stack.md](docs/adr/0001-stack.md); структура и
зоны — в [0002-repo-structure.md](docs/adr/0002-repo-structure.md); навигация и точки
расширения (игры, бронь шефа) — в [0003-navigation-extension-points.md](docs/adr/0003-navigation-extension-points.md).

Контракт навигации (типы маршрутов) живёт в `app/src/navigation/types.ts` — точка
правды по экранам, параллельная `api-contract.md`. Запуск: `app/README`-команды Expo
и `api/README` (uvicorn). Сейчас экраны — заглушки (frontend-dev), эндпоинты — `501`
(backend-dev).
