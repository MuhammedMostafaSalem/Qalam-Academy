"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import Button from "@/components/ui/Button";
import StatsGrid from "./StatsGrid";
import { useRouter } from "next/navigation";
import { ctaAnimation } from "@/lib/animation/ctaAnimation";
import { getChooseUsAction } from "@/actions/chooseActions";

const WhyChooseContent = () => {
    const router = useRouter();
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
    }, []);

    const title = chooseData?.title?.ar || chooseData?.title?.en || chooseData?.title || "شريكك التقني لبناء مستقبل أفضل";
    const subtitle = chooseData?.subtitle?.ar || chooseData?.subtitle?.en || chooseData?.subtitle || "لماذا تختارنا";
    const description = chooseData?.description?.ar || chooseData?.description?.en || chooseData?.description || "نجمع بين الخبرة التقنية والفهم العميق لاحتياجات عملائنا لنقدم حلولًا مبتكرة ذات قيمة حقيقية تساعد في نمو أعمالهم وتفوقهم على المنافسين.";

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
                تواصل معنا
            </Button>
        </div>
    );
};

export default WhyChooseContent;