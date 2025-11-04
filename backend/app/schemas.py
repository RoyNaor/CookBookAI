from pydantic import BaseModel
from typing import List, Dict

class Label(BaseModel):
    category: str   
    value: str     
    color: str     

class RecipeBase(BaseModel):
    title: str
    labels: List[Label] = []  
    ingredients: List[str]
    instructions: List[str]
    image_url: str | None = None

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int

    class Config:
        from_attributes = True
