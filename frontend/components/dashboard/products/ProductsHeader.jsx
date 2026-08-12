"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddProductModal from "@/components/ui/modal/product/AddProductModal";
import { useRouter } from "next/navigation";

const ProductsHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="المنتجات"
                description="ادارة جميع المنتجات"
                button="اضافة منتج جديد"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new product
                }}
            />
        </>
    );
};

export default ProductsHeader;
