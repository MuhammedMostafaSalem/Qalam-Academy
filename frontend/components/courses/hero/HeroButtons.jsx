"use client";

import Button from "@/components/ui/Button";
import { HiArrowLeft, HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroButtons = () => {
    const router = useRouter();
    const { language, isRtl } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
            "
        >
            <Button
                {...heroAnimation.buttons}
                onClick={() => router.push("/courses")}
                className="
                    gradient-button
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-w-[220px]
                "
            >
                {isRtl ? <HiArrowLeft size={20} /> : <HiArrowRight size={20} />}
                <span>{isEn ? "Explore Courses" : "استكشف الكورسات"}</span>
            </Button>

            <Button
                {...heroAnimation.buttons}
                variant="outline"
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-w-[220px]
                "
            >
                <HiOutlinePlay size={20} />
                <span>{isEn ? "How Courses Work?" : "كيف تعمل الكورسات؟"}</span>
            </Button>
        </div>
    );
};

export default HeroButtons;