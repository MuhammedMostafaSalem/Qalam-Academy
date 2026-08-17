import CoursesSection from "@/components/courses/coursesSection/CoursesSection";
import CoursesHero from "@/components/courses/hero/CoursesHero";
import { Suspense } from "react";

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