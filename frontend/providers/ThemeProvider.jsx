"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    DEFAULT_THEME_MODE,
    isThemeMode,
    getRootThemeStyle,
    normalizePalettePair,
    normalizeThemeMode,
    persistThemeMode,
    readStoredThemeMode,
    THEME_STORAGE_KEY,
} from "@/constants/theme";
import {
    getPlatformThemeAction,
    setThemeModeAction,
} from "@/actions/themeActions";
import useToast from "@/hooks/useToast";
import { useAuth } from "@/providers/AuthProvider";

const ThemeContext = createContext(null);

function applyThemeToDocument(mode, palettes) {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const safeMode = normalizeThemeMode(mode);
    const safePalettes = normalizePalettePair(palettes);

    Object.entries(getRootThemeStyle(safePalettes)).forEach(([name, value]) => {
        root.style.setProperty(name, value);
    });

    root.dataset.theme = safeMode;
    root.classList.toggle("dark", safeMode === DEFAULT_THEME_MODE);
    root.style.colorScheme = safeMode;
}

export function ThemeProvider({
    children,
    initialMode = DEFAULT_THEME_MODE,
    initialPalettes,
}) {
    const { user, loading: authLoading, setUser } = useAuth();
    const { errorMessage } = useToast();
    const [mode, setMode] = useState(() => normalizeThemeMode(initialMode));
    const [palettes, setPalettes] = useState(() => normalizePalettePair(initialPalettes));
    const [isChangingMode, setIsChangingMode] = useState(false);
    const [isLoadingPalette, setIsLoadingPalette] = useState(false);
    const modeRef = useRef(mode);
    const palettesRef = useRef(palettes);
    const mountedRef = useRef(false);
    const mutationRef = useRef(false);

    useEffect(() => {
        modeRef.current = mode;
        applyThemeToDocument(mode, palettesRef.current);
    }, [mode]);

    useEffect(() => {
        palettesRef.current = palettes;
        applyThemeToDocument(modeRef.current, palettes);
    }, [palettes]);

    const applyMode = useCallback((nextMode, { persist = true } = {}) => {
        const safeMode = normalizeThemeMode(nextMode);
        modeRef.current = safeMode;
        setMode(safeMode);
        if (persist) persistThemeMode(safeMode);
        applyThemeToDocument(safeMode, palettesRef.current);
        return safeMode;
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        applyThemeToDocument(modeRef.current, palettesRef.current);

        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Authenticated user preference is canonical. Guest storage is read only
    // after auth hydration so a stale guest value cannot override the account.
    useEffect(() => {
        if (authLoading) return;

        if (isThemeMode(user?.themeMode)) {
            applyMode(user.themeMode);
            return;
        }

        const storedMode = readStoredThemeMode();
        applyMode(storedMode || DEFAULT_THEME_MODE);
    }, [authLoading, user?.themeMode, applyMode]);

    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key !== THEME_STORAGE_KEY || !isThemeMode(event.newValue)) return;
            if (mutationRef.current) return;
            applyMode(event.newValue);
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [applyMode]);

    const setThemeMode = useCallback(async (requestedMode) => {
        const nextMode = normalizeThemeMode(requestedMode);
        const previousMode = modeRef.current;

        if (nextMode === previousMode || mutationRef.current) return true;

        applyMode(nextMode);

        if (!user) return true;

        mutationRef.current = true;
        setIsChangingMode(true);

        try {
            const result = await setThemeModeAction(nextMode);

            if (!result.success || !isThemeMode(result.data?.themeMode)) {
                applyMode(previousMode);
                errorMessage(result.message || "Failed to save theme mode");
                return false;
            }

            const savedMode = result.data.themeMode;
            applyMode(savedMode);
            setUser((currentUser) => currentUser ? { ...currentUser, themeMode: savedMode } : currentUser);
            return true;
        } catch (error) {
            applyMode(previousMode);
            errorMessage(error?.message || "Failed to save theme mode");
            return false;
        } finally {
            mutationRef.current = false;
            if (mountedRef.current) setIsChangingMode(false);
        }
    }, [applyMode, errorMessage, setUser, user]);

    const toggleTheme = useCallback(() => {
        const nextMode = modeRef.current === "dark" ? "light" : "dark";
        return setThemeMode(nextMode);
    }, [setThemeMode]);

    const refreshPalettes = useCallback(async () => {
        setIsLoadingPalette(true);

        try {
            const result = await getPlatformThemeAction();
            if (result.success && result.data) {
                const nextPalettes = normalizePalettePair(result.data);
                palettesRef.current = nextPalettes;
                setPalettes(nextPalettes);
                return nextPalettes;
            }

            return null;
        } finally {
            if (mountedRef.current) setIsLoadingPalette(false);
        }
    }, []);

    const replacePalettes = useCallback((nextPalettes) => {
        const normalized = normalizePalettePair(nextPalettes);
        palettesRef.current = normalized;
        setPalettes(normalized);
        return normalized;
    }, []);

    const value = useMemo(() => ({
        mode,
        isDark: mode === "dark",
        palettes,
        activePalette: palettes[mode],
        isChangingMode,
        isLoadingPalette,
        toggleTheme,
        setThemeMode,
        replacePalettes,
        refreshPalettes,
    }), [
        isChangingMode,
        isLoadingPalette,
        mode,
        palettes,
        refreshPalettes,
        replacePalettes,
        setThemeMode,
        toggleTheme,
    ]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}

export default ThemeProvider;
