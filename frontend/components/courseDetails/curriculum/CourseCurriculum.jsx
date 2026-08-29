"use client";

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CurriculumAccordion from "./CurriculumAccordion";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseCurriculum = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const lessonsCount = course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length ?? 0;
    const duration = course?.duration
        ? (typeof course.duration === "number" ? `${course.duration} ${isEn ? "mins" : "دقيقة"}` : course.duration)
        : "—";

    return (
        <Section>
            <Container>
                <div className="mb-10">
                    <h2 className="text-3xl font-bold">
                        {isEn ? "Course Curriculum" : "محتوى الكورس"}
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-2xl
                            text-text-secondary
                            leading-8
                        "
                    >
                        {isEn
                            ? `This course consists of ${lessonsCount} lessons with a total duration of ${duration}, covering all fundamental and advanced concepts through practical projects.`
                            : `يتكون هذا الكورس من ${lessonsCount} درس بمدة ${duration}، يغطي جميع المفاهيم الأساسية والمتقدمة، مع تطبيقات عملية ومشاريع حقيقية تساعدك على اكتساب الخبرة.`}
                    </p>
                </div>

                <CurriculumAccordion course={course} />
            </Container>
        </Section>
    );
};

export default CourseCurriculum;