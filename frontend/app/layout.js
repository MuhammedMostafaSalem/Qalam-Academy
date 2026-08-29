import { Cairo, Inter } from "next/font/google";
import AnimationProvider from "@/components/providers/AnimationProvider";
import StoreProvider from "@/store/provider";
import { AuthProvider } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import Toast from "@/components/ui/Toast";
import { cookies } from "next/headers";
import { getPlatformThemeAction, getThemeModeAction } from "@/actions/themeActions";
import { getSettingsAction } from "@/actions/settingsActions";
import { SettingsProvider } from "@/providers/SettingsProvider";
import MaintenanceGate from "@/components/shared/MaintenanceGate";
import {
  DEFAULT_THEME_MODE,
  getRootThemeStyle,
  normalizePalettePair,
  normalizeThemeMode,
  readThemeModeFromCookie,
} from "@/constants/theme";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata() {
  const settingsResult = await getSettingsAction();
  const settings = settingsResult?.success ? settingsResult.data : {};

  return {
    title: settings?.seoTitle || settings?.siteName || "Qalam Academy",
    description: settings?.seoDescription || settings?.siteDescription || "Educational Platform",
    keywords: settings?.seoKeywords || [],
    icons: settings?.favicon ? { icon: settings.favicon } : undefined,
  };
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const storedLang = cookieStore.get("NEXT_LOCALE")?.value || cookieStore.get("NEXT_LANG")?.value;
  let lang = storedLang || "ar";
  const hasAuthCookie = Boolean(cookieStore.get("Qalam_Token")?.value);

  const [platformThemeResult, themeModeResult, settingsResult] = await Promise.all([
    getPlatformThemeAction(),
    hasAuthCookie ? getThemeModeAction() : Promise.resolve(null),
    getSettingsAction(),
  ]);

  const initialPalettes = normalizePalettePair(
    platformThemeResult?.success ? platformThemeResult.data : null
  );
  const initialMode = normalizeThemeMode(
    themeModeResult?.success
      ? themeModeResult.data?.themeMode
      : readThemeModeFromCookie(cookieStore),
    DEFAULT_THEME_MODE
  );
  if (!storedLang && ["ar", "en"].includes(settingsResult?.data?.defaultLanguage)) {
    lang = settingsResult.data.defaultLanguage;
  }
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`scroll-smooth${initialMode === "dark" ? " dark" : ""}`}
      data-scroll-behavior="smooth"
      data-theme={initialMode}
      style={{
        ...getRootThemeStyle(initialPalettes),
        colorScheme: initialMode,
      }}
    >
      <body className={`${cairo.variable} ${inter.variable}`}>
        <StoreProvider>
          <LanguageProvider initialLang={lang}>
            <SettingsProvider initialSettings={settingsResult?.success ? settingsResult.data : null}>
              <AuthProvider>
                <ThemeProvider
                  initialMode={initialMode}
                  initialPalettes={initialPalettes}
                >
                  <AnimationProvider>
                    <MaintenanceGate>{children}</MaintenanceGate>
                    <Toast />
                  </AnimationProvider>
                </ThemeProvider>
              </AuthProvider>
            </SettingsProvider>
          </LanguageProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
