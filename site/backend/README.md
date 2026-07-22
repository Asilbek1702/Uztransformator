# Uztransformator backend

Не используется фронтендом в проде (сайт работает на Supabase напрямую).
Задеплоен отдельно — для портфолио и как готовый к переключению вариант бэкенда.

## Локальный запуск

```
pip install -r requirements.txt --break-system-packages
cp env.example .env   # заполнить DATABASE_URL + SECRET_KEY + ALLOWED_ORIGINS
python create_admin.py
uvicorn main:app --reload
```

## Через Docker

```
docker-compose up --build
```
Backend: http://localhost:8000, через Nginx: http://localhost:80

## Тесты и линтеры

```
pip install -r requirements-dev.txt
pytest
black --check .
ruff check .
isort --check-only .
```

## Эндпоинты
- GET  /              — статус сервиса
- GET  /health         — health check
- POST /auth/login     — {access_token, token_type}
- GET  /products/      (публичный)
- POST /products/      (нужен JWT)
- PUT  /products/{id}  (нужен JWT)
- DELETE /products/{id} (нужен JWT)

Пароли — bcrypt. Секреты и конфиг — через app/core/config.py (Pydantic Settings), читаются из .env.
