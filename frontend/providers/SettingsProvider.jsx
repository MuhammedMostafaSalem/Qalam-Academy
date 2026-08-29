"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSettingsAction } from "@/actions/settingsActions";

const SettingsContext = createContext(null);

export function SettingsProvider({ children, initialSettings = null }) {
    const [settings, setSettings] = useState(initialSettings || {});

    const replaceSettings = useCallback((nextSettings) => {
        setSettings(nextSettings || {});
    }, []);

    const refreshSettings = useCallback(async () => {
        const result = await getSettingsAction();
        if (result.success && result.data) {
            setSettings(result.data);
            return result.data;
        }
        return null;
    }, []);

    useEffect(() => {
        const pageTitle = settings.seoTitle || settings.siteName;
        if (pageTitle) document.title = pageTitle;

        if (settings.favicon) {
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement("link");
                favicon.rel = "icon";
                document.head.appendChild(favicon);
            }
            favicon.href = settings.favicon;
        }
    }, [settings.favicon, settings.seoTitle, settings.siteName]);

    const value = useMemo(() => ({
        settings,
        replaceSettings,
        refreshSettings,
    }), [refreshSettings, replaceSettings, settings]);

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function usePlatformSettings() {
    const context = useContext(SettingsContext);
    if (!context) throw new Error("usePlatformSettings must be used within SettingsProvider");
    return context;
}
