"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import OrdersTable from "@/components/user/dashboard/orders/OrdersTable";
import OrdersToolbar from "@/components/user/dashboard/orders/OrdersToolbar";
import { useLanguage } from "@/providers/LanguageProvider";

export default function MyOrdersPage() {
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
                title={isEn ? "My Orders" : "طلباتي"}
                description={isEn ? "All orders you placed on the platform and their current statuses" : "جميع الطلبات التي قمت بها داخل المنصة مع إمكانية متابعة حالتها"}
            />

            <OrdersToolbar />

            <OrdersTable />
        </div>
    );
}