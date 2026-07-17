import os
import sys
from pathlib import Path

backend_dir = Path(r"C:\Users\energomax media\Desktop\Web site v2\site\backend")
sys.path.insert(0, str(backend_dir))

from app.database import SessionLocal, Base, engine
from app import models, auth

Base.metadata.create_all(bind=engine)

db = SessionLocal()
username = 'energo'
password = 'energo123'
existing = db.query(models.AdminUser).filter(models.AdminUser.username == username).first()
if existing:
    print('User already exists')
else:
    admin = models.AdminUser(username=username, hashed_password=auth.hash_password(password))
    db.add(admin)
    db.commit()
    print('Admin created')
db.close()
