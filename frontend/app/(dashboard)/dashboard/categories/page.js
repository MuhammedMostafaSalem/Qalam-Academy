import CategoryLayout from "@/components/layout/dashboard/CategoryLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/categories",
        title: {
            ar: "إدارة التصنيفات",
            en: "Manage Categories",
        },
        noIndex: true,
    });
}

export default function AdminCategories() {
    return (
        <CategoryLayout />
    )
}