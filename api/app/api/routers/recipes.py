"""Рецепты и рекомендации. Контракт: docs/api-contract.md → Рецепты.

Каркас от app-architect: маршруты и сигнатуры зафиксированы. Логику и SQL
(SQLModel) реализует backend-dev; схему рецепта ведёт recipe-curator.
"""

from fastapi import APIRouter, HTTPException, status

router = APIRouter(tags=["recipes"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.get("/recipes")
def list_recipes(
    category: str | None = None,
    country: str | None = None,
    meal_type: str | None = None,
    diet: str | None = None,
    query: str | None = None,
    page: int = 1,
):
    """Список рецептов с фильтрами и пагинацией."""
    raise _NOT_IMPL


@router.get("/recipes/{recipe_id}")
def get_recipe(recipe_id: str):
    """Деталь рецепта (схема — см. recipe-curator.md)."""
    raise _NOT_IMPL


@router.get("/recommendations")
def recommendations():
    """Рекомендации по продуктам/истории/вкусам из профиля."""
    raise _NOT_IMPL
