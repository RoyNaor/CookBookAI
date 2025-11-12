"use client";
import { motion } from "framer-motion";
import { ChefHat, Star, Utensils, Crown } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* 🔸 HERO SECTION */}
      <section className="relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* רקע וידאו */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/cooking.mp4" type="video/mp4" />
        </video>

        {/* שכבה כהה עדינה */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

        {/* טקסט על הווידאו */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white px-6"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-amber-500 p-3 rounded-full shadow-md">
              <ChefHat size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            CookBookAI - הבישול שלך, חכם יותר
          </h1>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            גלה עולם של מתכונים עם בינה מלאכותית, ויהפוך כל ארוחה לחוויה קולינרית מושלמת.
          </p>
          <Link
            href="/register"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            התחל לבשל עכשיו
          </Link>
        </motion.div>

        {/* גל מעבר */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L60,186.7C120,181,240,171,360,181.3C480,192,600,224,720,213.3C840,203,960,149,1080,149.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* 🌿 ABOUT SECTION */}
      <section className="relative flex justify-center items-center py-24 px-6 bg-[#fff8e1]">
        <div className="bg-white rounded-3xl shadow-xl max-w-3xl mx-auto p-10 text-center border border-amber-100">
          <h2 className="text-4xl font-bold text-amber-800 mb-6">
            מה זה CookBookAI?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CookBookAI הוא השף האישי שלך — יוצר מתכונים, מציע שדרוגים, מוצא תמונות
            ויודע בדיוק מה מתאים לטעם שלך. 
            <br />
            המערכת שלנו משלבת בינה מלאכותית עם אהבה אמיתית לאוכל.
          </p>
        </div>

        {/* קישוט גל עדין ברקע */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L60,197.3C120,203,240,213,360,213.3C480,213,600,203,720,181.3C840,160,960,128,1080,106.7C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>


      {/* 💎 תוכניות בישול */}
      <section className="bg-amber-50 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-amber-800 mb-12">בחר את תוכנית הבישול שלך</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* חינם */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-md p-8 border border-amber-100"
          >
            <div className="flex justify-center mb-4">
              <Utensils size={40} className="text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-700 mb-4">חינם</h3>
            <p className="text-gray-600 mb-6">
              גישה למתכונים בסיסיים, חיפוש חכם, והשראה קולינרית חדשה כל יום.
            </p>
            <button className="border border-amber-600 text-amber-700 font-semibold px-5 py-2 rounded-full hover:bg-amber-50 transition">
              הצטרף
            </button>
          </motion.div>

          {/* מנוי */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-amber-600 text-white rounded-3xl shadow-lg p-8 border border-amber-700"
          >
            <div className="flex justify-center mb-4">
              <Star size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">מנוי</h3>
            <p className="text-amber-50 mb-6">
              שמור מתכונים, צור ספר בישול אישי וקבל המלצות לפי העדפותיך.
            </p>
            <button className="bg-white text-amber-700 font-semibold px-5 py-2 rounded-full hover:bg-amber-100 transition">
              קנה מנוי
            </button>
          </motion.div>

          {/* פרימיום */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-md p-8 border border-amber-100"
          >
            <div className="flex justify-center mb-4">
              <Crown size={40} className="text-amber-800" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">פרימיום</h3>
            <p className="text-gray-600 mb-6">
              גישה בלתי מוגבלת לכלי בינה מלאכותית, מתכונים בלעדיים, ותמיכה קולינרית אישית.
            </p>
            <button className="bg-amber-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-amber-800 transition">
              שדרג לפרימיום
            </button>
          </motion.div>
        </div>
      </section>

      {/* סיום */}
      <footer className="bg-amber-700 text-white text-center py-6 mt-10">
        <p>© 2025 CookBookAI — כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
