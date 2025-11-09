"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import MessageBubble from "@/components/MessageBubble";

interface CreateRecipeAIProps {
  onClose: () => void;
  onRecipeCreated: () => void;
}

export default function CreateRecipeAI({ onClose, onRecipeCreated }: CreateRecipeAIProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "היי 👋 אני הסו שף שלך להיום. ספר לי מה בא לך לבשל היום!" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetchWithAuth("http://127.0.0.1:8000/agent/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.reply || "שגיאה מהשרת" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ שגיאה בשליחה לשרת" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[65vh] bg-amber-50 rounded-xl border border-amber-200 shadow-inner">
      {/* חלון הודעות */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role as "user" | "assistant"} content={msg.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* תיבת קלט */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתוב הודעה..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 py-2 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
