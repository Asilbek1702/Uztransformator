import sys
from pathlib import Path

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import schemas  # noqa: E402
from app import models  # noqa: E402


class DatabaseOperationError(Exception):
    """Оборачивает ошибки БД, чтобы роутер вернул чистый HTTP-ответ вместо трейсбека."""


def get_products(db: Session):
    try:
        return db.query(models.Product).all()
    except SQLAlchemyError as e:
        raise DatabaseOperationError(str(e)) from e


def create_product(db: Session, product: schemas.ProductCreate):
    try:
        db_product = models.Product(**product.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    except SQLAlchemyError as e:
        db.rollback()
        raise DatabaseOperationError(str(e)) from e


def update_product(db: Session, product_id: int, product: schemas.ProductCreate):
    try:
        db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
        if not db_product:
            return None
        for k, v in product.model_dump().items():
            setattr(db_product, k, v)
        db.commit()
        db.refresh(db_product)
        return db_product
    except SQLAlchemyError as e:
        db.rollback()
        raise DatabaseOperationError(str(e)) from e


def delete_product(db: Session, product_id: int):
    try:
        db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
        if db_product:
            db.delete(db_product)
            db.commit()
        return db_product
    except SQLAlchemyError as e:
        db.rollback()
        raise DatabaseOperationError(str(e)) from e
