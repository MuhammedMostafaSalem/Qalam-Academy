"use client"

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/courses/CourseCard";
import { getCoursesAction } from "@/actions/courseActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RelatedCourses = ({ excludeSlug }) => {
    const router = useRouter();
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
    }, [excludeSlug]);

    if (relatedCourses.length === 0) return null;

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
                            كورسات قد تعجبك
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                leading-8
                                text-text-secondary
                            "
                        >
                            استكشف المزيد من الكورسات المصممة لمساعدتك
                            على تطوير مهاراتك البرمجية وبناء مشاريع
                            احترافية.
                        </p>
                    </div>

                    <Button
                        onClick={() => router.push("/courses")}
                        className="gradient-button"
                    >
                        عرض جميع الكورسات
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
                                image: course.thumbnail,
                                title: course.title?.ar || course.title,
                                slug: course.slug,
                                duration: course.duration || "—",
                                lessons: course.lessonsCount || 0,
                                price: course.discountPrice || course.price || 0,
                                originalPrice: course.discountPrice ? course.price : null,
                                badge: course.discountPrice ? "خصم" : null,
                                instructor: course.instructor
                                    ? `${course.instructor.firstName} ${course.instructor.lastName}`
                                    : "—",
                                rating: course.averageRating || 0,
                                reviewsCount: course.reviewsCount || 0,
                            }}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default RelatedCourses;