"use client";
import { useState, useEffect } from "react";
import { getRecipes } from "@/lib/api";
import DropdownButton from "@/components/DropdownButton";
import RecipeCard from "@/components/RecipeCard";
import { Search, RotateCcw, Plus, XCircle } from "lucide-react";
import CreateRecipeModal from "@/components/CreateRecipeModal"; 
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [extraFilter, setExtraFilter] = useState("");
  const router = useRouter();

  const loadRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  interface Label {
    category: string;
    value: string;
  }

  interface Recipe {
    id: number;
    title: string;
    labels?: Label[];
    [key: string]: any;
  }

  const filteredRecipes: Recipe[] = (recipes as Recipe[])
    .filter((r: Recipe) => r.title.toLowerCase().includes(search.toLowerCase()))
    .filter((r: Recipe) =>
      typeFilter
        ? Boolean(r.labels?.some((lbl: Label) => lbl.category === "סוג מנה" && lbl.value === typeFilter))
        : true
    )
    .filter((r: Recipe) =>
      extraFilter
        ? Boolean(r.labels?.some((lbl: Label) => lbl.category === "מידע נוסף" && lbl.value === extraFilter))
        : true
    )
    .sort((a: Recipe, b: Recipe) => {
      if (sortOption === "א–ת") return a.title.localeCompare(b.title);
      if (sortOption === "ת–א") return b.title.localeCompare(a.title);
      if (sortOption === "חדש לישן") return b.id - a.id;
      if (sortOption === "ישן לחדש") return a.id - b.id;
      return 0;
    });

  const resetFilters = () => {
    setSearch("");
    setSortOption("");
    setTypeFilter("");
    setExtraFilter("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      {/* כותרת עליונה */}
      <div className="flex flex-col items-center justify-center mb-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          מה מבשלים היום?
        </h1>
        {/* <p className="text-gray-600 text-lg">צור ושתף את המנות האהובות עליך</p> */}
      </div>

      {/* סרגל פילטרים */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <DropdownButton
          label={typeFilter || "סוג המנה"}
          options={["ראשונה", "עיקרית", "קינוח", "משקה"]}
          onSelect={(option) => setTypeFilter(option)}
        />

        <DropdownButton
          label={extraFilter || "מידע נוסף"}
          options={["צמחוני", "טבעוני", "ללא גלוטן"]}
          onSelect={(option) => setExtraFilter(option)}
        />

        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש..."
            className="border border-gray-300 rounded-full px-4 py-2 pr-9 text-gray-800 focus:ring-2 focus:ring-amber-500 outline-none w-48 sm:w-64"
          />
          <Search
            size={16}
            className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
          />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          title="רענן רשימה"
        >
          <RotateCcw size={18} className="text-gray-700" />
        </button>

        <DropdownButton
          label={sortOption || "מיין לפי"}
          options={["חדש לישן", "ישן לחדש", "א–ת", "ת–א"]}
          onSelect={(option) => setSortOption(option)}
        />

        {/* כפתור איפוס */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 transition"
        >
          <XCircle size={18} />
          איפוס סינון
        </button>

        {/* כפתור מתכון חדש */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full px-5 py-2 transition-all shadow"
        >
          <Plus size={18} />
          מתכון חדש
        </button>
      </div>

      {/* גריד מתכונים */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              labels={recipe.labels}
              image_url={recipe.image_url}
              onClick={() => router.push(`/recipes/${recipe.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">לא נמצאו מתכונים</p>
      )}

      {/* מודאל יצירת מתכון */}
      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>

              {/* ✅ החלפה בין יצירה ידנית / AI */}
              <CreateRecipeModal
                onClose={() => setIsCreateOpen(false)}
                onRecipeCreated={loadRecipes}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
