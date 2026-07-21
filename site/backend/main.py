import os
import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.database import Base, engine
from routers import auth as auth_router, products as products_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Uztransformator API")

# Список разрешённых доменов берётся из .env (через запятую).
# Пример: ALLOWED_ORIGINS=https://uztransformator.vercel.app,http://localhost:3000
_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in _origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(products_router.router)


@app.get("/")
def health():
    return {"status": "ok"}
