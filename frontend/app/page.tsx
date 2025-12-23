"use client";
import { motion } from "framer-motion";
import { ChefHat, Star, Utensils, Crown, Check, ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div dir="rtl" className="flex flex-col min-h-screen font-sans text-slate-800 overflow-x-hidden">
      
      {/* --------------------------------------------------------- */}
      {/* HERO SECTION 
      {/* --------------------------------------------------------- */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center overflow-hidden pb-20">
        
        {/* רקע וידאו */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/cooking.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-amber-950/80 mix-blend-multiply" />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#fffaf0] via-[#fffaf0]/70 to-transparent z-10"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-20 px-4 max-w-4xl mx-auto text-white mt-20"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 py-2 px-4 rounded-full mb-6">
            <ChefHat size={20} className="text-amber-300" />
            <span className="text-sm font-medium tracking-wide text-amber-100">העתיד של המטבח שלך כאן</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
             הבית החדש של המתכונים שלך
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            בין אם יש לך מתכון מנצח, ובין אם אתה צריך רעיון מאפס  CookBookAI כאן כדי לסגור לך את הפינה לארוחה הבאה.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-amber-600 hover:bg-amber-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              נסה בחינם עכשיו <ArrowLeft size={20} />
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-lg font-medium px-8 py-4 rounded-full transition-all">
              איך זה עובד?
            </button>
          </div>
        </motion.div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* 🌿 ABOUT SECTION 
      {/* --------------------------------------------------------- */}
      <section className="relative py-24 md:py-32 px-6 bg-[#fffaf0] overflow-hidden z-20">
        
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-amber-300/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse-slow"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-[150px] opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-right order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight flex flex-col lg:block items-center">
              הסו שף האישי שלך, <br/>
              <span className="text-amber-600 relative inline-block mt-2 lg:mt-0">
                זמין 24/7
                <svg className="absolute w-full h-4 -bottom-2 right-0 text-amber-300/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 10 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
              </span>
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              CookBookAI היא לא סתם מחברת מתכונים. היא פלטפורמה חכמה שמאפשרת לך לתעד את המנות המשפחתיות, ובמקביל להיעזר בשף וירטואלי כשחסרה השראה.
            </p>

            <ul className="space-y-8 lg:space-y-4 mb-10">
              <li className="flex flex-col items-center lg:flex-row lg:items-start gap-3 text-slate-700 font-medium">
                  <div className="bg-amber-100 p-2 rounded-full shadow-sm shrink-0">
                    <BookOpen size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 text-lg lg:text-base mb-1 lg:mb-0">ספר מתכונים דיגיטלי</span>
                    שמירה ידנית של מתכונים בצורה נוחה ומסודרת.
                  </div>
              </li>

              <li className="flex flex-col items-center lg:flex-row lg:items-start gap-3 text-slate-700 font-medium">
                  <div className="bg-amber-100 p-2 rounded-full shadow-sm shrink-0">
                    <Sparkles size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 text-lg lg:text-base mb-1 lg:mb-0">מחולל מתכונים ב-AI</span>
                    כותבים מה בא לכם לאכול - והמתכון מוכן.
                  </div>
              </li>

              <li className="flex flex-col items-center lg:flex-row lg:items-start gap-3 text-slate-700 font-medium">
                  <div className="bg-amber-100 p-2 rounded-full shadow-sm shrink-0">
                    <Check size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 text-lg lg:text-base mb-1 lg:mb-0">מנוע חיפוש תמונות</span>
                    העליתם מתכון ידני? המערכת תמצא לו תמונה מרהיבה.
                  </div>
              </li>
            </ul>

            <button className="mx-auto lg:mx-0 group flex items-center gap-2 text-amber-700 font-bold hover:text-amber-800 transition text-lg">
              התחל ליצור את הספר שלך
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
            </button>
          </motion.div>

          {/* תמונות */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[650px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-amber-400/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

              <motion.img
                src="/leptop_nbg.png" 
                alt="CookBookAI Desktop"
                className="w-full relative z-10 drop-shadow-2xl"
              />

              <motion.img
                src="/phone_nbg.png" 
                alt="CookBookAI Mobile"
                className="absolute -bottom-6 -right-6 md:bottom-[-30px] md:right-[-40px] w-[38%] z-20 drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* PRICING SECTION */}
      {/* --------------------------------------------------------- */}
      <section className="relative bg-white py-24 px-6 overflow-hidden z-10">
         <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-amber-50/50 rounded-full filter blur-[180px] opacity-50"></div>
         </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-600 font-bold tracking-wider text-sm uppercase bg-amber-50 px-3 py-1 rounded-full">הצטרף למהפכה</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-4">בחר את המסלול שלך</h2>
          <p className="text-slate-500 text-lg">התחל בחינם ושדרג כשאתה מוכן לקחת את הבישול לשלב הבא</p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          
          <PricingCard 
            icon={<Utensils size={28} />}
            title="מתחיל"
            price="0 ₪"
            description="למי שרוצה לנסות ולטעום."
            features={["חיפוש מתכונים חכם", "עד 3 מתכונים ביום", "שמירת מועדפים בסיסית"]}
            buttonText="התחל בחינם"
            active={false}
          />

          <PricingCard 
            icon={<Star size={28} />}
            title="בשלן ביתי"
            price="29 ₪"
            period="/חודש"
            description="הבחירה המומלצת לרוב המשתמשים."
            features={["ללא הגבלת מתכונים", "בניית ספר מתכונים אישי", "המלצות AI מותאמות לטעם", "ללא פרסומות"]}
            buttonText="התחל ניסיון חינם"
            active={true}
            tag="הכי משתלם"
          />

          <PricingCard 
            icon={<Crown size={28} />}
            title="מאסטר שף"
            price="49 ₪"
            period="/חודש"
            description="כל הכלים למקצוענים אמיתיים."
            features={["כל יתרונות הבשלן הביתי", "ניתוח ערכים תזונתיים מלא", "תכנון ארוחות שבועי אוטומטי", "תמיכה מועדפת"]}
            buttonText="שדרג למקצוען"
            active={false}
          />
          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-center py-12 border-t border-slate-900 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-4 text-white font-bold text-xl">
             <ChefHat className="text-amber-500"/> CookBookAI
        </div>
        <p className="text-sm">© 2025 כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}

function PricingCard({ icon, title, price, period = "", description, features, buttonText, active, tag }: any) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative rounded-3xl p-6 border ${
        active 
          ? "bg-slate-900 text-white border-amber-500/50 shadow-2xl shadow-amber-900/30 md:scale-105 z-10" 
          : "bg-white text-slate-800 border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/70"
      } flex flex-col items-center text-center md:items-start md:text-right h-full transition-all duration-300`}
    >
      {active && tag && (
        <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">
          {tag}
        </div>
      )}

      <div className={`p-3 rounded-2xl w-fit mb-5 ${active ? "bg-amber-500/20 text-amber-400" : "bg-amber-50 text-amber-600"}`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className={`text-sm font-medium ${active ? "text-slate-400" : "text-slate-500"}`}>{period}</span>
      </div>
      <p className={`text-sm mb-6 leading-relaxed ${active ? "text-slate-300" : "text-slate-500"}`}>{description}</p>

      <ul className="space-y-3 mb-8 flex-1 w-full">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex flex-col items-center md:flex-row md:items-start gap-2 md:gap-3 text-sm">
            <Check size={18} className={`mt-0.5 shrink-0 ${active ? "text-amber-400" : "text-amber-500"}`} />
            <span className={active ? "text-slate-200" : "text-slate-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all cursor-pointer ${
        active 
          ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30" 
          : "bg-slate-100 hover:bg-slate-200 text-slate-900 hover:text-amber-700"
      }`}>
        {buttonText} 
        {!active && <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />}
      </button>
    </motion.div>
  );
}