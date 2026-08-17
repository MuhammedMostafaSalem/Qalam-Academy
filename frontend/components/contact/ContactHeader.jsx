"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

const ContactHeader = () => {
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

    const title = hero?.title?.ar || hero?.title?.en || hero?.title || "يسعدنا التواصل معك";
    const subtitle = hero?.subtitle?.ar || hero?.subtitle?.en || hero?.subtitle || "تواصل معنا";
    const description = hero?.description?.ar || hero?.description?.en || hero?.description || "سواء كنت ترغب في بدء مشروع جديد، أو لديك استفسار حول خدماتنا، أو تحتاج إلى استشارة تقنية، فإن فريق قلم أكاديمي جاهز للإجابة على جميع أسئلتك ومساعدتك في الوصول إلى أفضل الحلول الرقمية.";

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