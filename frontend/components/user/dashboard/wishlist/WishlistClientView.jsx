"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import WishlistGrid from "@/components/user/dashboard/wishlist/WishlistGrid";
import { useLanguage } from "@/providers/LanguageProvider";

export default function WishlistClientView() {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title={isEn ? "Wishlist" : "المفضلة"}
                description={isEn ? "Courses and items you saved to review or purchase later" : "الكورسات التي حفظتها للعودة إليها لاحقاً"}
            />

            <WishlistGrid />
        </div>
    );
}
