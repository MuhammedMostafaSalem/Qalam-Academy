import Section from "@/components/sections/Section"
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"
import Container from "@/components/ui/Container"
import { gridAnimation } from "@/lib/animation/gridAnimation";

const technologies = [
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "JWT",
    "Cloudinary",
    "Docker",
    "GitHub",
];

const ProjectTechStack = () => {
    return (
        <Section className="py-24">
            <Container>
                <div className="mb-12 flex flex-col items-center gap-3">
                    <SectionTitle>
                        التقنيات المستخدمة
                    </SectionTitle>

                    <SectionDescription>
                        اعتمد المشروع على أحدث التقنيات لبناء نظام سريع وقابل للتوسع.
                    </SectionDescription>
                </div>

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                    "
                >
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            {...gridAnimation(index)}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-card
                                px-6
                                py-4
                                text-lg
                                font-semibold
                                hover-lift
                            "
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProjectTechStack;