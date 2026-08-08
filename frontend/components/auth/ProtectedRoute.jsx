"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import FullPageLoader from "../ui/FullPageLoader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            // لو المستخدم مش مسجل دخول، حوله لصفحة تسجيل الدخول
            if (!isAuthenticated) {
                router.replace("/");
                return;
            }

            // لو فيه أدوار محددة مطلوبة، افحص هل المستخدم يمتلك الدور المناسب أم لا
            if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
                // توجيه المستخدم حسب دوره لو حاول يدخل مكان مش مخصص ليه
                const dashboardRoutes = {
                    admin: "/dashboard",
                    instructor: "/instructor",
                    student: "/user",
                };

                const redirectPath = dashboardRoutes[user?.role] || "/";
                router.replace(redirectPath);
            }
        }
    }, [isAuthenticated, loading, user, allowedRoles, router]);

    // عرض شاشة تحميل أثناء التحقق من الـ Token والـ User
    if (loading) {
        return (
            <FullPageLoader />
        );
    }

    // لو مسجل دخول وصاحب صلاحية، اعرض المحتوى
    if (isAuthenticated && (allowedRoles.length === 0 || allowedRoles.includes(user?.role))) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectedRoute;