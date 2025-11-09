import { fetchWithAuth } from "@/lib/fetchWithAuth";

const API_URL = "http://127.0.0.1:8000";

interface Label {
  category: string;
  value: string;
  color?: string;
}

export async function getRecipes() {
  try {
    const res = await fetchWithAuth(`${API_URL}/recipes`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json();
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    return [];
  }
}

export async function createRecipe(
  title: string,
  labels: Label[],
  ingredients: string[],
  instructions: string[],
  image_url?: string
) {
  try {
    const res = await fetchWithAuth(`${API_URL}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        labels,
        ingredients,
        instructions,
        image_url,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error creating recipe: ${err}`);
    }

    return res.json();
  } catch (err) {
    console.error("❌ Error creating recipe:", err);
    throw err;
  }
}
