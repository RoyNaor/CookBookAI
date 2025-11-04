"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { ChefHat} from "lucide-react";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-amber-100 via-white to-amber-50 shadow-sm border-b border-amber-200 backdrop-blur-md"

    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 h-[9vh]">
        {/* לוגו */}
        {/* לוגו ושם האתר */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-amber-600 text-white rounded-full p-2">
            <ChefHat size={20} />
          </div>
          <span className="text-2xl font-bold text-amber-700">CookBookAI</span>
        </Link>

        {/* קישורים לדסקטופ
        <ul className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
          <li>
            <Link href="/recipes" className="hover:text-amber-700 transition">
              מתכונים
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-amber-700 transition">
              אודות
            </Link>
          </li>
        </ul> */}

        {/* כפתורי התחברות / הרשמה */}
        <div className="hidden md:flex items-center gap-3">
          <button className="bg-amber-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-amber-800 transition">
            התחבר
          </button>
          <button className="border-2 border-amber-700 text-amber-700 font-semibold px-4 py-2 rounded-full hover:bg-amber-50 transition">
            הירשם
          </button>
        </div>

        {/* תפריט מובייל */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-amber-700 text-2xl"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* תפריט נפתח במובייל */}
      {menuOpen && (
        <motion.ul
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden bg-white border-t border-amber-100 shadow-lg flex flex-col items-center py-4 gap-3 text-lg text-gray-800"
        >
          {/* <Link
            href="/recipes"
            onClick={() => setMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            מתכונים
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            אודות
          </Link> */}

          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-amber-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-amber-800 transition">
              התחבר
            </button>
            <button className="border-2 border-amber-700 text-amber-700 font-semibold px-4 py-2 rounded-full hover:bg-amber-50 transition">
              הירשם
            </button>
          </div>
        </motion.ul>
      )}
    </motion.header>
  );
}
