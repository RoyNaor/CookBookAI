"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChefHat } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem("token", token);
      setMessage("ההתחברות הצליחה!");
      setTimeout(() => router.push("/"), 800);
    } catch (error) {
      setMessage("שגיאה בהתחברות. בדוק את הפרטים שלך.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      sessionStorage.setItem("token", token);
      setMessage("התחברת בהצלחה באמצעות Google!");
      setTimeout(() => router.push("/"), 800);
    } catch (error) {
      setMessage("התחברות עם Google נכשלה.");
    }
  };

  return (
    <div dir="rtl" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden">
      {/* תמונת רקע */}
      <img
        src="/images/cook-bg.jpg"
        alt="Cookbook background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* שכבת שקיפות */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/70 backdrop-blur-sm"></div>

      {/* כרטיס */}
      <div className="relative z-10 bg-white/90 rounded-3xl shadow-2xl p-10 w-[90%] max-w-md text-center border border-amber-100">
        {/* לוגו */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-amber-600 text-white rounded-full p-3 mb-3 shadow-md">
            <ChefHat size={30} />
          </div>
          <h1 className="text-3xl font-bold text-amber-800">ברוכים השבים! </h1>
          <p className="text-gray-600 mt-1">התחבר לחשבון שלך ב־CookBookAI</p>
        </div>

        {/* טופס */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
          <input
            type="email"
            placeholder="אימייל"
            className="p-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-right"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="סיסמה"
            className="p-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-right"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-amber-700 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-all duration-200 shadow-md"
          >
            התחבר
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">או</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* כפתור Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-200"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            התחבר באמצעות Google
          </button>
        </form>

        {/* הודעת שגיאה / הצלחה */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              message.includes("הצלחה") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* לינק להרשמה */}
        <p className="text-gray-600 mt-6 text-sm">
          אין לך חשבון?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-amber-700 hover:underline cursor-pointer font-semibold"
          >
            הירשם כאן
          </span>
        </p>
      </div>
    </div>
  );
}
