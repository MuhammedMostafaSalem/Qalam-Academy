import { Cairo, Inter } from "next/font/google";
import AnimationProvider from "@/components/providers/AnimationProvider";
import StoreProvider from "@/store/provider";
import { AuthProvider } from "@/providers/AuthProvider";
import "@/styles/globals.css";
import Toast from "@/components/ui/Toast";

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
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className={`${cairo.variable} ${inter.variable}`}>
        <StoreProvider>
          <AuthProvider>
            <AnimationProvider>
              {children}
              <Toast />
            </AnimationProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
