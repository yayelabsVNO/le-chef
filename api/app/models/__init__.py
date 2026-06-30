"""Модели данных (SQLModel) — зона backend-dev.

app-architect фиксирует только границы: таблицы соответствуют сущностям из
docs/api-contract.md (User, Recipe, Ingredient, GroceryItem, CartItem,
Restaurant, Booking, QuizResult, Favorite). Конкретные поля, связи, индексы и
миграции (Alembic) определяет backend-dev. Схему контента рецептов ведёт
recipe-curator (см. /recipes).
"""
