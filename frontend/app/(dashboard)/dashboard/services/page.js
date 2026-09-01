import { Suspense } from "react";
import ServicesHeader from "@/components/dashboard/services/ServicesHeader";
import ServicesTable from "@/components/dashboard/services/ServicesTable";
import ServicesToolbar from "@/components/dashboard/services/ServicesToolbar";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/services",
        title: {
            ar: "إدارة الخدمات",
            en: "Manage Services",
        },
        noIndex: true,
    });
}

export default function AdminServices() {
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
            <ServicesHeader />
            <Suspense fallback={<div className="mt-[20px] text-center">جاري تحميل شريط الأدوات...</div>}>
                <ServicesToolbar />
            </Suspense>
            <Suspense fallback={<div className="mt-[20px] text-center py-10">جاري تحميل الخدمات...</div>}>
                <ServicesTable />
            </Suspense>
        </div>
    )
}