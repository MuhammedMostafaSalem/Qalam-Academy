import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CurriculumAccordion from "./CurriculumAccordion";

const CourseCurriculum = ({ course }) => {
    const lessonsCount = course?.lessonsCount || 0;
    const duration = course?.duration || "—";

    return (
        <Section>
            <Container>
                <div className="mb-10">
                    <h2 className="text-3xl font-bold">
                        محتوى الكورس
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-2xl
                            text-text-secondary
                            leading-8
                        "
                    >
                        يتكون هذا الكورس من {lessonsCount} درس بمدة {duration}، يغطي جميع
                        المفاهيم الأساسية والمتقدمة، مع تطبيقات عملية ومشاريع
                        حقيقية تساعدك على اكتساب الخبرة.
                    </p>
                </div>

                <CurriculumAccordion course={course} />
            </Container>
        </Section>
    );
};

export default CourseCurriculum;