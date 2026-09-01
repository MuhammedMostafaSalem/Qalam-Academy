import AdminProductsClientView from "@/components/dashboard/products/AdminProductsClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/products",
        title: {
            ar: "إدارة المنتجات الرقمية",
            en: "Manage Products",
        },
        noIndex: true,
    });
}

export default function AdminProducts() {
    return <AdminProductsClientView />;
}
