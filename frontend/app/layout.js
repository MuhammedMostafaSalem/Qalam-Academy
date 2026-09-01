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

import { generateSEOMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from "@/utils/seo";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata() {
  return generateSEOMetadata({ isRoot: true });
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
        <JsonLd data={generateOrganizationJsonLd(settingsResult?.data, lang)} />
        <JsonLd data={generateWebSiteJsonLd(settingsResult?.data, lang)} />
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
