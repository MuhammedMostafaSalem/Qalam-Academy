"use client";

import { useEffect, useState } from "react";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

const HeroContent = () => {
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("home");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch home hero", err);
            }
        };
        fetchHero();
    }, []);

    const title = hero?.title?.ar || hero?.title?.en || hero?.title;
    const description = hero?.description?.ar || hero?.description?.en || hero?.description;

    return (
        <div className="flex flex-col justify-center">
            {/* Heading */}
            <h1
                {...heroAnimation.title}
                className="mt-6 max-w-2xl text-4xl md:text-5xl lg:text-[60px] text-white leading-tight font-bold"
            >
                {title ? (
                    <span>{title}</span>
                ) : (
                    <>
                        <span className="block text-4xl md:text-5xl lg:text-[60px] text-white">
                            نحو مستقبل رقمي
                        </span>

                        <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                            <span className="text-white">نصنع </span>
                            <span className="bg-gradient-to-r from-[#3ABEFF] via-[#4F8BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                                الحلول البرمجية
                            </span>
                        </span>
                    </>
                )}
            </h1>

            {/* Description */}
            <p
                {...heroAnimation.description}
                className="
                    mt-6
                    max-w-xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {description || "نحن شركة برمجيات متكاملة. تساعد الشركات والأفراد على تحويل أفكارهم إلى منتجات رقمية مبتكرة وفعالة"}
            </p>

            <div {...heroAnimation.buttons}>
                <HeroButtons />
            </div>

            <div {...heroAnimation.buttons}>
                <HeroStats />
            </div>
        </div>
    );
};

export default HeroContent;