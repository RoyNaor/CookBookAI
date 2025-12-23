"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import MessageBubble from "@/components/MessageBubble";
import { motion } from "framer-motion"; 

interface CreateRecipeAIProps {
  onClose: () => void;
  onRecipeCreated: () => void;
}

export default function CreateRecipeAI({ onClose, onRecipeCreated }: CreateRecipeAIProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "היי 👋 אני הסו שף שלך להיום. ספר לי מה בא לך לבשל היום!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true); 

    try {
      const res = await fetchWithAuth("http://127.0.0.1:8000/agent/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.reply || "שגיאה מהשרת" };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      if (onRecipeCreated) {
         onRecipeCreated(); 
      }

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ שגיאה בשליחה לשרת" },
      ]);
    } finally {
      setIsTyping(false); 
    }
  };

  return (
    <div className="flex flex-col h-[65vh] bg-amber-50 rounded-xl border border-amber-200 shadow-inner">
      {/* חלון הודעות */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role as "user" | "assistant"} content={msg.content} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm inline-flex items-center gap-1">
              <span className="text-xs text-gray-400 ml-2 font-medium">השף חושב</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                    animate={{ y: [0, -6, 0] }} 
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: dot * 0.2, 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* תיבת קלט */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתוב הודעה..."
          disabled={isTyping} 
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isTyping || !input.trim()}
          className={`rounded-full px-4 py-2 flex items-center justify-center transition-all ${
             isTyping || !input.trim() 
               ? "bg-gray-300 cursor-not-allowed" 
               : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}