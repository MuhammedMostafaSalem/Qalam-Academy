import AdminUsersLayout from "@/components/layout/dashboard/AdminUsersLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/users",
        title: {
            ar: "إدارة المستخدمين والصلاحيات",
            en: "Manage Users & Permissions",
        },
        noIndex: true,
    });
}

export default function AdminUsers () {
    return (
        <AdminUsersLayout />
    )
}