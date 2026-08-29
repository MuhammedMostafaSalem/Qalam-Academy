"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddServiceModal from "@/components/ui/modal/service/AddServiceModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const ServicesHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Services" : "الخدمات"}
                description={isEn ? "Manage all platform services" : "ادارة جميع خدمات المنصة"}
                button={isEn ? "Add New Service" : "اضافة خدمة جديدة"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddServiceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("service-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default ServicesHeader;
