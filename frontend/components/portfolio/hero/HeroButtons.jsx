"use client";

import Button from "@/components/ui/Button";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroButtons = ({ primaryText, primaryLink, secondaryText, secondaryLink }) => {
    const router = useRouter();
    const { language, isRtl } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                mt-10
                flex
                flex-wrap
                justify-center
                gap-5
            "
        >
            <Button
                onClick={() => router.push(primaryLink || "/contact")}
                className="gradient-button flex gap-2 items-center"
            >
                <span>{primaryText || (isEn ? "Start Your Project" : "ابدأ مشروعك")}</span>
                {isRtl ? <HiArrowLeft size={20} /> : <HiArrowRight size={20} />}
            </Button>

            <Button
                onClick={() => router.push(secondaryLink || "/services")}
                variant="ghost"
            >
                {secondaryText || (isEn ? "Our Services" : "خدماتنا")}
            </Button>
        </div>
    );
};

export default HeroButtons;
