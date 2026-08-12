"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import CoursesTable from "@/components/dashboard/courses/CoursesTable";
import CoursesToolbar from "@/components/dashboard/courses/CoursesToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminCourses() {
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
                title="الكورسات"
                description="ادارة جميع كورسات المنصة"
                button="اضافة كورس جديد"
                buttonHref="/dashboard/courses/new"
            />
            <Suspense fallback={<div className="mt-[20px] text-center">جاري تحميل شريط الأدوات...</div>}>
                <CoursesToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">جاري تحميل الكورسات...</div>}>
                <CoursesTable />
            </Suspense>
        </div>
    )
}
