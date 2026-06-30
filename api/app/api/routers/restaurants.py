"""Рестораны и шефы. Контракт: docs/api-contract.md → Рестораны и шефы.

Оплата брони — через внешнего провайдера; данные карт на нашей стороне НЕ храним
(провайдер — TODO, отдельный ADR от backend-dev).
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import require_user

router = APIRouter(tags=["restaurants"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.get("/restaurants")
def list_restaurants(
    country: str | None = None,
    cuisine: str | None = None,
    occasion: str | None = None,
):
    """Список + гео, с фильтрами."""
    raise _NOT_IMPL


@router.get("/restaurants/{restaurant_id}")
def get_restaurant(restaurant_id: str):
    raise _NOT_IMPL


@router.get("/occasions")
def occasions():
    """Business Meeting / Partner / Friends / Company."""
    raise _NOT_IMPL


@router.post("/bookings")
def create_booking(user: Annotated[str, Depends(require_user)]):
    """Бронь шефа (occasion, date, place). Оплата — внешний провайдер."""
    raise _NOT_IMPL
