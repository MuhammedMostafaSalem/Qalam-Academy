"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import ValuesGrid from "./ValuesGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const ValuesSection = () => {
    const { language } = useLanguage();

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title={language === "en" ? "Our Core Values" : "قيمنا الأساسية"}
                />

                <div className="mt-16">
                    <ValuesGrid />
                </div>
            </Container>
        </Section>
    );
};

export default ValuesSection;