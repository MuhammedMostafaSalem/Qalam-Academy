"use client";

import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import CoursesSlider from "@/components/slider/CoursesSlider";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/providers/LanguageProvider";

const FeaturedCourses = () => {
    const { language } = useLanguage();
    const copy = language === "en"
        ? {
            badge: "Our Courses",
            title: "Learn from experts and build practical skills",
            description: "Hands-on courses built around real projects to help you enter the job market with confidence.",
            button: "View All Courses",
        }
        : {
            badge: "دوراتنا",
            title: "تعلّم من الخبراء وطوّر مهاراتك",
            description: "دورات عملية قائمة على مشاريع حقيقية تساعدك على دخول سوق العمل بثقة.",
            button: "عرض جميع الدورات",
        };

    return (
        <Section className="pt-[80px]">

            <Container>

                <SectionHeader
                    badge={copy.badge}
                    title={copy.title}
                    description={copy.description}
                    button={copy.button}
                    href="/courses"
                    center
                    className="mb-16"
                />

                <CoursesSlider />

            </Container>

        </Section>
    );
}

export default FeaturedCourses
