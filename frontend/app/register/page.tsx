"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChefHat, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { syncUserToBackend } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await syncUserToBackend(userCredential.user, token);
      sessionStorage.setItem("token", token);
      
      setIsSuccess(true);
      setTimeout(() => router.push("/recipes"), 2000); 
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError("האימייל הזה כבר קיים במערכת.");
      } else if (error.code === 'auth/weak-password') {
        setError("הסיסמה חלשה מדי (מינימום 6 תווים).");
      } else {
        setError("שגיאה בהרשמה. נסה שוב מאוחר יותר.");
      }
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await syncUserToBackend(result.user, token);
      sessionStorage.setItem("token", token);
      
      setIsSuccess(true);
      setTimeout(() => router.push("/recipes"), 2000);
    } catch (error) {
      setError("ההתחברות עם Google נכשלה.");
      setIsLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden"
    >
      {/* תמונת רקע */}
      <img
        src="/images/cook-bg.jpg"
        alt="Cookbook background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/70 backdrop-blur-sm"></div>

      {/* כרטיס ראשי */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/90 rounded-3xl shadow-2xl p-10 w-[90%] max-w-md text-center border border-amber-100 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">ברוך הבא!</h2>
              <p className="text-gray-600">החשבון נוצר בהצלחה.</p>
              <p className="text-amber-600 text-sm mt-4 animate-pulse">מעביר למטבח שלך...</p>
            </motion.div>

          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* לוגו */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-amber-600 text-white rounded-full p-3 mb-3 shadow-md">
                  <ChefHat size={30} />
                </div>
                <h1 className="text-3xl font-bold text-amber-800">צור חשבון חדש</h1>
                <p className="text-gray-600 mt-1">הצטרף עכשיו ל־CookBookAI</p>
              </div>

              {/* הודעת שגיאה צפה */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 mb-4 text-sm font-medium"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                    <button onClick={() => setError("")} className="mr-auto hover:bg-red-100 p-1 rounded-full"><X size={14}/></button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* טופס */}
              <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-2">
                <input
                  type="email"
                  placeholder="אימייל"
                  disabled={isLoading}
                  className="p-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-right transition-all disabled:opacity-50 disabled:bg-gray-100"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="סיסמה"
                  disabled={isLoading}
                  className="p-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-right transition-all disabled:opacity-50 disabled:bg-gray-100"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="אימות סיסמה"
                  disabled={isLoading}
                  className="p-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-none text-right transition-all disabled:opacity-50 disabled:bg-gray-100"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-700 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      יוצר משתמש...
                    </>
                  ) : (
                    "הירשם"
                  )}
                </button>

                <div className="flex items-center gap-2 my-1">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-xs">או</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* כפתור Google */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5 text-gray-500" />
                  ) : (
                    <>
                      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                      הירשם באמצעות Google
                    </>
                  )}
                </button>
              </form>

              {/* לינק להתחברות */}
              <p className="text-gray-600 mt-6 text-sm">
                כבר יש לך חשבון?{" "}
                <span
                  onClick={() => !isLoading && router.push("/login")}
                  className={`text-amber-700 hover:underline cursor-pointer font-semibold ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                >
                  התחבר כאן
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}