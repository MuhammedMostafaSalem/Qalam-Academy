"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddPartnerModal from "@/components/ui/modal/partner/AddPartnerModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const PartnersHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Partners" : "الشركاء"}
                description={isEn ? "Manage and view all platform partners" : "ادارة وعرض جميع شركاء المنصة"}
                button={isEn ? "Add New Partner" : "اضافة شريك جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddPartnerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("partner-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default PartnersHeader;
