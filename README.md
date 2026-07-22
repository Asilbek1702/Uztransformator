# Uztransformator

Многоязычный (RU/UZ/EN) сайт-каталог электротехнического завода Uztransformator (Ташкент).

**Продакшен:** [uztransformator.vercel.app](https://uztransformator.vercel.app)

## Стек

**Frontend**
- React (Create React App), инлайн-стили
- Supabase (Postgres + Auth + Row Level Security) — основное хранилище данных, продакшен
- Vercel — хостинг, деплой из GitHub

**Backend** (отдельный сервис, не используется фронтендом в проде — самостоятельный showcase-бэкенд)
- FastAPI + SQLAlchemy + PostgreSQL/SQLite
- Слоистая архитектура: `routers → services → crud → models`
- JWT-аутентификация, bcrypt, rate limiting, security headers
- Docker + Nginx + GitHub Actions CI

Подробности — в [`docs/`](./docs).

## Быстрый старт

### Frontend
```
cd site
npm install
npm start
```

### Backend
```
cd site/backend
pip install -r requirements.txt --break-system-packages
cp env.example .env
python create_admin.py
uvicorn main:app --reload
```
Или через Docker: `docker-compose up --build`.

## Документация

- [`docs/architecture.md`](./docs/architecture.md) — устройство фронтенда и бэкенда
- [`docs/database.md`](./docs/database.md) — схема данных (Supabase + отдельная БД бэкенда)
- [`docs/deployment.md`](./docs/deployment.md) — деплой Vercel / Docker / CI
- [`docs/api.md`](./docs/api.md) — эндпоинты бэкенда

## Скриншоты

_добавить сюда скриншоты Home / Catalog / About / Contacts / Admin — `docs/screenshots/`_
docs/screenshots/Home.png
docs/screenshots/Catalog.png
docs/screenshots/About_P1.png
docs/screenshots/About_P2.png
docs/screenshots/Contacts.png
docs/screenshots/Admin.png
