"use client";

import Section from '@/components/sections/Section'
import SectionHeader from '@/components/sections/SectionHeader'
import Container from '@/components/ui/Container'
import FeaturesGrid from './FeaturesGrid'
import { useLanguage } from '@/providers/LanguageProvider'

const WhyChooseSection = () => {
    const { language } = useLanguage();

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={language === "en" ? "Why Choose Us?" : "لماذا تختارنا؟"}
                />

                <div className="mt-14">
                    <FeaturesGrid />
                </div>
            </Container>
        </Section>
    );
};

export default WhyChooseSection;