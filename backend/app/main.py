from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models                     
from .routes import recipes, agent_routes, users


# Models
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(recipes.router)
app.include_router(agent_routes.router)
app.include_router(users.router)

@app.get("/ping")
def ping():
    return {"message": "Backend Connected ✅"}
