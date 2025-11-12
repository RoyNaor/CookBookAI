from sqlalchemy.orm import Session
from . import models, schemas

def get_or_create_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.uid == user.uid).first()
    if db_user:
        return db_user
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_recipes(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return user.recipes
    return []