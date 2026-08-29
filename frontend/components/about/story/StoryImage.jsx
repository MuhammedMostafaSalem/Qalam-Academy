"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import storyImage from "@/public/assets/images/story-image.png";
import { getJourneyAction } from "@/actions/journeyActions";
import { useLanguage } from "@/providers/LanguageProvider";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const StoryImage = () => {
    const { language, localize } = useLanguage();
    const [journey, setJourney] = useState(null);
    const isEnglish = language === "en";

    useEffect(() => {
        getJourneyAction().then((result) => {
            if (result.success) setJourney(result.data);
        });
    }, [language]);

    const rawImage = journey?.image;
    const imageSource = rawImage
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : storyImage;
    const badge = localize(journey?.badge, isEnglish ? "Committed to quality" : "نلتزم بالجودة");
    const badgeDescription = localize(
        journey?.badgeDescription,
        isEnglish ? "In everything we deliver" : "في كل ما نقدمه"
    );

    if (journey?.isActive === false) return null;

    return (
        <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-10 scale-95 rounded-3xl bg-primary/20 blur-3xl" />

            <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <Image
                    src={imageSource}
                    alt={isEnglish ? "Qalam Academy journey" : "رحلة أكاديمية قلم"}
                    width={720}
                    height={620}
                    unoptimized={typeof imageSource === "string"}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>

            <div className="absolute -bottom-8 -left-6 flex items-center gap-4 rounded-2xl border border-border bg-card/90 px-6 py-4 shadow-2xl backdrop-blur-xl rtl:left-auto rtl:-right-6">
                <div>
                    <h4 className="text-lg font-semibold text-text-primary">{badge}</h4>
                    <p className="text-sm text-text-secondary">{badgeDescription}</p>
                </div>
                <HiOutlineShieldCheck size={30} className="text-primary" />
            </div>
        </div>
    );
};

export default StoryImage;
