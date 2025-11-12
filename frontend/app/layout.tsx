import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata = {
  title: "CookBookAI",
  description: "הספר שלך למתכונים חכמים",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-cream text-chocolate min-h-screen flex flex-col">
        <NavbarWrapper />
        <main className="flex-1 p-0">{children}</main>
      </body>
    </html>
  );
}
