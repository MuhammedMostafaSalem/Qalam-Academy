"use client";

import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import PortfolioSlider from "@/components/slider/PortfolioSlider"
import Container from "@/components/ui/Container"
import { useLanguage } from "@/providers/LanguageProvider"
import usePageSection from "@/hooks/pageSections/usePageSection";

const PortfolioSection = () => {
    const { language } = useLanguage();
    const { pageSection, loading, error } = usePageSection("home", "portfolio");
    const copy = language === "en"
        ? {
            badge: "Our Work",
            title: "Projects we’re proud to have built",
            description: "Explore recent projects delivered with modern technologies and a strong focus on quality and user experience",
        }
        : {
            badge: "أعمالنا",
            title: "مشاريع نفخر بإنجازها",
            description: "استعرض مجموعة من أحدث مشاريعنا المنفذة بأحدث التقنيات، مع التركيز على الجودة وتجربة المستخدم",
        };

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    badge={
                        pageSection?.isActive === true
                            ? pageSection.content.badge
                            : copy.badge
                    }
                    title={
                        pageSection?.isActive === true
                            ? pageSection.content.title
                            : copy.title
                    }
                    description={
                        pageSection?.isActive === true
                            ? pageSection.content.description
                            : copy.description
                    }
                    center
                    className="mb-16"
                />
                
                <PortfolioSlider />
            </Container>
        </Section>
    )
}

export default PortfolioSection
