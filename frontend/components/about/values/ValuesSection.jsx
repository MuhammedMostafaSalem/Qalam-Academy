"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import ValuesGrid from "./ValuesGrid";
import { useLanguage } from "@/providers/LanguageProvider";
import usePageSection from "@/hooks/pageSections/usePageSection";

const ValuesSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("about", "values");

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                        : language === "en" ? "Our Core Values" : "قيمنا الأساسية"
                    }
                />

                <div className="mt-16">
                    <ValuesGrid items={pageSection} />
                </div>
            </Container>
        </Section>
    );
};

export default ValuesSection;