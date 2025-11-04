import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CookBookAI",
  description: "הספר שלך למתכונים חכמים",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-cream text-chocolate min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-0">
          
          {children}
          </main>
      </body>
    </html>
  );
}
