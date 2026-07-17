# Uztransformator backend

## Setup
```
pip install -r requirements.txt --break-system-packages
cp .env.example .env   # fill DATABASE_URL + SECRET_KEY
python create_admin.py
uvicorn app.main:app --reload
```

## Endpoints
- POST /auth/login → {access_token, token_type}
- GET  /products/ (public)
- POST /products/ (JWT required)
- PUT  /products/{id} (JWT required)
- DELETE /products/{id} (JWT required)

Frontend sends `Authorization: Bearer <token>` on write requests.
Password hashed with bcrypt. Never store plaintext.