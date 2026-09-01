import UserDashboardClientView from "@/components/user/dashboard/home/UserDashboardClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user",
        title: {
            ar: "لوحة تحكم الطالب",
            en: "Student Dashboard",
        },
        description: {
            ar: "متابعة الكورسات المشتركة والتقدم الدراسي والشهادات في أكاديمية قلم.",
            en: "Track your enrolled courses, learning progress, and certificates on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function UserDashboardPage() {
    return <UserDashboardClientView />;
}
