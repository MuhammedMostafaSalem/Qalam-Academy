"use client";

import ChartsSection from "@/components/dashboard/home/ChartsSection";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/ui/StatsCards";
import useAdminDashboard from "@/hooks/dashboard/useAdminDashboard";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import {
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
} from "react-icons/hi2";

export default function Dashboard() {
    const { dashboardData, loading, error } = useAdminDashboard();
    const { user } = useAuth();
    const { language } = useLanguage();
    const isInstructor = user?.role === "instructor";
    const isEnglish = language === "en";
    const locale = isEnglish ? "en-US" : "ar-EG";
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    const revenueInThousands = new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
    }).format((dashboardData?.overview?.totalRevenue || 0) / 1000);

    // Transform dashboard data into stats format
    const statsData = dashboardData?.overview ? (
        isInstructor ? [
            {
                id: 1,
                title: isEnglish ? "Courses" : "الدورات",
                value: (dashboardData.overview.totalCourses || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineAcademicCap,
            },
            {
                id: 2,
                title: isEnglish ? "Lessons" : "الدروس",
                value: (dashboardData.overview.totalLessons || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineShoppingBag,
            },
            {
                id: 3,
                title: isEnglish ? "Total Students" : "إجمالي الطلاب",
                value: (dashboardData.overview.totalStudents || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineUsers,
            },
            {
                id: 4,
                title: isEnglish ? "Average Rating" : "متوسط التقييم",
                value: (dashboardData.overview.averageRating || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineCurrencyDollar,
            },
        ] : [
            {
                id: 1,
                title: isEnglish ? "Total Revenue" : "إجمالي الإيرادات",
                value: `${revenueInThousands} ${isEnglish ? "K EGP" : "ألف ج.م"}`,
                change: null,
                positive: true,
                icon: HiOutlineCurrencyDollar,
            },
            {
                id: 2,
                title: isEnglish ? "Total Students" : "إجمالي الطلاب",
                value: (dashboardData.overview.totalStudents || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineUsers,
            },
            {
                id: 3,
                title: isEnglish ? "Courses" : "الدورات",
                value: (dashboardData.overview.totalCourses || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineAcademicCap,
            },
            {
                id: 4,
                title: isEnglish ? "Orders" : "الطلبات",
                value: (dashboardData.overview.totalOrders || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineShoppingBag,
            },
        ]
    ) : [];

    if (loading) {
        return (
            <div
                className="
                    glass 
                    rounded-3xl
                    border
                    border-border
                    p-6
                    shadow-sm
                "
            >
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="
                    glass 
                    rounded-3xl
                    border
                    border-border
                    p-6
                    shadow-sm
                "
            >
                <div className="text-center py-10 text-error">
                    <p>
                        {isEnglish ? "Unable to load dashboard data: " : "تعذّر تحميل بيانات لوحة التحكم: "}
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PageHeader
                title={isEnglish
                    ? `Welcome back${fullName ? `, ${fullName}` : ""}`
                    : `مرحبًا بعودتك${fullName ? `، ${fullName}` : ""}`}
                description={isInstructor
                    ? (isEnglish ? "Here’s a summary of your course performance today." : "إليك ملخص أداء دوراتك اليوم.")
                    : (isEnglish ? "Here’s a summary of your platform performance today." : "إليك ملخص أداء منصتك اليوم.")}
            />
            <StatsCards stats={statsData} />
            {!isInstructor && <ChartsSection dashboardData={dashboardData} />}
        </div>
    )
}
