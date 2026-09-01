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
import { generateSEOMetadata, generateCourseJsonLd } from "@/utils/seo";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return generateSEOMetadata();

    const result = await getCourseDetailsAction(slug);
    const courseDetails = result?.success ? result.data : null;
    const course = courseDetails?.course || courseDetails;

    if (!course) {
        return generateSEOMetadata({
            title: { ar: "الكورس غير موجود", en: "Course Not Found" },
            noIndex: true,
        });
    }

    const instructorName = typeof course.instructor === "object"
        ? `${course.instructor?.firstName || ""} ${course.instructor?.lastName || ""}`.trim() || course.instructor?.name
        : course.instructor;

    return generateSEOMetadata({
        path: `/courses/${slug}`,
        title: course.title,
        description: course.description,
        image: course.thumbnail,
        type: "article",
        authors: instructorName ? [instructorName] : undefined,
        tags: Array.isArray(course.tags) ? course.tags : undefined,
    });
}

export default async function CourseDetailsPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        notFound();
    }

    // Fetch course details from API
    const result = await getCourseDetailsAction(slug);

    if (!result.success || !result.data) {
        notFound();
    }

    const courseDetails = result.data;
    const course = courseDetails.course || courseDetails;
    const lessons = courseDetails.lessons || course.lessons || [];
    const reviews = courseDetails.reviews || course.reviews || [];

    const fullCourseData = {
        ...course,
        lessons,
        reviews,
        isEnrolled: courseDetails.isEnrolled,
        progress: courseDetails.progress,
    };

    return (
        <>
            <JsonLd data={generateCourseJsonLd(fullCourseData)} />
            <CourseDetailsHero course={fullCourseData} />

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
                            <CourseOverview course={fullCourseData} />
                            <InstructorSection course={fullCourseData} />
                            <ReviewsSection course={fullCourseData} />
                            <RelatedCourses excludeSlug={slug} courseId={fullCourseData._id} categoryId={fullCourseData.category?._id} />
                        </div>

                        <CourseSidebar course={fullCourseData} />
                    </div>
                </Container>
            </Section>
        </>
    );
}