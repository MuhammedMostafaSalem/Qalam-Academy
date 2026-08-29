"use client"

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/courses/CourseCard";
import { getCoursesAction } from "@/actions/courseActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const RelatedCourses = ({ excludeSlug }) => {
    const router = useRouter();
    const { language } = useLanguage();
    const [relatedCourses, setRelatedCourses] = useState([]);

    useEffect(() => {
        getCoursesAction("isPublished=true&limit=4").then((result) => {
            if (result.success) {
                const filtered = excludeSlug
                    ? result.data.filter(c => c.slug !== excludeSlug).slice(0, 3)
                    : result.data.slice(0, 3);
                setRelatedCourses(filtered);
            }
        });
    }, [excludeSlug, language]);

    if (relatedCourses.length === 0) return null;

    const heading = language === "en" ? "Courses You Might Like" : "كورسات قد تعجبك";
    const subtext = language === "en"
        ? "Explore more courses designed to help you build professional skills and real-world projects."
        : "استكشف المزيد من الكورسات المصممة لمساعدتك على تطوير مهاراتك البرمجية وبناء مشاريع احترافية.";
    const viewAllBtn = language === "en" ? "View All Courses" : "عرض جميع الكورسات";
    const discountBadge = language === "en" ? "Sale" : "خصم";

    return (
        <Section>
            <Container>
                <div
                    className="
                        mb-12
                        flex
                        flex-col
                        gap-6
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >
                    <div>
                        <h2 className="text-3xl font-bold">
                            {heading}
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                leading-8
                                text-text-secondary
                            "
                        >
                            {subtext}
                        </p>
                    </div>

                    <Button
                        onClick={() => router.push("/courses")}
                        className="gradient-button"
                    >
                        {viewAllBtn}
                    </Button>
                </div>

                <div
                    className="
                        grid
                        gap-8
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {relatedCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={{
                                _id: course._id,
                                image: course.thumbnail,
                                title: course.title,
                                description: course.description,
                                slug: course.slug,
                                duration: course.duration || "—",
                                lessons: course.totalLessons || course.lessonsCount || 0,
                                price: course.discountPrice || course.price || 0,
                                originalPrice: course.discountPrice ? course.price : null,
                                badge: course.discountPrice ? discountBadge : null,
                                instructor: course.instructor
                                    ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim()
                                    : "—",
                                rating: course.averageRating || 0,
                                reviewsCount: course.totalReviews || 0,
                            }}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default RelatedCourses;
