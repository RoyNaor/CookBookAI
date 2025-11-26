"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import LoadingSpinner from "@/components/LoadingSpinner"; 
import { deleteRecipe } from "@/lib/api"; 
import { Edit2, Trash2, ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react"; 
import EditRecipeModal from "@/components/EditRecipeModal"; 
import { AnimatePresence } from "framer-motion";

interface Label {
  category: string;
  value: string;
  color?: string;
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const recipeId = Number(id);

  const labelColors: Record<string, string> = {
    "סוג מנה": "#3B82F6",
    "סוג מטבח": "#22C55E",
    "מידע נוסף": "#F97316",
    default: "#6B7280",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resAll = await fetchWithAuth(`http://127.0.0.1:8000/recipes`);
        if (!resAll.ok) throw new Error("Failed to fetch all recipes");

        const all: Recipe[] = await resAll.json();
        setRecipes(all);

        const selected = all.find((r) => r.id === recipeId);
        setRecipe(selected || null);
      } catch (err) {
        console.error("❌ Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [recipeId]);

  const handleDelete = async () => {
    if (!confirm("האם אתה בטוח שברצונך למחוק את המתכון הזה?")) return;
    
    setIsDeleting(true);
    try {
      await deleteRecipe(recipeId);
      router.push("/recipes");
    } catch (error) {
      alert("שגיאה במחיקת המתכון");
      setIsDeleting(false);
    }
  };

  const refreshRecipe = async () => {
    try {
        const res = await fetchWithAuth(`http://127.0.0.1:8000/recipes`);
        const all = await res.json();
        const updated = all.find((r: any) => r.id === recipeId);
        setRecipe(updated);
        setRecipes(all); 
    } catch (error) {
        console.error("Failed to refresh recipe");
    }
  };

  if (loading) return <LoadingSpinner size="fullscreen" />;
  if (!recipe) return <div className="text-center py-20 text-xl text-gray-500">לא נמצא מתכון</div>;

  // חישוב ניווט
  const sortedIds = recipes.map((r) => r.id).sort((a, b) => a - b);
  const currentIndex = sortedIds.indexOf(recipeId);
  const prevId = sortedIds[currentIndex - 1];
  const nextId = sortedIds[currentIndex + 1];

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
      
      {/* כותרת וניווט */}
      <div className="flex flex-col items-center gap-4">
        {/* ניווט עליון */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <button
            onClick={() => prevId && router.push(`/recipes/${prevId}`)}
            disabled={!prevId}
            className={`flex items-center gap-1 transition ${prevId ? "hover:text-amber-600" : "opacity-30 cursor-not-allowed"}`}
          >
            <ArrowRight size={16} /> הקודם
          </button>
          
          <span className="text-gray-300">|</span>
          
          <button
            onClick={() => router.push("/recipes")}
            className="flex items-center gap-1 hover:text-amber-600 transition"
          >
            <LayoutGrid size={16} /> התפריט הראשי
          </button>
          
          <span className="text-gray-300">|</span>

          <button
            onClick={() => nextId && router.push(`/recipes/${nextId}`)}
            disabled={!nextId}
            className={`flex items-center gap-1 transition ${nextId ? "hover:text-amber-600" : "opacity-30 cursor-not-allowed"}`}
          >
            הבא <ArrowLeft size={16} />
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
          {recipe.title}
        </h1>

        {/* כפתורי פעולה */}
        <div className="flex gap-3 mt-2">
          <button 
            onClick={() => setIsEditOpen(true)} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:text-amber-600 hover:border-amber-200 shadow-sm transition-all"
          >
            <Edit2 size={16} /> ערוך מתכון
          </button>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 rounded-full text-red-600 hover:bg-red-50 hover:border-red-200 shadow-sm transition-all"
          >
            {isDeleting ? "מוחק..." : <><Trash2 size={16} /> מחק מתכון</>}
          </button>
        </div>
      </div>

      {/* גריד תוכן */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        
        {/* תמונה */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3] bg-gray-100 group">
          {recipe.image_url ? (
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">אין תמונה</div>
          )}
          
          {/* תגיות */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex flex-wrap gap-2">
            {recipe.labels.map((lbl, i) => {
               const color = lbl.color || labelColors[lbl.category] || labelColors.default;
               return (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm backdrop-blur-md"
                  style={{ backgroundColor: color }}
                >
                  {lbl.value}
                </span>
              );
            })}
          </div>
        </div>

        {/* פרטי מתכון */}
        <div className="space-y-8">
          
          {/* מרכיבים */}
          <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span className="bg-white p-1.5 rounded-full shadow-sm text-lg">🥕</span> 
              מצרכים
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* הוראות הכנה */}
          <div>
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 p-1.5 rounded-full shadow-sm text-lg">🍳</span> 
              הוראות הכנה
            </h2>
            <div className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm shadow-md shrink-0">
                      {i + 1}
                    </span>
                    {i !== recipe.instructions.length - 1 && (
                      <div className="w-px h-full bg-amber-200 my-1" />
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isEditOpen && recipe && (
            <EditRecipeModal
                recipe={recipe}
                onClose={() => setIsEditOpen(false)}
                onRecipeUpdated={refreshRecipe}
            />
        )}
      </AnimatePresence>
    </div>
  );
}