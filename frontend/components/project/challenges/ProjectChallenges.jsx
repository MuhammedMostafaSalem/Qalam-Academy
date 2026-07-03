import Section from "@/components/sections/Section"
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"
import Container from "@/components/ui/Container"
import { gridAnimation } from "@/lib/animation/gridAnimation";

const challenges = [
    {
        title: "التحدي",
        description:
            "إدارة عدد كبير من المستخدمين مع الحفاظ على سرعة الأداء.",
    },
    {
        title: "الحل",
        description:
            "استخدام بنية Backend قابلة للتوسع مع تحسين قواعد البيانات والـ Caching.",
    },
    {
        title: "النتيجة",
        description:
            "تحسن الأداء بشكل ملحوظ مع تقليل زمن الاستجابة وزيادة استقرار النظام.",
    },
];

const ProjectChallenges = () => {
    return (
        <Section>
            <Container>
                <div className="mb-12 flex flex-col items-center gap-3">
                    <SectionTitle>
                        التحديات والحلول
                    </SectionTitle>

                    <SectionDescription>
                        كيف تعاملنا مع التحديات أثناء تنفيذ المشروع.
                    </SectionDescription>
                </div>

                <div
                    className="
                        mx-auto
                        max-w-4xl
                        space-y-8
                    "
                >
                    {challenges.map((item, index) => (
                        <div
                            key={index}
                            {...gridAnimation(index)}
                            className="
                                relative
                                rounded-3xl
                                border
                                border-border
                                bg-card
                                p-8
                                hover-lift
                            "
                        >
                            <div
                                className="
                                    absolute
                                    -right-5
                                    top-8
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-primary
                                    font-bold
                                    text-white
                                "
                            >
                                {index + 1}
                            </div>

                            <h3 className="text-2xl font-bold">
                                {item.title}
                            </h3>

                            <p className="mt-5 leading-8 text-text-secondary">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProjectChallenges;