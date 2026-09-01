import AdminDashboardClientView from "@/components/dashboard/home/AdminDashboardClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard",
        title: {
            ar: "لوحة التحكم الرئيسية",
            en: "Admin Dashboard",
        },
        description: {
            ar: "إحصائيات المنصة، الدورات، الطلاب، والإيرادات في أكاديمية قلم.",
            en: "Platform overview, metrics, course analytics, and revenue on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function DashboardPage() {
    return <AdminDashboardClientView />;
}
