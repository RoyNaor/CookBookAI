from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from typing import List

router = APIRouter()

@router.post("/users", response_model=schemas.User)
def get_or_create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    db_user = db.query(models.User).filter(models.User.uid == user.uid).first()
    if db_user:
        return db_user
    
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/users/{user_id}/recipes", response_model=List[schemas.Recipe])
def get_user_recipes(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return user.recipes
    return []
