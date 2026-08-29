"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddCouponModal from "@/components/ui/modal/coupon/AddCouponModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const CouponsHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Discount Coupons" : "كوبونات الخصم"}
                description={isEn ? "Manage all platform discount coupons" : "ادارة جميع كوبونات الخصم"}
                button={isEn ? "Add New Coupon" : "اضافة كوبون جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddCouponModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("coupon-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default CouponsHeader;
