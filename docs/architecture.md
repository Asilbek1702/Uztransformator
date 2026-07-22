# Архитектура

## Общая картина

```
┌─────────────────────┐         ┌──────────────────────┐
│   Frontend (React)   │────────▶│  Supabase (Postgres)  │
│   Vercel, статика    │  REST/  │  + Auth + RLS         │
│                       │  RPC    │  ПРОДАКШЕН-данные     │
└─────────────────────┘         └──────────────────────┘

┌─────────────────────┐         ┌──────────────────────┐
│  Backend (FastAPI)   │────────▶│  Postgres / SQLite     │
│  Docker + Nginx       │  SQLA   │  отдельная БД          │
│  НЕ подключён к сайту │         │  (showcase-бэкенд)     │
└─────────────────────┘         └──────────────────────┘
```

Frontend и backend — два независимых деплоя с разными базами данных. Backend не обслуживает
продакшен-сайт; он существует как отдельный, полностью рабочий сервис (демонстрация архитектуры,
CI, Docker).

## Frontend

```
site/src/
  context/
    LanguageContext.jsx    — переключение RU/UZ/EN, читает i18n/translations.js
    ProductsContext.jsx    — CRUD товаров через Supabase, состояния loading/error
    ToastContext.jsx        — глобальные уведомления
  pages/                    — Home, Catalog, About, Contacts, AdminLogin, AdminPanel, NotFound
  components/               — переиспользуемые UI-блоки (Navigation, StarField, Skeleton, ...)
  data/categories.js        — описание категорий товаров и их полей (для каталога и админки)
  i18n/translations.js      — все текстовые строки на 3 языках
```

Состояние приложения (какая страница открыта) хранится в `useState` + `localStorage`,
полноценного роутера (react-router) нет — переключение страниц происходит через condition rendering.
`App.jsx` различает только `/` и `/admin` по `window.location.pathname`, остальные пути — 404.

Админка проверяет сессию через `supabase.auth.getSession()` — запись в базу разрешена только
аутентифицированным пользователям (Supabase RLS policy `to authenticated`).

## Backend

```
site/backend/
  main.py                   — точка входа: собирает middleware, роуты, обработчики ошибок
  app/
    core/
      config.py              — все переменные окружения в одном месте (Pydantic Settings)
      logging.py              — настройка логирования
      rate_limit.py            — Limiter (slowapi)
    services/
      product_service.py      — бизнес-логика поверх crud (Service Layer)
    middlewares/
      request_logging.py       — лог каждого запроса
      security_headers.py       — X-Frame-Options, HSTS и т.д.
    auth.py                   — JWT + bcrypt
    database.py                — подключение к БД, парсинг DATABASE_URL
    models.py                   — SQLAlchemy-модели
  routers/
    auth.py                    — POST /auth/login (rate limited)
    products.py                 — CRUD /products
  schemas.py                    — Pydantic-схемы запросов/ответов
  crud.py                        — низкоуровневые операции с БД, обёрнуты в try/except
  tests/                          — pytest
```

Поток запроса на запись: `router → Depends(auth.get_current_admin) → ProductService → crud → DB`.
Роутер не знает про SQLAlchemy напрямую — только через `ProductService`.
