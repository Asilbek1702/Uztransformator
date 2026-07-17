import getpass
from app.database import SessionLocal, Base, engine
from app import models, auth

Base.metadata.create_all(bind=engine)


def main():
    db = SessionLocal()
    username = input("Admin username: ")
    password = getpass.getpass("Admin password: ")
    existing = db.query(models.AdminUser).filter(models.AdminUser.username == username).first()
    if existing:
        print("User already exists")
        return
    admin = models.AdminUser(username=username, hashed_password=auth.hash_password(password))
    db.add(admin)
    db.commit()
    print("Admin created")


if __name__ == "__main__":
    main()