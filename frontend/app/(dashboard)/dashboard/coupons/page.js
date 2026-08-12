import { Suspense } from "react";
import CouponsTable from "@/components/dashboard/coupons/CouponsTable";
import CouponsToolbar from "@/components/dashboard/coupons/CouponsToolbar";
import CouponsHeader from "@/components/dashboard/coupons/CouponsHeader";

export default function AdminCoupons () {
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
            <CouponsHeader />
            <Suspense fallback={<div className="mt-[20px] text-center">جاري تحميل شريط الأدوات...</div>}>
                <CouponsToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">جاري تحميل الكوبونات...</div>}>
                <CouponsTable />
            </Suspense>
        </div>
    )
}