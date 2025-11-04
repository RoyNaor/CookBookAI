interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap shadow 
          ${isUser
            ? "bg-amber-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-amber-100"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
