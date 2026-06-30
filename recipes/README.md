# /recipes — данные рецептов

Зона `recipe-curator`. Здесь живут исходные данные рецептов, нормализация,
теги, ингредиенты и сиды для БД.

- Схема рецепта (деталь для `GET /recipes/{id}`) ведётся в
  [.claude/agents/recipe-curator.md](../.claude/agents/recipe-curator.md).
- `backend-dev` импортирует отсюда сиды; модели (SQLModel) — в `/api/app/models`.
- `app-architect` фиксирует только то, что это отдельная зона данных, и что
  справочники (`/catalog/types`, `/catalog/ingredients`) питаются из неё.

```
recipes/
  README.md      (этот файл)
  seed/          (TODO recipe-curator: нормализованные рецепты, JSON/CSV)
  taxonomy/      (TODO recipe-curator: категории, страны, диеты, типы продуктов)
```
