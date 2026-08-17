"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import { getHeroByPageAction } from "@/actions/heroActions";

const HeroContent = () => {
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("store");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch store hero", err);
            }
        };
        fetchHero();
    }, []);

    const title = hero?.title?.ar || hero?.title?.en || hero?.title;
    const subtitle = hero?.subtitle?.ar || hero?.subtitle?.en || hero?.subtitle || "المتجر الرقمي";
    const description = hero?.description?.ar || hero?.description?.en || hero?.description || "منتجات وأدوات احترافية تساعدك على بناء وتطوير وتصميم مشاريعك بكفاءة عالية";

    return (
        <div
            className="
                mx-auto
                flex
                max-w-4xl
                flex-col
                items-center
                text-center
                gap-5
            "
        >
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <SectionTitle>
                {title ? (
                    title
                ) : (
                    <>
                        كل ما تحتاجه <span className="gradient-text">لتطوير عملك</span>
                    </>
                )}
            </SectionTitle>

            <SectionDescription>
                {description}
            </SectionDescription>
        </div>
    );
};

export default HeroContent;