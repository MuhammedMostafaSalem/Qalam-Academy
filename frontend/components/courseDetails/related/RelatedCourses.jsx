"use client"

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/constants/courses";
import { useRouter } from "next/navigation";

const RelatedCourses = () => {
    const router = useRouter();
    const relatedCourses = courses.slice(0, 3);

    return (
        <Section className="py-20">
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
                            key={course.id}
                            course={course}
                        />

                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default RelatedCourses;