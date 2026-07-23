import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Изолированная БД для тестов — не трогает app.db, который использует dev-сервер
os.environ.setdefault("DATABASE_URL", "sqlite:///test_backend.db")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app import auth, models  # noqa: E402
from app.core.rate_limit import limiter  # noqa: E402
from app.database import Base, SessionLocal, engine  # noqa: E402
from main import app  # noqa: E402

Base.metadata.create_all(bind=engine)


@pytest.fixture(autouse=True)
def _reset_rate_limit():
    # Без этого тесты логина/CRUD, идущие подряд, ловили бы 429 друг от друга
    limiter.reset()
    yield


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def admin_credentials():
    return {"username": "testadmin", "password": "testpass123"}


@pytest.fixture
def admin_user(admin_credentials):
    db = SessionLocal()
    db.query(models.AdminUser).filter(
        models.AdminUser.username == admin_credentials["username"]
    ).delete()
    db.commit()
    db.add(
        models.AdminUser(
            username=admin_credentials["username"],
            hashed_password=auth.hash_password(admin_credentials["password"]),
        )
    )
    db.commit()
    db.close()
    return admin_credentials


@pytest.fixture
def auth_token(client, admin_user):
    r = client.post("/auth/login", json=admin_user)
    return r.json()["access_token"]
