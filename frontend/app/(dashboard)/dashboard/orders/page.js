import { Suspense } from "react";
import OrdersTable from "@/components/dashboard/orders/OrdersTable";
import OrdersToolbar from "@/components/dashboard/orders/OrdersToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminOrders () {
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
                title="الطلبات"
                description="ادارة ومتابعة جميع الطلبات"
            />
            <Suspense fallback={<div className="mt-[20px] text-center">جاري تحميل شريط الأدوات...</div>}>
                <OrdersToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">جاري تحميل الطلبات...</div>}>
                <OrdersTable />
            </Suspense>
        </div>
    )
}