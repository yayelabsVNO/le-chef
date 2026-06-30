"""Распознавание. Контракт: docs/api-contract.md → Распознавание.

ВАЖНО (НФТ): картинку — в объектное хранилище, в БД только ссылка.
Персональные изображения не логируем.
"""

from fastapi import APIRouter, HTTPException, UploadFile, status

router = APIRouter(tags=["scan"])

_NOT_IMPL = HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "TODO(backend-dev)")


@router.post("/scan/photo")
def scan_photo(image: UploadFile):
    """multipart image → {ingredients: [{name, confidence}]}.

    Vision-модель (внешний API). Скорость распознавания — ключевое НФТ.
    """
    raise _NOT_IMPL


@router.post("/scan/voice")
def scan_voice():
    """audio/text → текстовый поиск рецептов (speech-to-text)."""
    raise _NOT_IMPL
