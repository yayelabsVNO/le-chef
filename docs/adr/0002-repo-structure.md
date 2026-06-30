# ADR-0002: Структура репозитория

**Статус:** принято · **Дата:** 2026-06-30 · **Автор:** app-architect

## Контекст
Над проектом работают четыре агента (app-architect, backend-dev, frontend-dev,
recipe-curator). Нужны чёткие зоны ответственности и единые точки синхронизации.

## Решение
Monorepo с тремя корнями + общие docs:

```
le-chef/
├── app/          Frontend — Expo RN + TS (frontend-dev)
│   └── src/
│       ├── navigation/   контракт маршрутов (types.ts) + RootNavigator
│       ├── theme/        дизайн-токены (#F26B1D и пр.)
│       ├── screens/      экраны (сейчас Placeholder)
│       ├── store/        Zustand-срезы
│       ├── api/          типизированный клиент к /api
│       └── features/     подсистемы: games, booking (точки расширения)
├── api/          Backend — FastAPI + SQLModel (backend-dev)
│   └── app/
│       ├── main.py, core/config.py, api/deps.py
│       ├── api/routers/  по разделам api-contract
│       └── models/       SQLModel
├── recipes/      Данные рецептов и таксономия (recipe-curator)
└── docs/         api-contract.md · navigation.md · competitors.md · adr/
```

## Зоны
- **app-architect:** каркас, навигация (`types.ts`), токены, контракты, ADR.
- **frontend-dev:** реальные экраны/компоненты (заменяет Placeholder), не трогает
  список маршрутов без согласования.
- **backend-dev:** реализация роутеров, модели, миграции, провайдеры.
- **recipe-curator:** контент и схема рецептов в `/recipes`.

## Правило
Контракт API — `docs/api-contract.md`. Контракт навигации — `app/src/navigation/types.ts`.
Любой новый эндпоинт/экран сначала в контракт, потом в код.

## Последствия
Изменение каркаса навигации/контракта = зона app-architect (или согласование с ним).
