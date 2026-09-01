import DownloadsClientView from "@/components/user/dashboard/downloads/DownloadsClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/downloads",
        title: {
            ar: "تنزيلاتي والمرفقات",
            en: "My Downloads",
        },
        description: {
            ar: "تحميل الملفات والمرفقات والمصادر الخاصة بالدورات المشترك بها في أكاديمية قلم.",
            en: "Download learning attachments, source files, and course materials on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function DownloadsPage() {
    return <DownloadsClientView />;
}