import CourseCurriculum from "@/components/courseDetails/curriculum/CourseCurriculum";
import CourseDetailsHero from "@/components/courseDetails/hero/CourseDetailsHero";
import InstructorSection from "@/components/courseDetails/instructor/InstructorSection";
import CourseOverview from "@/components/courseDetails/overview/CourseOverview";
import RelatedCourses from "@/components/courseDetails/related/RelatedCourses";
import ReviewsSection from "@/components/courseDetails/reviews/ReviewsSection";
import CourseSidebar from "@/components/courseDetails/sidebar/CourseSidebar";
import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import { getCourseDetailsAction } from "@/actions/lessonActions";
import { notFound } from "next/navigation";

export default async function CourseDetailsPage({ params }) {
    const { slug } = params;
    
    // Fetch course details from API
    const result = await getCourseDetailsAction(slug);
    
    if (!result.success || !result.data) {
        notFound();
    }

    const courseData = result.data;

    return (
        <>
            <CourseDetailsHero course={courseData} />

            <Section className="pb-24">
                <Container>
                    <div
                        className="
                            grid
                            gap-12
                            lg:grid-cols-[1fr_360px]
                        "
                    >
                        <div className="space-y-20">
                            <CourseOverview course={courseData} />
                            <CourseCurriculum course={courseData} />
                            <InstructorSection course={courseData} />
                            <ReviewsSection course={courseData} />
                            <RelatedCourses courseId={courseData._id} categoryId={courseData.category?._id} />
                        </div>

                        <CourseSidebar course={courseData} />
                    </div>
                </Container>
            </Section>
        </>
    )
}