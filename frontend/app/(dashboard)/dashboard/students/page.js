import AdminStudentsClientView from "@/components/dashboard/students/AdminStudentsClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/students",
        title: {
            ar: "إدارة الطلاب المسجلين",
            en: "Manage Students",
        },
        noIndex: true,
    });
}

export default function AdminStudentsPage() {
    return <AdminStudentsClientView />;
}
