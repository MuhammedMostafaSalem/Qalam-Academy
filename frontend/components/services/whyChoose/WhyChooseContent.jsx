"use client"

import SectionBadge from "@/components/sections/SectionBadge"
import Button from "@/components/ui/Button"
import StatsGrid from "./StatsGrid";
import { useRouter } from "next/navigation";

const WhyChooseContent = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-start gap-3">
            <SectionBadge>
                لماذا تختارنا
            </SectionBadge>

            <h2
                className="
                    text-[40px]
                    leading-[1.5]
                    text-text-primary
                "
            >
                شريكك التقني لبناء مستقبل أفضل
            </h2>

            <p
                className="
                    text-md
                    leading-8
                    text-text-secondary
                "
            >
                نجمع بين الخبرة التقنية والفهم العميق لاحتياجات
                عملائنا لنقدم حلولًا مبتكرة ذات قيمة حقيقية تساعد
                في نمو أعمالهم وتفوقهم على المنافسين.
            </p>

            <StatsGrid />

            <Button
                onClick={() => router.push("/contact")}
                size="lg"
                className="gradient-button"
            >
                تواصل معنا
            </Button>
        </div>
    )
}

export default WhyChooseContent