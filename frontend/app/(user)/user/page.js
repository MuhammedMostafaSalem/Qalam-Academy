"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/ui/StatsCards";
import ContinueLearning from "@/components/user/dashboard/home/ContinueLearning";
import MyCoursesPreview from "@/components/user/dashboard/home/MyCoursesPreview";
import {
    HiOutlineAcademicCap,
    HiOutlineCheckBadge,
    HiOutlineClock,
    HiOutlineDocumentCheck,
} from "react-icons/hi2";
import { useAuth } from "@/providers/AuthProvider";
import useStudentDashboard from "@/hooks/dashboard/useStudentDashboard";

export default function UserDashboard() {
    const { user } = useAuth();
    const { dashboardData, loading } = useStudentDashboard();

    const userStats = [
        {
            id: 1,
            title: "الكورسات المشتركة",
            value: loading ? "..." : (dashboardData?.overview?.totalEnrollments ?? "0"),
            description: "كورس",
            icon: HiOutlineAcademicCap,
            color: "bg-primary/10 text-primary",
        },
        {
            id: 2,
            title: "الكورسات المكتملة",
            value: loading ? "..." : (dashboardData?.overview?.completedCourses ?? "0"),
            description: "كورس مكتمل",
            icon: HiOutlineCheckBadge,
            color: "bg-green-500/10 text-green-500",
        },
        {
            id: 3,
            title: "ساعات التعلم",
            value: loading ? "..." : (dashboardData?.overview?.totalHours ?? "0"),
            description: "ساعة",
            icon: HiOutlineClock,
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            id: 4,
            title: "الشهادات",
            value: loading ? "..." : (dashboardData?.overview?.totalCertificates ?? "0"),
            description: "شهادة",
            icon: HiOutlineDocumentCheck,
            color: "bg-yellow-500/10 text-yellow-500",
        },
    ];

    const userName = user
        ? `${user.firstName} ${user.lastName}`
        : "بعودتك";

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title={`مرحبًا، ${userName}`}
                description="جاهز تكمل رحلتك التعليمية؟"
            />
            <StatsCards stats={userStats} />
            <ContinueLearning dashboardData={dashboardData} />
            <MyCoursesPreview />
        </div>
    );
}