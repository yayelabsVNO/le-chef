"""Точка входа Le Chef API.

app-architect собирает каркас приложения и подключает роутеры по разделам
docs/api-contract.md. Реализацию эндпоинтов, модели (SQLModel) и миграции
ведёт backend-dev.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import catalog, games, profile, recipes, restaurants, scan
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["meta"])
def health() -> dict[str, bool]:
    return {"ok": True}


# Разделы контракта → роутеры
app.include_router(recipes.router)
app.include_router(scan.router)
app.include_router(catalog.router)
app.include_router(games.router)
app.include_router(restaurants.router)
app.include_router(profile.router)
