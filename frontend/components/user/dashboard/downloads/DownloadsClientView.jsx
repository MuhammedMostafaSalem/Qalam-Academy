"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import DownloadsTable from "@/components/user/dashboard/downloads/DownloadsTable";
import DownloadsToolbar from "@/components/user/dashboard/downloads/DownloadsToolbar";
import { useLanguage } from "@/providers/LanguageProvider";

export default function DownloadsClientView() {
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
                title={isEn ? "Downloads" : "التنزيلات"}
                description={isEn ? "All downloadable files, attachments, and resources from your courses" : "جميع الملفات التي يمكنك تنزيلها من الكورسات الخاصة بك"}
            />

            <DownloadsToolbar />

            <DownloadsTable />
        </div>
    );
}
