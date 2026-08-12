import { Suspense } from "react";
import ProductsHeader from "@/components/dashboard/products/ProductsHeader";
import ProductsTable from "@/components/dashboard/products/ProductsTable";
import ProductsToolbar from "@/components/dashboard/products/ProductsToolbar";

export default function AdminProducts () {
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <ProductsHeader />
            <Suspense fallback={<div className="mt-[20px] text-center">جاري تحميل شريط الأدوات...</div>}>
                <ProductsToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">جاري تحميل المنتجات...</div>}>
                <ProductsTable />
            </Suspense>
        </div>
    )
}