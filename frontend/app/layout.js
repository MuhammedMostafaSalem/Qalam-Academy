import { Cairo, Inter } from "next/font/google";
import "@/styles/globals.css";
import "../styles/norama.css";

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: {
    default: "Norama Tech | نبني ما هو قادم",
    template: "%s | Norama Tech",
  },
  description: "استوديو تقني لتصميم وتطوير المواقع والمنتجات الرقمية وتجارب المستخدم.",
  applicationName: "Norama Tech",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Norama Tech",
    title: "Norama Tech | نبني ما هو قادم",
    description: "نحوّل الأفكار إلى تجارب رقمية تستحق أن تُستخدم.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${cairo.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
