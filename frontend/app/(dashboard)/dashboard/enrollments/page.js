import AdminEnrollmentsClientView from "@/components/dashboard/enrollments/AdminEnrollmentsClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/enrollments",
        title: {
            ar: "إدارة الاشتراكات والتسجيلات",
            en: "Manage Enrollments",
        },
        noIndex: true,
    });
}

export default function AdminEnrollmentsPage() {
    return <AdminEnrollmentsClientView />;
}
