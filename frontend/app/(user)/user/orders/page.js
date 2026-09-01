import MyOrdersClientView from "@/components/user/dashboard/orders/MyOrdersClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/orders",
        title: {
            ar: "طلباتي",
            en: "My Orders",
        },
        description: {
            ar: "استعرض جميع طلبات الشراء وحالتها وفواتيرها في أكاديمية قلم.",
            en: "View your purchase orders, payment statuses, and receipts on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function MyOrdersPage() {
    return <MyOrdersClientView />;
}