import AdminJourneyClientView from "@/components/dashboard/journey/AdminJourneyClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/journey",
        title: {
            ar: "إدارة رحلتنا وقصة النجاح",
            en: "Manage Journey",
        },
        noIndex: true,
    });
}

export default function AdminJourneyPage() {
    return <AdminJourneyClientView />;
}
