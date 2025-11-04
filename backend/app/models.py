from sqlalchemy import Column, Integer, String
from sqlalchemy.types import JSON
from .database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    labels = Column(JSON, default=[]) 
    ingredients = Column(JSON)
    instructions = Column(JSON)
    image_url = Column(String, nullable=True)
