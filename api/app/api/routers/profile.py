"""Профиль и авторизация. Контракт: docs/api-contract.md → Профиль.

Авторизация ленивая: регистрация/логин нужны только для сохранения
(favorites / cart / booking).
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import require_user

router = APIRouter(tags=["profile"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.post("/auth/register")
def register():
    raise _NOT_IMPL


@router.post("/auth/login")
def login():
    raise _NOT_IMPL


@router.get("/me")
def me(user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL


@router.get("/me/favorites")
def list_favorites(user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL


@router.post("/me/favorites/{recipe_id}")
def add_favorite(recipe_id: str, user: Annotated[str, Depends(require_user)]):
    raise _NOT_IMPL
