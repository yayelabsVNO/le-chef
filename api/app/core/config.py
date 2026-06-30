"""Конфигурация Le Chef API. Значения берутся из окружения / .env."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Le Chef API"
    # Postgres. Реальные миграции и модели — зона backend-dev.
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/le_chef"
    # Объектное хранилище для фото скана (в БД только ссылка).
    object_storage_url: str | None = None
    # CORS-источники (Expo dev / прод-домены).
    cors_origins: list[str] = ["*"]


settings = Settings()
