"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Button from "@/components/ui/Button";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

import { useLanguage } from "@/providers/LanguageProvider";

const AboutHeroContent = () => {
    const router = useRouter();
    const { language, localize } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("about");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch about hero", err);
            }
        };
        fetchHero();
    }, []);

    const title = localize(hero?.title);
    const subtitle = localize(hero?.subtitle, language === "en" ? "About Us" : "من نحن");
    const description = localize(hero?.description);

    const defaultTitlePart1 = language === "en" ? "Transforming Ideas Into" : "نحوّل الأفكار إلى";
    const defaultTitlePart2 = language === "en" ? "Integrated Software Solutions" : "حلول برمجية متكاملة";
    const defaultDescription = language === "en"
        ? "Qalam Academy specializes in innovative digital solutions that help companies and learners grow and thrive in a rapidly changing world."
        : "قلم أكاديمي هي شركة متخصصة في تقديم حلول رقمية مبتكرة تساعد الشركات والأفراد على النمو والتطور في عالم يتغير بسرعة";

    return (
        <div
            className="
                mx-auto
                max-w-xl
                flex
                flex-col
                items-center
                gap-7
                text-center
                lg:mx-0
            "
        >
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <SectionTitle
                center
                className="
                    flex
                    flex-col
                    gap-2
                    lg:items-start
                "
            >
                <div className="text-3xl leading-[1.2] md:text-[40px]">
                    {title ? (
                        <div>{title}</div>
                    ) : (
                        <>
                            <div>{defaultTitlePart1}</div>
                            <div className="gradient-text">
                                {defaultTitlePart2}
                            </div>
                        </>
                    )}
                </div>
            </SectionTitle>

            <SectionDescription className="max-w-lg">
                {description || defaultDescription}
            </SectionDescription>

            <div
                {...heroAnimation.buttons}
                className="
                    flex
                    w-full
                    flex-col
                    items-center
                    gap-4
                "
            >
                <Button
                    className="
                        gradient-button
                        flex
                        w-full
                        max-w-[280px]
                        items-center
                        justify-center
                        gap-2
                    "
                    onClick={() => router.push("/contact")}
                >
                    <HiArrowRight className="h-5 w-5" />
                    <span>{language === "en" ? "Learn more about our journey" : "اعرف المزيد عن رحلتنا"}</span>
                </Button>

                <Button
                    variant={null}
                    size="lg"
                    className="flex items-center gap-2 text-text-secondary"
                >
                    <HiOutlinePlay
                        size={18}
                        className="glass border-text-secondary rounded-full w-[30px] p-[5px]"
                    />

                    <span>{language === "en" ? "Watch intro video" : "شاهد فيديو تعريفي"}</span>
                </Button>
            </div>
        </div>
    );
};

export default AboutHeroContent;