"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { getCurrentUserAction, logoutAction } from "@/actions/authActions";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get Current User
    const refreshUser = useCallback(async () => {
        setLoading(true);

        try {
            const result = await getCurrentUserAction();

            console.log("getCurrentUserAction:", result);

            if (result.success) {
                setUser(result.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("refreshUser error:", error);

            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial Auth Check
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Logout
    const logout = useCallback(async () => {
        try {
            await logoutAction();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // IMPORTANT
            // Update React state immediately

            setUser(null);

            router.replace("/");

            router.refresh();
        }
    }, [router]);

    // Session Timer
    useEffect(() => {
        if (!user) {
            return;
        }

        const checkSessionExpiration = () => {
            // sessionExpiresAt is NOT HttpOnly
            // so the browser can read it
            const cookieMatch =
                document.cookie.match(
                    /(?:^|;\s*)sessionExpiresAt=([^;]+)/
                );

            if (!cookieMatch) {
                console.log("No sessionExpiresAt cookie found");

                return;
            }

            const expiresAt = Number(cookieMatch[1]);


            if (!expiresAt) {
                return;
            }

            const remainingTime = expiresAt - Date.now();

            console.log(
                "Session remaining:",
                Math.max(
                    0,
                    Math.round(
                        remainingTime / 1000
                    )
                ),
                "seconds"
            );

            // Already Expired
            if (remainingTime <= 0) {
                console.log("⏰ Session expired - logging out");

                logout();

                return;
            }

            // Schedule Logout
            const timer =
                setTimeout(() => {
                    console.log("⏰ Session expired - logging out");

                    logout();
                }, remainingTime);

            return timer;
        }

        const timer = checkSessionExpiration();

        // Re-check when tab becomes visible
        const handleVisibilityChange = () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                checkSessionExpiration();
            }
        };


        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );


        return () => {

            if (timer) {
                clearTimeout(timer);
            }


            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };

    }, [user, logout]);

    // Context Value
    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        setUser,
        refreshUser,
        logout,
    }), [user, loading, logout, refreshUser]);

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);