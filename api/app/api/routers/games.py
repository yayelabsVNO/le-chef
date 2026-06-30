"""Игры (мост fun → utility). Контракт: docs/api-contract.md → Игры.

ИНВАРИАНТ: ответ /wheel/spin и /quiz/submit ВСЕГДА содержит хотя бы одну ссылку
«дальше в дело» (recipe_id / scan / restaurants_query / chef_offer). Без тупиков.
Сабмит квиза пишет предпочтения в профиль → улучшает /recommendations.
"""

from fastapi import APIRouter, HTTPException, status

router = APIRouter(tags=["games"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.get("/wheel/options")
def wheel_options():
    """Варианты для колеса (с учётом профиля/наличия)."""
    raise _NOT_IMPL


@router.post("/wheel/spin")
def wheel_spin():
    """→ {result, links: {recipe_id, scan, restaurants_query}} (минимум 1 ссылка)."""
    raise _NOT_IMPL


@router.get("/quiz")
def quiz():
    """Вопросы квиза (mood / повод / время / диета)."""
    raise _NOT_IMPL


@router.post("/quiz/submit")
def quiz_submit():
    """→ {recipes: [...], restaurant, chef_offer}; пишет предпочтения в профиль."""
    raise _NOT_IMPL
