import AdminMessagesClientView from "@/components/dashboard/messages/AdminMessagesClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/messages",
        title: {
            ar: "الرسائل والتواصل",
            en: "Messages & Inquiries",
        },
        noIndex: true,
    });
}

export default function AdminMessagesPage() {
    return <AdminMessagesClientView />;
}
