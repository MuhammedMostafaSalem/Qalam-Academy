"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddProductModal from "@/components/ui/modal/product/AddProductModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const ProductsHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Products" : "المنتجات"}
                description={isEn ? "Manage all digital products" : "ادارة جميع المنتجات"}
                button={isEn ? "Add New Product" : "اضافة منتج جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("product-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default ProductsHeader;
