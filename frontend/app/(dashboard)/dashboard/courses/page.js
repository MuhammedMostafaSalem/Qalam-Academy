"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import CoursesTable from "@/components/dashboard/courses/CoursesTable";
import CoursesToolbar from "@/components/dashboard/courses/CoursesToolbar";
import PageHeader from "@/components/dashboard/PageHeader";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminCourses() {
    const { language } = useLanguage();
    const isEn = language === "en";
    const router = useRouter();

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
                title={isEn ? "Courses" : "الكورسات"}
                description={isEn ? "Manage and view all platform courses" : "ادارة جميع كورسات المنصة"}
                button={isEn ? "Add New Course" : "اضافة كورس جديد"}
                buttonHref="/dashboard/courses/new"
            />
            <Suspense fallback={<div className="mt-[20px] text-center">{isEn ? "Loading toolbar..." : "جاري تحميل شريط الأدوات..."}</div>}>
                <CoursesToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">{isEn ? "Loading courses..." : "جاري تحميل الكورسات..."}</div>}>
                <CoursesTable />
            </Suspense>
        </div>
    );
}
