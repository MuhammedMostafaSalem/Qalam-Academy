"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddPortfolioModal from "@/components/ui/modal/portfolio/AddPortfolioModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const PortfolioHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Portfolio Projects" : "المشاريع (Portfolio)"}
                description={isEn ? "Manage and view all portfolio projects" : "ادارة وعرض جميع مشاريع المعرض"}
                button={isEn ? "Add New Project" : "اضافة مشروع جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddPortfolioModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("portfolio-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default PortfolioHeader;
