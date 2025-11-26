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

export async function syncUserToBackend(user: any, token: string) {
  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      uid: user.uid,
      email: user.email,
      display_name: user.displayName || user.email.split("@")[0],
      avatar_url: user.photoURL,
    }),
  });
}

export async function deleteRecipe(id: number) {
  try {
    const res = await fetchWithAuth(`${API_URL}/recipes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete recipe");
    return true;
  } catch (err) {
    console.error("❌ Error deleting recipe:", err);
    throw err;
  }
}

export async function updateRecipe(id: number, recipeData: any) {
  try {
    const res = await fetchWithAuth(`${API_URL}/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    if (!res.ok) throw new Error("Failed to update recipe");
    return res.json();
  } catch (err) {
    console.error("❌ Error updating recipe:", err);
    throw err;
  }
}
