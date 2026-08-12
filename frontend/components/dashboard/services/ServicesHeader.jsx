"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddServiceModal from "@/components/ui/modal/service/AddServiceModal";
import { useRouter } from "next/navigation";

const ServicesHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="الخدمات"
                description="ادارة جميع خدمات المنصة"
                button="اضافة خدمة جديدة"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddServiceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new service
                }}
            />
        </>
    );
};

export default ServicesHeader;
