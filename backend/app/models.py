from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    uid = Column(String, unique=True, index=True)         # Firebase UID
    email = Column(String, unique=True, index=True)
    display_name = Column(String, unique=True, index=True)
    avatar_url = Column(String, nullable=True)

    recipes = relationship("Recipe", back_populates="owner")


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    labels = Column(JSON, default=[]) 
    ingredients = Column(JSON)
    instructions = Column(JSON)
    image_url = Column(String, nullable=True)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="recipes")
