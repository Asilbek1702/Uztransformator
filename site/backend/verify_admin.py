import sys
sys.path.insert(0, 'c:/Users/energomax media/Desktop/Web site v2/site/backend')
from app.database import SessionLocal, Base, engine
from app import models, auth

Base.metadata.create_all(bind=engine)
db = SessionLocal()
username = 'energo'
password = 'energo123'
existing = db.query(models.AdminUser).filter(models.AdminUser.username == username).first()
print('exists' if existing else 'new')
db.close()
