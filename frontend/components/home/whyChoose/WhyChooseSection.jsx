"use client";

import Section from '@/components/sections/Section'
import SectionHeader from '@/components/sections/SectionHeader'
import Container from '@/components/ui/Container'
import FeaturesGrid from './FeaturesGrid'
import { useLanguage } from '@/providers/LanguageProvider'
import usePageSection from "@/hooks/pageSections/usePageSection";

const WhyChooseSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("home", "whychooseus");

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                            : language === "en" ? "Why Choose Us?" : "لماذا تختارنا؟"
                    }
                />

                <div className="mt-14">
                    <FeaturesGrid items={pageSection} />
                </div>
            </Container>
        </Section>
    );
};

export default WhyChooseSection;