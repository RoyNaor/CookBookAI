import json
import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import InMemorySaver
from langchain_openai import ChatOpenAI
from app.tools import generate_image, search_unsplash, save_recipe, display_recipe

# Load environment variables
load_dotenv()

# Initialize model & memory once globally
model = ChatOpenAI(model="gpt-4o-mini", temperature=0.4)
memory = InMemorySaver()
graph = StateGraph(dict, checkpointer=memory)

# ------------------------------------------------------------------
# 🔹 Helper function – add image (Unsplash → fallback to DALL·E)
# ------------------------------------------------------------------
def add_image_to_json(state):
    """
    Adds an 'image_url' field to the recipe JSON using Unsplash first,
    and DALL·E as fallback if Unsplash has no results.
    """
    try:
        print("🖼️ Adding image to recipe JSON...")

        recipe_json = state.get("recipe_json")
        if not recipe_json:
            print("⚠️ No recipe_json found in state!")
            return state

        title = recipe_json.get("title", "מנה לא מזוהה")

        # 🔍 נסה קודם ב-Unsplash
        image_url = search_unsplash.func(title)
        if not image_url or "לא נמצאה" in image_url:
            print("⚠️ Unsplash failed, switching to DALL·E...")
            image_url = generate_image.func(title)

        # 💾 עדכן את ה-JSON
        recipe_json["image_url"] = image_url
        state["recipe_json"] = recipe_json

        print(f"🖼️ Image added successfully")
        return state

    except Exception as e:
        print(f"❌ Error adding image: {e}")
        return state


# ------------------------------------------------------------------
# 🔹 Node 1 — Generate Recipe JSON
# ------------------------------------------------------------------
def generate_recipe_node(state):
    """
    Uses the model to generate a valid recipe JSON.
    """
    try:
        user_prompt = state["messages"][-1]["content"]
        sys_prompt = """
        You are CookBookAI — a professional digital chef.
        You must always respond **only in Hebrew** (titles, ingredients, instructions, everything).
        
        Your task is to create a detailed and valid JSON object for the requested recipe.
        Follow this schema exactly (used in the database):

        {
          "title": "שם המנה",
          "labels": [
            {"category": "סוג מנה", "value": "עיקרית", "color": "#3B82F6"},
            {"category": "סוג מטבח", "value": "איטלקי", "color": "#22C55E"}
          ],
          "ingredients": [
            "1 כוס קמח",
            "2 ביצים",
            "1 כף שמן זית"
          ],
          "instructions": [
            "מדליקים תנור לחום של 200 מעלות.",
            "מערבבים את כל החומרים בקערה.",
            "אופים במשך 25 דקות עד להזהבה."
          ],
          "image_url": ""
        }

        Important rules:
        - Write all text in fluent Hebrew only.
        - Do NOT include any markdown, code blocks, or explanations.
        - Output must be pure JSON and nothing else.
        - The 'image_url' field must exist but stay empty for now.
        - 'labels' must contain at least a dish type and cuisine type.
        """
        result = model.invoke([
            {"role": "system", "content": sys_prompt},
            {"role": "user", "content": user_prompt},
        ])
        recipe_json = json.loads(result.content)
        state["recipe_json"] = recipe_json
        print(f"✅ Recipe JSON generated for: {recipe_json.get('title', 'לא ידוע')}")
        return state
    except Exception as e:
        print(f"Error generating recipe JSON: {e}")
        return state


# ------------------------------------------------------------------
# 🔹 Node 2 — Add Image (Unsplash → fallback DALL·E)
# ------------------------------------------------------------------
def add_image_node(state):
    try:
        return add_image_to_json(state)
    except Exception as e:
        print(f"Error adding image: {e}")
        return state


# ------------------------------------------------------------------
# 🔹 Node 3 — Save Recipe to Database
# ------------------------------------------------------------------
def save_recipe_node(state):
    """
    Saves the recipe to the local database using the existing SQLAlchemy model:
    id (int), title (str), labels (JSON), ingredients (JSON), instructions (JSON), image_url (str)
    """
    try:
        recipe_json = state["recipe_json"]
        response = save_recipe.func(json.dumps(recipe_json, ensure_ascii=False))
        print(response)
        return state
    except Exception as e:
        print(f"Error saving recipe: {e}")
        return state


# ------------------------------------------------------------------
# 🔹 Node 4 — Display Recipe to the User
# ------------------------------------------------------------------
def display_recipe_node(state):
    """
    Displays the saved recipe in a human-readable Hebrew format for the user.
    """
    try:
        recipe_json = state["recipe_json"]
        text = display_recipe.func(json.dumps(recipe_json, ensure_ascii=False))
        state["display_text"] = text
        print("✅ Recipe displayed successfully!")
        return state
    except Exception as e:
        print(f"Error displaying recipe: {e}")
        return state


# ------------------------------------------------------------------
# 🧩 Build the Graph — 4 Sequential Steps
# ------------------------------------------------------------------
graph.add_node("GenerateRecipe", generate_recipe_node)
graph.add_node("AddImage", add_image_node)
graph.add_node("SaveRecipe", save_recipe_node)
graph.add_node("DisplayRecipe", display_recipe_node)

graph.add_edge("GenerateRecipe", "AddImage")
graph.add_edge("AddImage", "SaveRecipe")
graph.add_edge("SaveRecipe", "DisplayRecipe")

graph.set_entry_point("GenerateRecipe")
graph.set_finish_point("DisplayRecipe")

workflow_agent = graph.compile()
print("✅ Graph agent loaded and ready (Hebrew mode)!")
