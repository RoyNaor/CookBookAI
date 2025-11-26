"use client";
import { ChefHat, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "fullscreen"; 
  className?: string;
}

export default function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  
  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fffaf0]/80 backdrop-blur-sm">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-t-4 border-l-4 border-amber-500 border-r-4 border-amber-200 border-b-amber-200"
          />
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ChefHat size={40} className="text-amber-600" />
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-amber-800 font-bold tracking-widest text-lg animate-pulse"
        >
          מכין את המטבח...
        </motion.p>
      </div>
    );
  }

  const sizeClasses = {
    sm: "w-4 h-4",    
    md: "w-8 h-8",    
    lg: "w-12 h-12",  
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 
        className={`animate-spin text-amber-600 ${sizeClasses[size]}`} 
      />
    </div>
  );
}