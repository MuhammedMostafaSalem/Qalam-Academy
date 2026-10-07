"use client";

import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import TestimonialsSlider from "@/components/slider/TestimonialsSlider"
import Container from "@/components/ui/Container"
import { useLanguage } from "@/providers/LanguageProvider"
import usePageSection from "@/hooks/pageSections/usePageSection";

const TestimonialsSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("home", "customers_experiences");

    return (
        <Section className="pt-[80px]">

            <Container>

                <SectionHeader
                    badge={
                        pageSection?.isActive === true ?
                            pageSection.content.badge
                        : language === "en" ? "Client Stories" : "تجارب عملائنا"
                    }
                    title={
                        pageSection?.isActive === true ?
                            pageSection.content.title
                        : language === "en" ? "What our clients say about us" : "ماذا يقول عملاؤنا عنا؟"
                    }
                    center
                    className="mb-16"
                />

                <TestimonialsSlider />

            </Container>

        </Section>
    )
}

export default TestimonialsSection
