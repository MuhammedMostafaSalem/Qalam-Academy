import CoursesSection from "@/components/courses/coursesSection/CoursesSection";
import CoursesHero from "@/components/courses/hero/CoursesHero";
import { Suspense } from "react";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/courses",
        title: {
            ar: "الكورسات والمسارات التعليمية",
            en: "Courses & Learning Paths",
        },
        description: {
            ar: "استكشف أحدث الدورات التعليمية المتخصصة في البرمجة وتطوير الويب والتصميم مع نخبة من الخبراء.",
            en: "Explore specialized online courses in programming, web development, and design with expert instructors.",
        },
    });
}

export default function Courses() {
    return (
        <>
            <CoursesHero />
            <Suspense fallback={null}>
                <CoursesSection />
            </Suspense>
        </>
    )
}