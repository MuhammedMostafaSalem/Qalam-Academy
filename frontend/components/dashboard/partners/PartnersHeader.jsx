"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddPartnerModal from "@/components/ui/modal/partner/AddPartnerModal";
import { useRouter } from "next/navigation";

const PartnersHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="الشركاء"
                description="ادارة وعرض جميع شركاء المنصة"
                button="اضافة شريك جديد"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddPartnerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new partner
                }}
            />
        </>
    );
};

export default PartnersHeader;
