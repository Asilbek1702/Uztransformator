from sqlalchemy import JSON, Column, Integer, String

try:
    from .database import Base
except ImportError:  # pragma: no cover - fallback when loaded by file path
    from app.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False, index=True)  # TMG, KTP, RU
    name_ru = Column(String, nullable=False)
    name_uz = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    image = Column(String, default="")
    pdf = Column(String, default="")
    specs = Column(JSON, nullable=False, default=dict)