from langchain.tools import tool
import json, os, requests
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create image with DALL·E
@tool
def generate_image(prompt: str) -> str:
    """Generates an image based on the given prompt using DALL·E."""
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    try:
        response = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            size="1024x1024"
        )
        return response.data[0].url
    except Exception as e:
        return f"error while generating: {e}"


# Search image on Unsplash
@tool
def search_unsplash(query_hebrew: str) -> str:
    """Searches Unsplash for an image related to the query."""
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    try:
        translation = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Translate from Hebrew to English only."},
                {"role": "user", "content": query_hebrew}
            ]
        )
        query_english = translation.choices[0].message.content.strip()

        key = os.getenv("UNSPLASH_ACCESS_KEY")
        url = "https://api.unsplash.com/search/photos"
        params = {"query": query_english, "client_id": key, "per_page": 1}
        r = requests.get(url, params=params)
        data = r.json()

        if data.get("results"):
            return data["results"][0]["urls"]["regular"]
        return "לא נמצאה תמונה מתאימה."
    except Exception as e:
        return f"שגיאה בחיפוש תמונה: {e}"

# Save recipe to DB
@tool
def save_recipe(recipe_json: str) -> str:
    """Saves the recipe data into the database."""
    db: Session = SessionLocal()
    try:
        if isinstance(recipe_json, str):
            recipe_json = json.loads(recipe_json)

        db_recipe = models.Recipe(
            title=recipe_json.get("title"),
            labels=recipe_json.get("labels", []),
            ingredients=recipe_json.get("ingredients", []),
            instructions=recipe_json.get("instructions", []),
            image_url=recipe_json.get("image_url"),
        )
        db.add(db_recipe)
        db.commit()
        db.refresh(db_recipe)
        print(f"Recipe saved: {db_recipe.title} (ID: {db_recipe.id})")
        return f"the '{db_recipe.title}'saved!"
    except Exception as e:
        db.rollback()
        return f"error while saving: {e}"
    finally:
        db.close()


# Display recipe
@tool
def display_recipe(recipe_json: str) -> str:
    """Formats and displays the recipe content in a readable text form."""
    try:
        if isinstance(recipe_json, str):
            recipe_json = json.loads(recipe_json)
        title = recipe_json.get("title", "מתכון ללא שם")
        ingredients = recipe_json.get("ingredients", [])
        steps = recipe_json.get("instructions", [])

        closing_message = (
            "\n\n🧑‍🍳 בתיאבון! אם תרצה שאשנה משהו במתכון או שאצור משהו חדש – פשוט תגיד 😊"
        )

        formatted = f"🍽️ {title}\n\n🥕 רכיבים:\n" + "\n".join(f"- {i}" for i in ingredients)
        formatted += "\n\n🍳 הוראות הכנה:\n" + "\n".join(f"{idx+1}. {s}" for idx, s in enumerate(steps))
        formatted += closing_message
        return formatted
    except Exception as e:
        return f"שגיאה בהצגת מתכון: {e}"
