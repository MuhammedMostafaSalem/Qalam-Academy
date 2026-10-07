"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PageHeader from "@/components/dashboard/PageHeader";
import PageSectionModal from "@/components/ui/modal/pageSection/PageSectionModal";

import { useLanguage } from "@/providers/LanguageProvider";

const PageSectionsHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    return (
        <>
            <PageHeader
                title={
                    isEn
                        ? "Page Sections"
                        : "أقسام الصفحات"
                }
                description={
                    isEn
                        ? "Manage reusable sections and content across platform pages"
                        : "إدارة أقسام ومحتوى الصفحات القابلة لإعادة الاستخدام داخل المنصة"
                }
                button={
                    isEn
                        ? "Add New Section"
                        : "إضافة قسم جديد"
                }
                onButtonClick={() => setIsModalOpen(true)}
            />

            <PageSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode="create"
                section={null}
                onSuccess={() => {
                    setIsModalOpen(false);

                    if (typeof window !== "undefined") {
                        window.dispatchEvent(
                            new Event("page-section-updated")
                        );
                    }

                    router.refresh();
                }}
            />
        </>
    );
};

export default PageSectionsHeader;