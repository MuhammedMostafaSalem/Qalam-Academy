"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { HiArrowLeft, HiArrowRight, HiOutlineBookOpen } from "react-icons/hi2";
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
                items-center
                justify-center
                gap-4
            "
        >
            <Button
                className="
                    gradient-button
                    flex
                    items-center
                    gap-2
                "
                onClick={() => router.push("/contact")}
            >
                <span>{isEn ? "Start Your Project" : "ابدأ مشروعك معنا"}</span>
                {isRtl ? <HiArrowLeft size={20} /> : <HiArrowRight size={20} />}
            </Button>

            <Button
                variant="ghost"
                className="
                    flex
                    items-center
                    gap-2
                "
                onClick={() =>
                    window.scrollTo({
                        top: 700,
                        behavior: "smooth",
                    })
                }
            >
                <HiOutlineBookOpen size={20} />

                <span>{isEn ? "Browse Articles" : "تصفح المقالات"}</span>
            </Button>
        </div>
    );
};

export default HeroButtons;