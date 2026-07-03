import Section from "@/components/sections/Section";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Container from "@/components/ui/Container";
import ResultCard from "./ResultCard";

const results = [
    {
        value: "+70%",
        label: "زيادة الإنتاجية",
        description:
            "تحسين سرعة إنجاز المهام وتقليل الوقت المطلوب لإدارة العمليات.",
    },
    {
        value: "99.9%",
        label: "استقرار النظام",
        description:
            "تشغيل مستقر مع أقل معدل أعطال طوال فترة الاستخدام.",
    },
    {
        value: "50K+",
        label: "مستخدم نشط",
        description:
            "المنصة تخدم آلاف المستخدمين يوميًا بكفاءة عالية.",
    },
    {
        value: "95%",
        label: "رضا العملاء",
        description:
            "تقييمات إيجابية من العملاء بعد إطلاق المشروع.",
    },
];

const ProjectResults = () => {
    return (
        <Section className="mt-[80px]">
            <Container>
                <div className="mx-auto mb-12 max-w-3xl flex flex-col gap-3 text-center items-center">
                    <SectionTitle>
                        نتائج المشروع
                    </SectionTitle>

                    <SectionDescription>
                        حقق المشروع نتائج ملموسة ساعدت العميل على
                        تحسين الأداء وزيادة كفاءة العمل.
                    </SectionDescription>
                </div>

                <div
                    className="
                        grid
                        gap-8
                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                >
                    {results.map((item) => (
                        <ResultCard
                            key={item.label}
                            {...item}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProjectResults;