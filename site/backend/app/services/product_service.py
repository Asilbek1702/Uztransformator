from sqlalchemy.orm import Session

import crud
import schemas


class ProductService:
    """Слой между роутером и БД. Роутер не знает про crud/SQLAlchemy напрямую."""

    def __init__(self, db: Session):
        self.db = db

    def list(self):
        return crud.get_products(self.db)

    def create(self, product: schemas.ProductCreate):
        return crud.create_product(self.db, product)

    def update(self, product_id: int, product: schemas.ProductCreate):
        return crud.update_product(self.db, product_id, product)

    def delete(self, product_id: int):
        return crud.delete_product(self.db, product_id)
