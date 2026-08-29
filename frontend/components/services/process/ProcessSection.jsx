"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import ProcessGrid from "./ProcessGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const ProcessSection = () => {
    const { language } = useLanguage();

    return (
        <Section className="pt-[80]">
            <Container>
                <SectionHeader
                    center
                    title={language === "en" ? "Our Working Process" : "مراحل العمل"}
                />

                <div className="mt-8">
                    <ProcessGrid />
                </div>
            </Container>
        </Section>
    );
};

export default ProcessSection;