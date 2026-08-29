"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddTeamModal from "@/components/ui/modal/team/AddTeamModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const TeamHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Team Members" : "أعضاء الفريق"}
                description={isEn ? "Manage and view all team members" : "ادارة وعرض جميع أعضاء الفريق"}
                button={isEn ? "Add New Member" : "اضافة عضو جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddTeamModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("team-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default TeamHeader;
