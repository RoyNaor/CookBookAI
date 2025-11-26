"use client";
import { useState } from "react";
import { createRecipe } from "@/lib/api";
import { Plus, Trash, Image as ImageIcon, GripVertical } from "lucide-react"; 
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { Reorder } from "framer-motion"; 

interface CreateRecipeProps {
  onClose: () => void;
  onRecipeCreated: () => void;
}

export default function CreateRecipe({ onClose, onRecipeCreated }: CreateRecipeProps) {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [extraLabel, setExtraLabel] = useState("");
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStep, setNewStep] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const addIngredient = () => {
    if (!newIngredient.trim() || !newAmount.trim()) return;
    setIngredients([...ingredients, { name: newIngredient, amount: newAmount }]);
    setNewIngredient("");
    setNewAmount("");
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    if (!newStep.trim()) return;
    if (steps.includes(newStep)) {
        alert("השלב הזה כבר קיים ברשימה");
        return;
    }
    setSteps([...steps, newStep]);
    setNewStep("");
  };

  const removeStep = (val: string) => {
    setSteps(steps.filter((s) => s !== val));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("אנא הכנס שם למתכון");
      return;
    }

    try {
      const ingredientsList = ingredients.map((i) => `${i.name} – ${i.amount}`);

      const labels: { category: string; value: string; color: string }[] = [];
      if (label) {
        labels.push({ category: "סוג מנה", value: label, color: "#3B82F6" });
      }
      if (extraLabel) {
        labels.push({ category: "מידע נוסף", value: extraLabel, color: "#F97316" });
      }

      await createRecipe(title, labels, ingredientsList, steps, imageUrl);

      alert("המתכון נשמר בהצלחה!");
      onRecipeCreated(); 
      onClose(); 
    } catch (error) {
      alert("שגיאה בשמירת המתכון");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 space-y-8 max-h-[85vh] overflow-y-auto">
      {/*  פרטי מתכון  */}
      <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">פרטי מתכון</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* שם המתכון */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">שם המתכון</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="למשל: עוגת גבינה קרה"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
            />
          </div>

          {/* סוג מנה */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">סוג מנה</label>
            <select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            >
              <option value="">בחר סוג מנה...</option>
              <option value="ראשונה">ראשונה</option>
              <option value="עיקרית">עיקרית</option>
              <option value="קינוח">קינוח</option>
              <option value="משקה">משקה</option>
            </select>
          </div>

          {/* מידע נוסף */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">מידע נוסף</label>
            <select
              value={extraLabel}
              onChange={(e) => setExtraLabel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            >
              <option value="">בחר מידע נוסף...</option>
              <option value="צמחוני">צמחוני</option>
              <option value="טבעוני">טבעוני</option>
              <option value="ללא גלוטן">ללא גלוטן</option>
            </select>
          </div>
        </div>

        {/* העלאת תמונה */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">תמונה</label>
          <div className="flex items-center gap-3">
            <CloudinaryUpload onUpload={(url) => setImageUrl(url)} />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="תצוגה מקדימה"
                className="rounded-lg shadow-md max-h-32 object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/*  מצרכים */}
      <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">מצרכים</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="שם מצרך"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
          />
          <input
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="כמות"
            className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
          />
          <button
            onClick={addIngredient}
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-1"
          >
            <Plus size={16} /> הוסף
          </button>
        </div>

        <div className="space-y-2 text-amber-900">
          {ingredients.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-amber-100 px-4 py-2 rounded-lg">
              <span>
                {item.name} – <span className="text-gray-700">{item.amount}</span>
              </span>
              <button onClick={() => removeIngredient(i)}>
                <Trash size={16} className="text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/*  שלבי הכנה  */}
      <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">שלבי הכנה</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="הוסף שלב חדש..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
            onKeyDown={(e) => e.key === "Enter" && addStep()}
          />
          <button
            onClick={addStep}
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-1"
          >
            <Plus size={16} /> הוסף
          </button>
        </div>

        {/* רשימת גרירה */}
        <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-2">
          {steps.map((step) => (
            <Reorder.Item
              key={step} 
              value={step}
              className="flex justify-between items-center bg-orange-100 px-4 py-3 rounded-lg shadow-sm border border-orange-200 cursor-grab active:cursor-grabbing"
              whileDrag={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 w-full">
                {/* אייקון גרירה */}
                <GripVertical size={20} className="text-orange-400 shrink-0" />
                <span className="text-amber-900 flex-1">{step}</span>
              </div>
              
              <button 
                onClick={() => removeStep(step)} 
                className="bg-white p-1.5 rounded-full shadow-sm hover:bg-red-50 transition"
              >
                <Trash size={16} className="text-red-500" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        {steps.length === 0 && (
            <p className="text-gray-400 text-center text-sm mt-2">עדיין אין שלבים. הוסף שלב חדש למעלה.</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg py-3 transition-all shadow-md hover:shadow-lg transform active:scale-[0.99]"
      >
        🍽️ שמור מתכון
      </button>
    </div>
  );
}