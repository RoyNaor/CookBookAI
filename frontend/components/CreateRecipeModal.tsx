"use client";
import { useState } from "react";
import CreateRecipe from "@/components/CreateRecipe";
import CreateRecipeAI from "@/components/CreateRecipeAI";

export default function CreateRecipeModal({ onClose, onRecipeCreated }: { onClose: () => void; onRecipeCreated: () => void }) {
  const [mode, setMode] = useState<"manual" | "ai">("manual");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6">
        {/* כותרת עליונה */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-800">🍳 יצירת מתכון חדש</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-lg font-semibold"
          >
            ✕
          </button>
        </div>

        {/* כפתורי מצב */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("manual")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === "manual"
                ? "bg-amber-700 text-white shadow-md"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            🧑‍🍳 יצירה ידנית
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === "ai"
                ? "bg-amber-700 text-white shadow-md"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            🤖 יצירה עם AI
          </button>
        </div>

        {/* החלפת קומפוננטות */}
        {mode === "manual" ? (
          <CreateRecipe onClose={onClose} onRecipeCreated={onRecipeCreated} />
        ) : (
          <CreateRecipeAI onClose={onClose} onRecipeCreated={onRecipeCreated} />
        )}
      </div>
    </div>
  );
}
