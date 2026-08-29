"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

import { useLanguage } from "@/providers/LanguageProvider";

const ContactHeader = () => {
    const { language, localize } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("contact");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch contact hero", err);
            }
        };
        fetchHero();
    }, []);

    const defaultTitle = language === "en" ? "We'd Love to Hear From You" : "يسعدنا التواصل معك";
    const defaultSubtitle = language === "en" ? "Contact Us" : "تواصل معنا";
    const defaultDesc = language === "en"
        ? "Whether you're starting a new project, asking about courses, or needing technical consultation, our team is here to help."
        : "سواء كنت ترغب في بدء مشروع جديد، أو لديك استفسار حول خدماتنا، أو تحتاج إلى استشارة تقنية، فإن فريق قلم أكاديمي جاهز للإجابة على جميع أسئلتك ومساعدتك في الوصول إلى أفضل الحلول الرقمية.";

    const title = localize(hero?.title, defaultTitle);
    const subtitle = localize(hero?.subtitle, defaultSubtitle);
    const description = localize(hero?.description, defaultDesc);

    return (
        <header
            className="
                mx-auto
                max-w-4xl
                text-center
            "
        >
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <h1
                {...heroAnimation.title}
                className="
                    mt-6
                    text-4xl
                    font-extrabold
                    leading-tight
                    text-text-primary
                    md:text-5xl
                    lg:text-6xl
                "
            >
                {title}
            </h1>

            <p
                {...heroAnimation.description}
                className="
                    mx-auto
                    mt-6
                    max-w-3xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {description}
            </p>
        </header>
    );
};

export default ContactHeader;