"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getCurrentUserAction, logoutAction } from "@/actions/authActions";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionExpiresAt, setSessionExpiresAt] = useState(null);

    // Get current logged -in user
    const refreshUser = useCallback(async () => {
        setLoading(true);

        try {
            const result = await getCurrentUserAction();

            // if (result.success) {
            //     setUser(result.data);
            // } else {
            //     setUser(null);
            // }
            if (result.success) {
                console.log("CURRENT USER:", result.data);
                setUser(result.data.user);
                return;
            }

            // Session expired or invalid token
            if (result.authExpired) {
                setUser(null);
                setSessionExpiresAt(null);

                return result;
            }

            setUser(null);
            setSessionExpiresAt(null);

            return result;
        } catch (error) {
            setUser(null);
            setSessionExpiresAt(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Automatically check session expiration
    useEffect(() => {
        if (!sessionExpiresAt) {
            return;
        }

        const remainingTime = sessionExpiresAt - Date.now();

        if (remainingTime <= 0) {
            refreshUser();
            return;
        }

        const timer = setTimeout(() => {
            refreshUser();
        }, remainingTime + 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [sessionExpiresAt, refreshUser])

    // Check authentication when app starts
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Logout
    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await logoutAction();

            // Update Navbar immediately
            setUser(null);
            setSessionExpiresAt(null);

            router.replace("/");
            // router.refresh();
        } finally {
            setLoading(false);
        }
    }, [router]);


    // Context Value
    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        setUser,
        refreshUser,
        logout,
        sessionExpiresAt,
        setSessionExpiresAt,
    }), [user, loading, logout, refreshUser, sessionExpiresAt]);

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);