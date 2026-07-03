import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CurriculumAccordion from "./CurriculumAccordion";

const CourseCurriculum = () => {
    return (
        <Section className="mt-24">
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
                        يتكون هذا الكورس من عدة وحدات تعليمية تغطي جميع
                        المفاهيم الأساسية والمتقدمة، مع تطبيقات عملية ومشاريع
                        حقيقية تساعدك على اكتساب الخبرة.
                    </p>
                </div>

                <CurriculumAccordion />
            </Container>
        </Section>
    );
};

export default CourseCurriculum;