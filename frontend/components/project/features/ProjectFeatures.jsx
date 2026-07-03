import Section from "@/components/sections/Section";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Container from "@/components/ui/Container";
import { features } from "./features";
import FeatureCard from "./FeatureCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";

const ProjectFeatures = () => {
    return (
        <Section>
            <Container>
                <div className="flex flex-col justify-center items-center gap-3 mb-12">
                    <SectionTitle>
                        أبرز مميزات المشروع
                    </SectionTitle>

                    <SectionDescription>
                        مجموعة من الخصائص التي ساهمت في نجاح المشروع.
                    </SectionDescription>
                </div>

                <div
                    className="
                        grid
                        gap-8
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            {...cardAnimation(index)}
                        >
                        <FeatureCard
                            {...feature}
                        />
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProjectFeatures;