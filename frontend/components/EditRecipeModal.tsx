"use client";
import { useState, useEffect } from "react";
import { updateRecipe } from "@/lib/api";
import { Plus, Trash, GripVertical, Save, X, Loader2 } from "lucide-react";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { Reorder, motion } from "framer-motion";

interface Recipe {
  id: number;
  title: string;
  labels: any[];
  ingredients: string[];
  instructions: string[];
  image_url?: string;
}

interface EditRecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onRecipeUpdated: () => void;
}

export default function EditRecipeModal({ recipe, onClose, onRecipeUpdated }: EditRecipeModalProps) {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [extraLabel, setExtraLabel] = useState("");
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  
  const [newIngredient, setNewIngredient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStep, setNewStep] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setImageUrl(recipe.image_url || "");
      setSteps(recipe.instructions || []);

      const typeLabel = recipe.labels.find(l => l.category === "סוג מנה");
      const infoLabel = recipe.labels.find(l => l.category === "מידע נוסף");
      if (typeLabel) setLabel(typeLabel.value);
      if (infoLabel) setExtraLabel(infoLabel.value);

      const parsedIngredients = recipe.ingredients.map(ing => {
        const parts = ing.split(" - "); 
        return { 
          name: parts[0] || ing, 
          amount: parts[1] || "" 
        };
      });
      setIngredients(parsedIngredients);
    }
  }, [recipe]);

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setIngredients([...ingredients, { name: newIngredient, amount: newAmount }]);
    setNewIngredient("");
    setNewAmount("");
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    if (!newStep.trim()) return;
    if (steps.includes(newStep)) return alert("השלב קיים כבר");
    setSteps([...steps, newStep]);
    setNewStep("");
  };

  const removeStep = (val: string) => {
    setSteps(steps.filter((s) => s !== val));
  };

  const handleUpdate = async () => {
    if (!title.trim()) return alert("חובה לתת שם למתכון");
    
    setIsSaving(true); 

    try {
      const ingredientsList = ingredients.map((i) => i.amount ? `${i.name} – ${i.amount}` : i.name);

      const labels = [];
      if (label) labels.push({ category: "סוג מנה", value: label, color: "#3B82F6" });
      if (extraLabel) labels.push({ category: "מידע נוסף", value: extraLabel, color: "#F97316" });

      const updatedData = {
        title,
        labels,
        ingredients: ingredientsList,
        instructions: steps,
        image_url: imageUrl
      };

      await updateRecipe(recipe.id, updatedData);
      
      onRecipeUpdated(); 
      onClose(); 
    } catch (error) {
      console.error(error);
      alert("שגיאה בעדכון המתכון");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.9 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* כותרת */}
        <div className="bg-amber-500 p-4 flex justify-between items-center text-white shadow-md z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
             <Save size={20}/> עריכת מתכון: {recipe.title}
          </h2>
          <button onClick={onClose} className="hover:bg-amber-600 p-2 rounded-full transition"><X size={24}/></button>
        </div>

        {/* תוכן גלילה */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
          
          {/* פרטים ראשיים */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">פרטים כלליים</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">שם המתכון</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 ring-amber-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600">סוג מנה</label>
                        <select value={label} onChange={e => setLabel(e.target.value)} className="w-full border rounded-lg p-2">
                            <option value="">בחר...</option>
                            <option value="ראשונה">ראשונה</option>
                            <option value="עיקרית">עיקרית</option>
                            <option value="קינוח">קינוח</option>
                            <option value="משקה">משקה</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">מידע נוסף</label>
                        <select value={extraLabel} onChange={e => setExtraLabel(e.target.value)} className="w-full border rounded-lg p-2">
                            <option value="">בחר...</option>
                            <option value="צמחוני">צמחוני</option>
                            <option value="טבעוני">טבעוני</option>
                            <option value="ללא גלוטן">ללא גלוטן</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* תמונה */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">תמונת המתכון</label>
                <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                        {imageUrl ? <img src={imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">אין תמונה</div>}
                    </div>
                    <div className="flex-1">
                        <CloudinaryUpload onUpload={setImageUrl} />
                        <p className="text-xs text-gray-400 mt-2">העלאת תמונה חדשה תחליף את הקיימת</p>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* מצרכים */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">מצרכים</h3>
             <div className="flex gap-2 mb-4">
                <input value={newIngredient} onChange={e => setNewIngredient(e.target.value)} placeholder="שם המצרך" className="flex-1 border rounded-lg p-2" />
                <input value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="כמות" className="w-24 border rounded-lg p-2" />
                <button onClick={addIngredient} className="bg-amber-100 text-amber-700 p-2 rounded-lg hover:bg-amber-200"><Plus/></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border">
                        <span>{ing.name} <span className="text-gray-400">|</span> <span className="font-bold">{ing.amount}</span></span>
                        <button onClick={() => removeIngredient(i)} className="text-red-400 hover:text-red-600"><Trash size={16}/></button>
                    </div>
                ))}
             </div>
          </section>

          {/* שלבי הכנה */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">שלבי הכנה (גרירה לשינוי סדר)</h3>
             <div className="flex gap-2 mb-4">
                <input value={newStep} onChange={e => setNewStep(e.target.value)} placeholder="הוסף שלב..." className="flex-1 border rounded-lg p-2" onKeyDown={e => e.key==='Enter' && addStep()} />
                <button onClick={addStep} className="bg-amber-100 text-amber-700 p-2 rounded-lg hover:bg-amber-200"><Plus/></button>
             </div>
             
             <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-2">
                {steps.map(step => (
                    <Reorder.Item key={step} value={step} className="flex gap-3 items-center bg-orange-50 p-3 rounded-lg border border-orange-100 cursor-grab active:cursor-grabbing">
                        <GripVertical size={18} className="text-orange-300"/>
                        <span className="flex-1 text-gray-700">{step}</span>
                        <button onClick={() => removeStep(step)} className="text-red-400 hover:text-red-600"><Trash size={16}/></button>
                    </Reorder.Item>
                ))}
             </Reorder.Group>
          </section>

        </div>

        {/* כפתורים למטה */}
        <div className="p-4 bg-white border-t flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium">ביטול</button>
            <button 
                onClick={handleUpdate} 
                disabled={isSaving}
                className="px-8 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
                {isSaving ? <><Loader2 className="animate-spin"/> שומר...</> : "שמור שינויים"}
            </button>
        </div>

      </motion.div>
    </motion.div>
  );
}