import MyCoursesClientView from "@/components/user/dashboard/courses/MyCoursesClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/my-courses",
        title: {
            ar: "دوراتي التعليمية",
            en: "My Courses",
        },
        description: {
            ar: "استعرض وتابع تقدمك في جميع الكورسات التي اشتركت بها في أكاديمية قلم.",
            en: "View and track progress across all your enrolled courses on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function MyCoursesPage() {
    return <MyCoursesClientView />;
}