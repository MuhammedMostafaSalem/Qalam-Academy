import { Cairo, Inter } from "next/font/google";
import "@/styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Qalam Academy",
  description: "Educational Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
    >
      <body className={`${cairo.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
