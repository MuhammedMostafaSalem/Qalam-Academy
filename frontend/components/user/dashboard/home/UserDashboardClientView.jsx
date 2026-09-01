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
import { useLanguage } from "@/providers/LanguageProvider";

export default function UserDashboardClientView() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const isEn = language === "en";
    const { dashboardData, loading } = useStudentDashboard();

    const userStats = [
        {
            id: 1,
            title: isEn ? "Enrolled Courses" : "الكورسات المشتركة",
            value: loading ? "..." : (dashboardData?.overview?.totalEnrollments ?? "0"),
            description: isEn ? "Courses" : "كورس",
            icon: HiOutlineAcademicCap,
            color: "bg-primary/10 text-primary",
        },
        {
            id: 2,
            title: isEn ? "Completed Courses" : "الكورسات المكتملة",
            value: loading ? "..." : (dashboardData?.overview?.completedCourses ?? "0"),
            description: isEn ? "Completed" : "كورس مكتمل",
            icon: HiOutlineCheckBadge,
            color: "bg-success/10 text-success",
        },
        {
            id: 3,
            title: isEn ? "Learning Hours" : "ساعات التعلم",
            value: loading ? "..." : (dashboardData?.overview?.totalHours ?? "0"),
            description: isEn ? "Hours" : "ساعة",
            icon: HiOutlineClock,
            color: "bg-primary/10 text-primary",
        },
        {
            id: 4,
            title: isEn ? "Certificates" : "الشهادات",
            value: loading ? "..." : (dashboardData?.overview?.totalCertificates ?? "0"),
            description: isEn ? "Certificates" : "شهادة",
            icon: HiOutlineDocumentCheck,
            color: "bg-warning/10 text-warning",
        },
    ];

    const userName = user
        ? `${user.firstName} ${user.lastName}`
        : (isEn ? "Back" : "بعودتك");

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
                title={isEn ? `Welcome, ${userName}` : `مرحبًا، ${userName}`}
                description={isEn ? "Ready to continue your learning journey?" : "جاهز تكمل رحلتك التعليمية؟"}
            />
            <StatsCards stats={userStats} />
            <ContinueLearning dashboardData={dashboardData} />
            <MyCoursesPreview />
        </div>
    );
}
