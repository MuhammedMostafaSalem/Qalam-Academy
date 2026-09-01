import AdminSettingsClientView from "@/components/dashboard/settings/AdminSettingsClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/settings",
        title: {
            ar: "إعدادات المنصة وSEO",
            en: "Platform & SEO Settings",
        },
        noIndex: true,
    });
}

export default function AdminSettingsPage() {
    return <AdminSettingsClientView />;
}
