import CertificatesClientView from "@/components/user/dashboard/certificates/CertificatesClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/certificates",
        title: {
            ar: "شهاداتي المعتمدة",
            en: "My Certificates",
        },
        description: {
            ar: "استعراض وتحميل الشهادات المعتمدة التي حصلت عليها بعد إتمام الكورسات في أكاديمية قلم.",
            en: "View and download certificates earned upon completing courses on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function CertificatesPage() {
    return <CertificatesClientView />;
}