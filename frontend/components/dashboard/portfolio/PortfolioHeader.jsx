"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddPortfolioModal from "@/components/ui/modal/portfolio/AddPortfolioModal";
import { useRouter } from "next/navigation";

const PortfolioHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="المشاريع (Portfolio)"
                description="ادارة وعرض جميع مشاريع المعرض"
                button="اضافة مشروع جديد"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddPortfolioModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new project
                }}
            />
        </>
    );
};

export default PortfolioHeader;
