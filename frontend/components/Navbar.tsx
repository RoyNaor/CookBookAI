"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { ChefHat, User as UserIcon, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  

   

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-amber-100 via-white to-amber-50 shadow-sm border-b border-amber-200 backdrop-blur-md"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 h-[9vh]">
        {/* לוגו */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-amber-600 text-white rounded-full p-2">
            <ChefHat size={20} />
          </div>
          <span className="text-2xl font-bold text-amber-700">CookBookAI</span>
        </Link>

        {/* צד שמאל */}
        <div className="hidden md:flex items-center gap-5 relative">
          {user ? (
            <>
              {/* בלוק המשתמש */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 relative focus:outline-none hover:scale-105 transition"
              >
                {/* תמונה או אייקון */}
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-amber-600 shadow-sm object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center border-2 border-amber-600 shadow-sm">
                    <UserIcon className="text-white" size={20} />
                  </div>
                )}

                {/* שם המשתמש */}
                <span className="text-amber-800 text-lg font-semibold tracking-tight">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-14 left-0 bg-white rounded-xl shadow-lg border border-amber-100 py-2 w-52 text-center"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50 px-4 py-2 w-full transition rounded-lg"
                  >
                    <LogOut size={18} />
                    התנתק
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-amber-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-amber-800 transition">
                  התחבר
                </button>
              </Link>
              <Link href="/register">
                <button className="border-2 border-amber-700 text-amber-700 font-semibold px-4 py-2 rounded-full hover:bg-amber-50 transition">
                  הירשם
                </button>
              </Link>
            </>
          )}
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
          {user ? (
            <>
              <div className="flex flex-col items-center gap-3">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border-2 border-amber-600 shadow-sm object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center border-2 border-amber-600 shadow-sm">
                    <UserIcon className="text-white" size={30} />
                  </div>
                )}
                <span className="text-amber-700 font-semibold text-lg">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white bg-amber-700 px-4 py-2 rounded-full hover:bg-amber-800 transition"
                >
                  <LogOut size={16} />
                  התנתק
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link href="/login">
                <button className="bg-amber-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-amber-800 transition">
                  התחבר
                </button>
              </Link>
              <Link href="/register">
                <button className="border-2 border-amber-700 text-amber-700 font-semibold px-4 py-2 rounded-full hover:bg-amber-50 transition">
                  הירשם
                </button>
              </Link>
            </div>
          )}
        </motion.ul>
      )}
    </motion.header>
  );
}
