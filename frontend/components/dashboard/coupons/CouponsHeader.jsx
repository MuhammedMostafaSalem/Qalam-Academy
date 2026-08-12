"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddCouponModal from "@/components/ui/modal/coupon/AddCouponModal";
import { useRouter } from "next/navigation";

const CouponsHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="كوبونات الخصم"
                description="ادارة جميع كوبونات الخصم"
                button="اضافة كوبون جديدة"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddCouponModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new coupon
                }}
            />
        </>
    );
};

export default CouponsHeader;
