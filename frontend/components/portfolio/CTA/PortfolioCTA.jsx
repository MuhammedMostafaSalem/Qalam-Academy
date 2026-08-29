"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/sections/Section";
import CTAButtons from "./CTAButtons";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const PortfolioCTA = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <Section>
            <Container>
                <div
                    className="
                        rounded-[32px]
                        border
                        border-border
                        bg-gradient-to-br
                        from-primary/10
                        via-card
                        to-secondary/10
                        px-8
                        py-20
                        text-center
                    "
                >
                    <h2
                        {...heroAnimation.title}
                        className={`
                            text-4xl
                            font-bold
                            ${animations.transition}
                        `}
                    >
                        {isEn ? "Have a project in mind?" : "هل لديك فكرة مشروع؟"}
                    </h2>

                    <p
                        {...heroAnimation.description}
                        className={`
                            mx-auto
                            mt-6
                            max-w-2xl
                            leading-8
                            text-text-secondary
                            ${animations.transition}
                        `}
                    >
                        {isEn
                            ? "Our engineering team is ready to transform your vision into an impactful, modern digital product using industry-leading technologies."
                            : "فريقنا جاهز لتحويل فكرتك إلى منتج رقمي احترافي باستخدام أحدث التقنيات وأفضل الممارسات."}
                    </p>

                    <CTAButtons />
                </div>
            </Container>
        </Section>
    );
};

export default PortfolioCTA;