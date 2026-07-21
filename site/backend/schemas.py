from pydantic import BaseModel
from typing import Optional, Dict, Any


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


class ProductBase(BaseModel):
    category: str
    name_ru: str
    name_uz: str
    name_en: str
    image: Optional[str] = ""
    pdf: Optional[str] = ""
    specs: Dict[str, Any] = {}


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True
