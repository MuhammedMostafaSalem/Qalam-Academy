"use client";

import Section from "@/components/sections/Section"
import SectionDescription from "@/components/sections/SectionDescription";
import SectionTitle from "@/components/sections/SectionTitle";
import { useLanguage } from "@/providers/LanguageProvider";

const ProjectContent = ({ project }) => {
    const { language, localize } = useLanguage();
    const description = localize(project?.description);

    return (
        <div className="space-y-16">
            <Section>
                <SectionTitle>
                    {language === "en" ? "About the project" : "نبذة عن المشروع"}
                </SectionTitle>

                <SectionDescription>
                    {description}
                </SectionDescription>
            </Section>
        </div>
    );
};

export default ProjectContent;
