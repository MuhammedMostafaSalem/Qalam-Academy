"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroButtons = () => {
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
                onClick={() => router.push("/contact")}
                className="gradient-button flex gap-2 items-center"
            >
                <span>{isEn ? "Start Your Project" : "ابدأ مشروعك"}</span>
                {isRtl ? <HiArrowLeft size={20} /> : <HiArrowRight size={20} />}
            </Button>

            <Button
                onClick={() => router.push("/services")}
                variant="ghost"
            >
                {isEn ? "Our Services" : "خدماتنا"}
            </Button>
        </div>
    );
};

export default HeroButtons;