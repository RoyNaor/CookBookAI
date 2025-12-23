from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from app.core.firebase_auth import verify_firebase_token 

router = APIRouter(prefix="/recipes", tags=["Recipes"])

@router.post("/", response_model=schemas.Recipe)
def create_recipe(
    recipe: schemas.RecipeCreate, 
    db: Session = Depends(get_db),
    user=Depends(verify_firebase_token)
):
    db_user = db.query(models.User).filter(models.User.uid == user["uid"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_recipe = models.Recipe(**recipe.dict(), owner_id=db_user.id)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@router.get("/", response_model=list[schemas.Recipe])
def get_recipes(db: Session = Depends(get_db), user=Depends(verify_firebase_token)):
    db_user = db.query(models.User).filter(models.User.uid == user["uid"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db.query(models.Recipe).filter(models.Recipe.owner_id == db_user.id).all()


@router.put("/{recipe_id}", response_model=schemas.Recipe)
def update_recipe(recipe_id: int, recipe_data: schemas.RecipeCreate, db: Session = Depends(get_db), user=Depends(verify_firebase_token)):
    db_user = db.query(models.User).filter(models.User.uid == user["uid"]).first()
    recipe = db.query(models.Recipe).filter(models.Recipe.id == recipe_id, models.Recipe.owner_id == db_user.id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found or not yours")
    for key, value in recipe_data.dict().items():
        setattr(recipe, key, value)
    db.commit()
    db.refresh(recipe)
    return recipe


@router.delete("/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db), user=Depends(verify_firebase_token)):
    db_user = db.query(models.User).filter(models.User.uid == user["uid"]).first()
    recipe = db.query(models.Recipe).filter(models.Recipe.id == recipe_id, models.Recipe.owner_id == db_user.id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found or not yours")
    db.delete(recipe)
    db.commit()
    return {"message": "Recipe deleted successfully"}
