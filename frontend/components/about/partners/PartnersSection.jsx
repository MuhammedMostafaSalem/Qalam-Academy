"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import PartnersGrid from "./PartnersGrid";
import { useLanguage } from "@/providers/LanguageProvider";
import usePageSection from "@/hooks/pageSections/usePageSection";

const PartnersSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("about", "partners");

    return (
        <Section className="pt-[80px]">
            <Container className="glass rounded-fullCard py-2">
                <SectionHeader
                    center
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                        : language === "en" ? "Trusted Partners" : "ثقة شركائنا"
                    }
                />

                <PartnersGrid />
            </Container>
        </Section>
    );
};

export default PartnersSection;