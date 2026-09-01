"use client";

import { Suspense } from "react";
import OrdersTable from "@/components/dashboard/orders/OrdersTable";
import OrdersToolbar from "@/components/dashboard/orders/OrdersToolbar";
import PageHeader from "@/components/dashboard/PageHeader";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminOrdersClientView() {
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
            "
        >
            <PageHeader
                title={isEn ? "Orders" : "الطلبات"}
                description={isEn ? "Manage and monitor all platform orders" : "ادارة ومتابعة جميع الطلبات"}
            />
            <Suspense fallback={<div className="mt-[20px] text-center">{isEn ? "Loading toolbar..." : "جاري تحميل شريط الأدوات..."}</div>}>
                <OrdersToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">{isEn ? "Loading orders..." : "جاري تحميل الطلبات..."}</div>}>
                <OrdersTable />
            </Suspense>
        </div>
    );
}
