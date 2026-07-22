# Деплой

## Frontend — Vercel

Автодеплой из GitHub при пуше в `main`. Настройки проекта в Vercel:

- **Root Directory:** `site`
- **Build Command:** `npm run build` (запускает `BUILD_PATH='./build' react-scripts build`)
- **Output Directory:** `build`

`site/vercel.json` содержит:
- `rewrites` — весь трафик идёт на `index.html` (SPA), чтобы прямые ссылки на `/catalog` и
  подобные не отдавали нативный 404 от Vercel — вместо этого рендерится React-компонент `NotFound`.
- `headers` — `Cache-Control: no-store` на `/` (чтобы всегда отдавать свежий `index.html`),
  `immutable`-кэш на `/static/*`.

### Переменные окружения (Vercel → Settings → Environment Variables)

Сейчас не требуются — `supabaseClient.js` использует захардкоженные `url`/`anonKey` (это
нормально: anon key публичный по дизайну Supabase, защита — через RLS, не через секретность ключа).

## Backend — Docker / любой VPS

```
cd site/backend
docker-compose up --build
```

Поднимает три контейнера:
- `db` — Postgres 16
- `backend` — FastAPI (uvicorn, порт 8000)
- `nginx` — reverse proxy (порт 80 → backend:8000)

### Переменные окружения (`.env`, см. `env.example`)

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | строка подключения к Postgres. Без неё — SQLite `app.db` (по умолчанию, для локальной разработки) |
| `SECRET_KEY` | секрет для подписи JWT. Генерировать: `openssl rand -hex 32` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | срок жизни токена, по умолчанию 480 (8 часов) |
| `ALLOWED_ORIGINS` | список доменов через запятую, разрешённых в CORS |

Для `docker-compose` также можно задать `POSTGRES_PASSWORD` (иначе дефолт `postgre` —
**сменить перед реальным использованием**).

### Без Docker

```
pip install -r requirements.txt --break-system-packages
cp env.example .env   # заполнить
python create_admin.py
uvicorn main:app --host 0.0.0.0 --port 8000
```

## CI — GitHub Actions

`.github/workflows/backend-ci.yml` запускается на каждый push/PR, если менялись файлы в
`site/backend/**`:

1. `ruff check .`
2. `black --check .`
3. `isort --check-only .`
4. `pytest`

Деплоя из CI сейчас нет (только проверка качества кода перед мержем).
