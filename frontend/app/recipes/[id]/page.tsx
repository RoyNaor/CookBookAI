"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth"; 

interface Label {
  category: string;
  value: string;
  color: string;
}

interface Recipe {
  id: number;
  title: string;
  labels: Label[];
  ingredients: string[];
  instructions: string[];
  image_url?: string;
}

export default function RecipePage() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const recipeId = Number(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const resAll = await fetchWithAuth(`http://127.0.0.1:8000/recipes`);
        if (!resAll.ok) throw new Error("Failed to fetch all recipes");
        const all = await resAll.json();
        setRecipes(all);

        const res = await fetchWithAuth(`http://127.0.0.1:8000/recipes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("❌ Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">טוען מתכון...</p>;
  if (!recipe) return <p className="text-center text-red-500">לא נמצא מתכון</p>;

  const sortedIds = recipes.map((r) => r.id).sort((a, b) => a - b);
  const currentIndex = sortedIds.indexOf(recipeId);
  const prevId = sortedIds[currentIndex - 1];
  const nextId = sortedIds[currentIndex + 1];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      {/* כותרת ראשית */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {recipe.title}
        </h1>

        <div className="flex justify-center gap-6 text-gray-600 text-md font-bold">
          {prevId && (
            <button
              onClick={() => router.push(`/recipes/${prevId}`)}
              className="hover:text-amber-700 transition"
            >
              ← הקודם
            </button>
          )}
          <button
            onClick={() => router.push("/recipes")}
            className="hover:text-amber-700 transition"
          >
            כל המתכונים
          </button>
          {nextId && (
            <button
              onClick={() => router.push(`/recipes/${nextId}`)}
              className="hover:text-amber-700 transition"
            >
              הבא →
            </button>
          )}
        </div>
      </div>

      {/* גריד תוכן */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* תמונה */}
        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-auto object-cover rounded-2xl shadow-md"
          />
        )}

        {/* פרטי מתכון */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-100">
          {/* תגים */}
          <div className="flex flex-wrap gap-2">
            {recipe.labels.map((lbl, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${lbl.color}1A`,
                  color: lbl.color,
                  border: `1px solid ${lbl.color}`,
                }}
              >
                {lbl.value}
              </span>
            ))}
          </div>

          {/* מרכיבים */}
          <div>
            <h2 className="text-lg font-semibold text-amber-800 mb-2">
              🥕 מרכיבים
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* הוראות הכנה */}
          <div>
            <h2 className="text-lg font-semibold text-amber-800 mb-2">
              🍳 הוראות הכנה
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
