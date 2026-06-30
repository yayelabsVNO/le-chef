# Le Chef API

Бэкенд на **FastAPI + PostgreSQL + SQLModel**. Каркас задаёт `app-architect`;
эндпоинты, модели и миграции наполняет `backend-dev`.

## Запуск (dev)

```bash
cd api
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp ../.env.example .env        # DATABASE_URL и пр.
uvicorn app.main:app --reload  # http://localhost:8000  (Swagger: /docs)
```

## Структура

```
app/
  main.py            сборка приложения, подключение роутеров
  core/config.py     настройки из окружения
  api/deps.py        общие зависимости (ленивая авторизация, сессия БД)
  api/routers/       по разделам docs/api-contract.md:
                     recipes · scan · catalog · games · restaurants · profile
  models/            SQLModel — зона backend-dev
```

## Контракт

Источник правды по эндпоинтам — [/docs/api-contract.md](../docs/api-contract.md).
Сейчас все маршруты — заглушки (`501 Not Implemented`) с фиксированными путями и
сигнатурами. Новый эндпоинт: сперва в `api-contract.md`, потом тут.

## НФТ (нефункциональные)

- `/scan/photo`: изображение → в объектное хранилище, в БД только ссылка;
  персональные фото не логируем; скорость распознавания — приоритет.
- Оплата брони — внешний провайдер; данные карт не храним.
