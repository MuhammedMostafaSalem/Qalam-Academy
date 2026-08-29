"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import ServicesGrid from "./ServicesGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const ServicesSection = () => {
    const { language } = useLanguage();

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={language === "en" ? "Our Main Services" : "خدماتنا الرئيسية"}
                />

                <div className="mt-16">
                    <ServicesGrid />
                </div>
            </Container>
        </Section>
    );
};

export default ServicesSection;