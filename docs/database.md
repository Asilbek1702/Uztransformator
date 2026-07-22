# База данных

Два независимых хранилища — сайт и standalone-бэкенд их не делят.

## 1. Supabase (продакшен, использует сайт)

Таблица `products`, читает/пишет напрямую `site/src/context/ProductsContext.jsx` через
`@supabase/supabase-js` (anon key, публичный по дизайну Supabase).

| Колонка | Тип | Описание |
|---|---|---|
| `id` | int8, PK | автоинкремент |
| `category` | text | `TMG` \| `KTP` \| `RU` — см. `site/src/data/categories.js` |
| `name_ru` / `name_uz` / `name_en` | text | название на каждом языке |
| `image` | text | base64 data URL или ссылка на изображение |
| `pdf` | text | base64 data URL PDF-паспорта товара (опционально) |
| `specs` | jsonb | характеристики; для `select`-полей — строка, для `text`-полей — объект `{ru, uz, en}` |

### specs — формат

```json
{
  "power": { "ru": "25-3150 кВА", "uz": "25-3150 kVA", "en": "25-3150 kVA" },
  "windingMaterial": "aluminum"
}
```
`windingMaterial` — select-поле, хранит одно значение (перевод варианта — в `categories.js`, не в БД).
`power` — текстовое поле, хранит объект на 3 языках (заполняется через автоперевод в админке).

Старые записи, созданные до этого формата, могут хранить `specs.power` как обычную строку —
код на фронте (`Catalog.jsx`, `AdminPanel.jsx`) поддерживает оба варианта для обратной совместимости.

### Row Level Security

RLS включён (`site/backend` тут ни при чём — это настройки самого Supabase-проекта):

- `SELECT` — разрешён всем (`using (true)`) — каталог публичный.
- `INSERT` / `UPDATE` / `DELETE` — только роль `authenticated` (человек вошёл через
  `supabase.auth.signInWithPassword` в `/admin`).

Таблица `admin_users` — от старого FastAPI-бэкенда, в Supabase не используется, RLS включён
без единой policy (полностью закрыта от анонимного доступа).

## 2. Backend БД (`site/backend`, standalone)

SQLAlchemy-модели (`app/models.py`), своя, полностью отдельная база (SQLite локально по
умолчанию, Postgres — через `DATABASE_URL` в `.env`).

**`admin_users`**
| Колонка | Тип |
|---|---|
| `id` | int, PK |
| `username` | string, unique |
| `hashed_password` | string (bcrypt) |

**`products`**
| Колонка | Тип |
|---|---|
| `id` | int, PK |
| `category` | string, indexed |
| `name_ru` / `name_uz` / `name_en` | string |
| `image` / `pdf` | string |
| `specs` | JSON |

Создаются автоматически при старте (`Base.metadata.create_all()` в `main.py`), миграций
(alembic) нет — проект достаточно мал, чтобы обходиться без них.
