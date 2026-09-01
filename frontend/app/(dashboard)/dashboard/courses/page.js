import AdminCoursesClientView from "@/components/dashboard/courses/AdminCoursesClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/courses",
        title: {
            ar: "إدارة الكورسات",
            en: "Manage Courses",
        },
        description: {
            ar: "إدارة وإنشاء وتعديل الكورسات والمناهج التعليمية في أكاديمية قلم.",
            en: "Manage, create, and update courses and educational curricula on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function AdminCoursesPage() {
    return <AdminCoursesClientView />;
}
