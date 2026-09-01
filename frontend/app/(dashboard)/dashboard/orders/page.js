import AdminOrdersClientView from "@/components/dashboard/orders/AdminOrdersClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/orders",
        title: {
            ar: "إدارة الطلبات والمبيعات",
            en: "Manage Orders",
        },
        noIndex: true,
    });
}

export default function AdminOrders() {
    return <AdminOrdersClientView />;
}
