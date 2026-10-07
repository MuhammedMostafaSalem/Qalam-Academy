"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import TeamSlider from "@/components/slider/TeamSlider";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/providers/LanguageProvider";
import usePageSection from "@/hooks/pageSections/usePageSection";

const TeamSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("about", "team");

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                        : language === "en" ? "Our Creative Team" : "فريقنا المبدع"
                    }
                />

                <div className="mt-16">
                    <TeamSlider />
                </div>
            </Container>
        </Section>
    );
};

export default TeamSection;