import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import InstructorInfo from "./InstructorInfo";
import InstructorStats from "./InstructorStats";

const InstructorSection = () => {
    return (
        <Section>
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold">
                        تعرف على المدرب
                    </h2>

                    <p className="mt-3 max-w-2xl text-text-secondary leading-8">
                        تعلم من أحد الخبراء الذين يمتلكون سنوات من الخبرة
                        العملية في تطوير البرمجيات والعمل مع شركات محلية
                        وعالمية.
                    </p>
                </div>

                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-[320px_1fr]
                        items-start
                    "
                >
                    <InstructorInfo />

                    <InstructorStats />
                </div>
            </Container>
        </Section>
    );
};

export default InstructorSection;