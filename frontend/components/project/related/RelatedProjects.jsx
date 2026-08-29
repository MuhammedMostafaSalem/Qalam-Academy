"use client";

import Section from "@/components/sections/Section";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Container from "@/components/ui/Container";
import RelatedProjectsGrid from "./RelatedProjectsGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const RelatedProjects = ({ project }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <Section className="mt-[80px]">
            <Container>
                <div className="mx-auto mb-12 max-w-3xl flex flex-col gap-3 items-center text-center">
                    <SectionTitle>
                        {isEn ? "Similar Projects" : "مشاريع مشابهة"}
                    </SectionTitle>

                    <SectionDescription>
                        {isEn
                            ? "Explore more projects we developed with state-of-the-art technologies and engineering excellence."
                            : "اكتشف المزيد من المشاريع التي قمنا بتنفيذها باستخدام أحدث التقنيات وأفضل الممارسات."}
                    </SectionDescription>
                </div>

                <RelatedProjectsGrid
                    excludeId={project?._id}
                    categoryId={project?.category?._id || project?.category}
                />
            </Container>
        </Section>
    );
};

export default RelatedProjects;
