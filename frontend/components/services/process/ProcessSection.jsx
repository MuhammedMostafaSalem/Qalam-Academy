"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import ProcessGrid from "./ProcessGrid";
import { useLanguage } from "@/providers/LanguageProvider";
import usePageSection from "@/hooks/pageSections/usePageSection";

const ProcessSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("services", "process");

    return (
        <Section className="pt-[80]">
            <Container>
                <SectionHeader
                    center
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                        : language === "en" ? "Our Working Process" : "مراحل العمل"
                    }
                />

                <div className="mt-8">
                    <ProcessGrid items={pageSection} />
                </div>
            </Container>
        </Section>
    );
};

export default ProcessSection;