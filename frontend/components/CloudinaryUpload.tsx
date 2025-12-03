"use client";

import { useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
}

export default function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
  useEffect(() => {
    if (!document.getElementById("cloudinary-widget-script")) {
      const script = document.createElement("script");
      script.id = "cloudinary-widget-script";
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const showUploadWidget = () => {
    if (!(window as any).cloudinary) {
      alert("Cloudinary widget not loaded yet, try again in a moment");
      return;
    }

    const cloudinary = (window as any).cloudinary;

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "unsigned_recipes",
        sources: ["local", "url", "camera", "image_search"], 
        googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, 
        googleSearchEngineId: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID, 
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#fff7ed",
            sourceBg: "#fef3c7",
            windowBorder: "#b45309",
            tabIcon: "#92400e",
            inactiveTabIcon: "#d6a451",
            menuIcons: "#78350f",
            link: "#f59e0b",
            action: "#92400e",
            inProgress: "#fbbf24",
            complete: "#84cc16",
            error: "#ef4444",
            textDark: "#451a03",
            textLight: "#fff7ed",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      },
      (err: any, info: any) => {
        if (!err && info.event === "success") {
          console.log("Uploaded:", info.info.secure_url);
          onUpload(info.info.secure_url);
        }
      }
    );

    widget.open();
  };

  return (
    <button
      type="button"
      onClick={showUploadWidget}
      className="bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-all shadow"
    >
      <ImageIcon size={18} />
      העלה תמונה
    </button>
  );
}
