"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { getCurrentUserAction, logoutAction } from "@/actions/authActions";

const useUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // دالة لجلب بيانات المستخدم
    const fetchUser = useCallback(async () => {
        setLoading(true);
        const result = await getCurrentUserAction();

        if (result.success && result.user) {
            setUser(result.user);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // دالة تسجيل الخروج العامة
    const logout = async () => {
        const result = await logoutAction();

        if (result.success) {
            setUser(null);
            dispatch(
                showToast({
                    message: result.message || "تم تسجيل الخروج بنجاح",
                    type: "success",
                })
            );
            router.push("/");
            // router.refresh();
            // window.location.reload();
        } else {
            dispatch(
                showToast({
                    message: result.message || "حدث خطأ أثناء تسجيل الخروج",
                    type: "error",
                })
            );
        }
    };

    return {
        user,
        isAuthenticated: !!user,
        loading,
        refetchUser: fetchUser, // لتحديث البيانات يدوياً لو لزم الأمر (مثلاً بعد تعديل الملف الشخصي)
        logout,
    };
};

export default useUser;