"use client";

import EnrollmentsTable from "@/components/dashboard/enrollments/EnrollmentsTable";
import EnrollmentsToolbar from "@/components/dashboard/enrollments/EnrollmentsToolbar";
import PageHeader from "@/components/dashboard/PageHeader";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminEnrollmentsClientView() {
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
            "
        >
            <PageHeader
                title={isEn ? "Enrollments" : "الاشتراكات"}
                description={isEn ? "Manage and monitor all course enrollments" : "ادارة جميع الاشتراكات"}
            />
            <EnrollmentsToolbar />
            <EnrollmentsTable />
        </div>
    );
}
