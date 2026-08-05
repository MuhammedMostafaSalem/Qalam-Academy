"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/auth/useAuth";

const ProtectedRoute = ({
    children,
    allowedRoles,
}) => {
    const router = useRouter();

    const {
        initialized,
        isAuthenticated,
        user,
    } = useAuth();

    useEffect(() => {
        if (!initialized) return;

        if (!isAuthenticated) {
            router.replace("/login");

            return;
        }

        if (
            !allowedRoles.includes(user.role)
        ) {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.replace("/");
            }
        }
    }, [
        initialized,
        isAuthenticated,
        user,
        allowedRoles,
        router,
    ]);

    if (!initialized) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (
        !allowedRoles.includes(user.role)
    ) {
        return null;
    }

    return children;
};

export default ProtectedRoute;