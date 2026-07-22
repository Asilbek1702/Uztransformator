import sys
from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

backend_dir = Path(__file__).resolve().parents[1]
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import schemas  # noqa: E402
from app import auth  # noqa: E402
from app.database import get_db  # noqa: E402
from app.services.product_service import ProductService  # noqa: E402
from crud import DatabaseOperationError  # noqa: E402

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=List[schemas.ProductOut])
def list_products(db: Session = Depends(get_db)):
    try:
        return ProductService(db).list()
    except DatabaseOperationError:
        raise HTTPException(status_code=500, detail="Не удалось получить список товаров")


@router.post("/", response_model=schemas.ProductOut)
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(auth.get_current_admin),
):
    try:
        return ProductService(db).create(product)
    except DatabaseOperationError:
        raise HTTPException(status_code=500, detail="Не удалось создать товар")


@router.put("/{product_id}", response_model=schemas.ProductOut)
def update_product(
    product_id: int,
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(auth.get_current_admin),
):
    try:
        updated = ProductService(db).update(product_id, product)
    except DatabaseOperationError:
        raise HTTPException(status_code=500, detail="Не удалось обновить товар")
    if not updated:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return updated


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin=Depends(auth.get_current_admin),
):
    try:
        deleted = ProductService(db).delete(product_id)
    except DatabaseOperationError:
        raise HTTPException(status_code=500, detail="Не удалось удалить товар")
    if not deleted:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return {"ok": True}
