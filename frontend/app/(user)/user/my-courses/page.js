"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import CoursesToolbar from "@/components/user/dashboard/courses/CoursesToolbar";
import MyCoursesGrid from "@/components/user/dashboard/courses/MyCoursesGrid";
import { useLanguage } from "@/providers/LanguageProvider";

export default function MyCoursesPage() {
    const { language } = useLanguage();
    const isEn = language === "en";

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
                title={isEn ? "My Courses" : "كورساتي"}
                description={isEn ? "All courses you are enrolled in with real-time progress tracking" : "جميع الكورسات التي اشتركت بها وتستطيع متابعة تقدمك فيها"}
            />

            <CoursesToolbar />

            <MyCoursesGrid />
        </div>
    );
}