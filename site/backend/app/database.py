import os
import urllib.parse
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Находим .env
backend_dir = Path(__file__).resolve().parent.parent
env_path = backend_dir / ".env"
load_dotenv(dotenv_path=env_path)

# --- ОТЛАДКА ---
print("\n=== АНАЛИЗ СТРОКИ ПОДКЛЮЧЕНИЯ ===")
raw_url = os.getenv("DATABASE_URL", "").strip()
print(f"Длина строки: {len(raw_url)} символов")

# Показываем безопасную часть строки (без пароля)
if raw_url:
    print(f"Первый символ: {raw_url[0]}")
    print(f"Последний символ: {raw_url[-1]}")
    
    if "@" in raw_url:
        parts = raw_url.split("@")
        print(f"Хост (конец строки): @{parts[-1]}")
    else:
        print("ВНИМАНИЕ: В строке отсутствует символ '@'!")
else:
    print("Строка DATABASE_URL пустая!")
print("=================================\n")

# Безопасный SQLite для Windows (три слэша и относительный путь)
DEFAULT_DATABASE_URL = "sqlite:///app.db"

if not raw_url:
    DATABASE_URL = DEFAULT_DATABASE_URL
elif raw_url.startswith("postgresql") and "@" in raw_url:
    try:
        scheme_user, rest = raw_url.split("://", 1)
        user_pass, host_db = rest.rsplit("@", 1)
        if ":" in user_pass:
            user, password = user_pass.split(":", 1)
            safe_password = urllib.parse.quote_plus(password)
            DATABASE_URL = f"{scheme_user}://{user}:{safe_password}@{host_db}"
        else:
            DATABASE_URL = raw_url
    except Exception:
        DATABASE_URL = raw_url
else:
    DATABASE_URL = raw_url

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()