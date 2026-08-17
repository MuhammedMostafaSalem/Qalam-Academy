"use client";

import ChartsSection from "@/components/dashboard/home/ChartsSection";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/ui/StatsCards";
import useAdminDashboard from "@/hooks/dashboard/useAdminDashboard";
import { useAuth } from "@/providers/AuthProvider";
import {
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
} from "react-icons/hi2";

export default function Dashboard() {
    const { dashboardData, loading, error } = useAdminDashboard();
    const { user } = useAuth();
    const isInstructor = user?.role === "instructor";

    // Transform dashboard data into stats format
    const statsData = dashboardData?.overview ? (
        isInstructor ? [
            {
                id: 1,
                title: "الكورسات",
                value: (dashboardData.overview.totalCourses || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineAcademicCap,
            },
            {
                id: 2,
                title: "الدروس",
                value: (dashboardData.overview.totalLessons || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineShoppingBag,
            },
            {
                id: 3,
                title: "إجمالي الطلاب",
                value: (dashboardData.overview.totalStudents || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineUsers,
            },
            {
                id: 4,
                title: "متوسط التقييم",
                value: (dashboardData.overview.averageRating || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineCurrencyDollar,
            },
        ] : [
            {
                id: 1,
                title: "إجمالي الإيرادات",
                value: `${((dashboardData.overview.totalRevenue || 0) / 1000).toFixed(1)} ألف جنيه`,
                change: null,
                positive: true,
                icon: HiOutlineCurrencyDollar,
            },
            {
                id: 2,
                title: "إجمالي الطلاب",
                value: (dashboardData.overview.totalStudents || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineUsers,
            },
            {
                id: 3,
                title: "الكورسات",
                value: (dashboardData.overview.totalCourses || 0).toString(),
                change: null,
                positive: true,
                icon: HiOutlineAcademicCap,
            },
            {
                id: 4,
                title: "الطلبات",
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
                <div className="text-center py-10 text-red-500">
                    <p>حدث خطأ أثناء تحميل البيانات: {error}</p>
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
                title={`مرحبًا بعودتك، ${user?.firstName || ""} ${user?.lastName || ""}`}
                description={isInstructor ? "إليك ملخص أداء كورساتك اليوم." : "إليك ملخص أداء موقعك اليوم."}
            />
            <StatsCards stats={statsData} />
            {!isInstructor && <ChartsSection dashboardData={dashboardData} />}
        </div>
    )
}