"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const CTAButtons = () => {
    const router = useRouter();
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
                onClick={() => router.push("/contact")}
                className="gradient-button"
            >
                {isEn ? "Start Your Project" : "ابدأ مشروعك"}
            </Button>

            <Button
                onClick={() => router.push("/services")}
                variant="ghost"
            >
                {isEn ? "Explore Services" : "استكشف خدماتنا"}
            </Button>
        </div>
    );
};

export default CTAButtons;