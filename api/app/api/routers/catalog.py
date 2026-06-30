"""Продукты и покупки. Контракт: docs/api-contract.md → Продукты и покупки."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import require_user

router = APIRouter(tags=["catalog"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.get("/catalog/types")
def catalog_types():
    """Meat / Fish / Vegetables / Fruits / Bread / Nuts."""
    raise _NOT_IMPL


@router.get("/catalog/ingredients")
def catalog_ingredients():
    """Справочник ингредиентов."""
    raise _NOT_IMPL


@router.get("/grocery")
def get_grocery(user: Annotated[str, Depends(require_user)]):
    """Чек-лист покупок пользователя."""
    raise _NOT_IMPL


@router.post("/grocery/items")
def add_grocery_item(user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL


@router.patch("/grocery/items/{item_id}")
def update_grocery_item(item_id: str, user: Annotated[str, Depends(require_user)]):
    """Отметить checked и т.п."""
    raise _NOT_IMPL


@router.get("/cart")
def get_cart(user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL


@router.post("/cart/items")
def add_cart_item(user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL
