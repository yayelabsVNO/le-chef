"""Общие зависимости FastAPI.

app-architect задаёт интерфейсы (ленивая авторизация, сессия БД); backend-dev
наполняет реализацию (выпуск/валидация токенов, движок SQLModel).
"""

from typing import Annotated

from fastapi import Depends, Header, HTTPException, status


def optional_user(
    authorization: Annotated[str | None, Header()] = None,
) -> str | None:
    """Ленивая авторизация: гостю доступен весь просмотр.

    Возвращает user_id если есть валидный Bearer-токен, иначе None.
    Валидацию токена реализует backend-dev.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None
    # TODO(backend-dev): декодировать/проверить токен → user_id
    return "stub-user"


def require_user(user: Annotated[str | None, Depends(optional_user)]) -> str:
    """Требует авторизацию (сохранение favorites / cart / booking)."""
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Требуется авторизация")
    return user


# TODO(backend-dev): def get_session() -> Session  (SQLModel engine + yield)
