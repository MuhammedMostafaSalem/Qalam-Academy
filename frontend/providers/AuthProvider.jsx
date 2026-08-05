"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/auth/useAuth";

const AuthProvider = ({ children }) => {
    const {
        refreshToken,
        initialized,
    } = useAuth();

    useEffect(() => {
        refreshToken()
            .catch(() => { });
    }, []);


    if (!initialized) {
        return null;
    }

    return children;
};


export default AuthProvider;