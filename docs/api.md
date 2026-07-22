# API — site/backend

Базовый URL: `http://localhost:8000` (или адрес деплоя). Интерактивная документация:
`/docs` (Swagger UI), `/redoc`.

Все ответы — JSON. Ошибки — `{"detail": "..."}`.

---

## GET /

Health/статус сервиса.

**Ответ 200**
```json
{ "status": "ok", "service": "Uztransformator API" }
```

## GET /health

Health check для мониторинга/оркестрации (Docker healthcheck, k8s liveness и т.п.).

**Ответ 200**
```json
{ "status": "healthy" }
```

---

## POST /auth/login

Вход администратора. **Rate limit: 5 запросов/минуту с одного IP.**

**Тело запроса**
```json
{ "username": "admin", "password": "secret" }
```

**Ответ 200**
```json
{ "access_token": "eyJ...", "token_type": "bearer" }
```

**Ошибки**
- `401` — неверный логин/пароль
- `429` — превышен лимит попыток

Токен передавать в заголовке остальных запросов: `Authorization: Bearer <token>`.

---

## GET /products/

Список всех товаров. **Публичный, авторизация не требуется.**

**Ответ 200**
```json
[
  {
    "id": 1,
    "category": "TMG",
    "name_ru": "Сухие трансформаторы ТМГ-1000/10",
    "name_uz": "...",
    "name_en": "...",
    "image": "data:image/png;base64,...",
    "pdf": "",
    "specs": {
      "power": { "ru": "25-3150 кВА", "uz": "...", "en": "..." },
      "windingMaterial": "aluminum"
    }
  }
]
```

## POST /products/

Создать товар. **Требует `Authorization: Bearer <token>`.**

Тело — как `ProductCreate` (все поля, кроме `id`, см. пример выше).

**Ответ 200** — созданный товар с `id`.
**Ошибки:** `401` (нет/неверный токен), `500` (ошибка БД).

## PUT /products/{id}

Обновить товар целиком. **Требует токен.**

**Ответ 200** — обновлённый товар.
**Ошибки:** `401`, `404` (товар не найден), `500`.

## DELETE /products/{id}

Удалить товар. **Требует токен.**

**Ответ 200**
```json
{ "ok": true }
```
**Ошибки:** `401`, `404`, `500`.

---

## Заголовки безопасности

На все ответы добавляются:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

## Rate limiting

По умолчанию 200 запросов/минуту с одного IP на весь API, `/auth/login` — отдельно 5/минуту.
При превышении — `429 Too Many Requests`.
