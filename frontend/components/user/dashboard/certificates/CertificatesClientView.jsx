"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import CertificatesGrid from "@/components/user/dashboard/certificates/CertificatesGrid";
import { useLanguage } from "@/providers/LanguageProvider";

export default function CertificatesClientView() {
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
                title={isEn ? "Certificates" : "الشهادات"}
                description={isEn ? "All official certificates earned upon completing platform courses" : "جميع الشهادات التي حصلت عليها بعد إكمال الكورسات"}
            />

            <CertificatesGrid />
        </div>
    );
}
