"use client";

import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import Container from "@/components/ui/Container"
import ServicesIllustration from "./ServicesIllustration"
import ServicesGrid from "@/components/services/ServicesGrid"
import { useLanguage } from "@/providers/LanguageProvider"

const Services = () => {
    const { language } = useLanguage();
    const copy = language === "en"
        ? {
            badge: "Our Services",
            title: <>End-to-end software solutions<br />that move your business forward</>,
            description: "We provide a wide range of technology services designed to help you succeed in a fast-changing digital world.",
        }
        : {
            badge: "خدماتنا",
            title: <>حلول برمجية متكاملة<br />تدفع أعمالك إلى الأمام</>,
            description: "نقدّم مجموعة واسعة من الخدمات التقنية المصممة لمساعدتك على النجاح في عالم رقمي سريع التطور.",
        };

    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    badge={copy.badge}
                    title={copy.title}
                    description={copy.description}
                    center
                    className="mb-16"
                />

                <div className="
                    mt-16
                    grid
                    grid-cols-1
                    lg:grid-cols-12
                    gap-12
                    xl:gap-20
                    items-center
                ">
                    <div className="lg:col-span-5 hidden lg:flex justify-center">
                        <ServicesIllustration />
                    </div>
                    <div className="lg:col-span-7">
                        <ServicesGrid />
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Services
