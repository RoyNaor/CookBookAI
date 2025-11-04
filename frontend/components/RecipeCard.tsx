"use client";
import { Utensils } from "lucide-react";

interface Label {
  category: string;
  value: string;
}

interface RecipeCardProps {
  title: string;
  labels?: Label[];
  image_url?: string;
  onClick?: () => void;
}

export default function RecipeCard({
  title,
  labels = [],
  image_url,
  onClick,
}: RecipeCardProps) {
  const labelColors: Record<string, string> = {
    "סוג מנה": "#3B82F6", // כחול
    "סוג מטבח": "#22C55E", // ירוק
    "מידע נוסף": "#F97316", // כתום
    default: "#6B7280", // אפור
  };

  const hasImage = image_url && image_url.trim() !== "";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* חלק עליון – תמונה או אייקון */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
        {hasImage ? (
          <img
            src={image_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 z-0"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-amber-700 z-10">
            <Utensils className="w-14 h-14 mb-2" />
          </div>
        )}

        {/* תגיות צבעוניות */}
        {labels.length > 0 && (
          <div className="absolute bottom-2 flex flex-wrap justify-center gap-2 px-2 z-10">
            {labels.map((label, index) => {
              const color =
                labelColors[label.category] || labelColors.default;
              return (
                <span
                  key={index}
                  className="text-xs font-semibold px-2 py-1 rounded-full text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {label.value}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* כותרת המתכון */}
      <div className="p-3 text-center">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
          {title}
        </h2>
      </div>
    </div>
  );
}
