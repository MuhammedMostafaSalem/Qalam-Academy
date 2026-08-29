"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import Button from "@/components/ui/Button";
import StatsGrid from "./StatsGrid";
import { useRouter } from "next/navigation";
import { ctaAnimation } from "@/lib/animation/ctaAnimation";
import { getChooseUsAction } from "@/actions/chooseActions";

import { useLanguage } from "@/providers/LanguageProvider";

const WhyChooseContent = () => {
    const router = useRouter();
    const { language, localize } = useLanguage();
    const [chooseData, setChooseData] = useState(null);

    useEffect(() => {
        const fetchChooseData = async () => {
            try {
                const res = await getChooseUsAction();
                if (res.success && res.data) {
                    setChooseData(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch choose us data", err);
            }
        };
        fetchChooseData();
    }, [language]);

    const defaultTitle = language === "en" ? "Your Technical Partner for a Better Future" : "شريكك التقني لبناء مستقبل أفضل";
    const defaultSubtitle = language === "en" ? "Why Choose Us" : "لماذا تختارنا";
    const defaultDesc = language === "en"
        ? "We combine technical expertise and deep understanding of our clients' needs to provide innovative solutions that add real value to business growth."
        : "نجمع بين الخبرة التقنية والفهم العميق لاحتياجات عملائنا لنقدم حلولًا مبتكرة ذات قيمة حقيقية تساعد في نمو أعمالهم وتفوقهم على المنافسين.";

    const title = localize(chooseData?.title, defaultTitle);
    const subtitle = localize(chooseData?.subtitle, defaultSubtitle);
    const description = localize(chooseData?.description, defaultDesc);
    const contactUsText = language === "en" ? "Contact Us" : "تواصل معنا";

    return (
        <div className="flex flex-col items-start gap-3">
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <h2
                className="
                    text-[32px]
                    md:text-[40px]
                    leading-[1.4]
                    text-text-primary
                "
            >
                {title}
            </h2>

            <p
                className="
                    text-md
                    leading-8
                    text-text-secondary
                "
            >
                {description}
            </p>

            <StatsGrid />

            <Button
                {...ctaAnimation.buttons}
                onClick={() => router.push("/contact")}
                size="lg"
                className="gradient-button"
            >
                {contactUsText}
            </Button>
        </div>
    );
};

export default WhyChooseContent;