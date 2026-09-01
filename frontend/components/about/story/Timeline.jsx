"use client";

import { useEffect, useState } from "react";
import { getTimelineAction } from "@/actions/timelineActions";
import { useLanguage } from "@/providers/LanguageProvider";

const Timeline = () => {
    const { language, localize } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const res = await getTimelineAction("isActive=true&limit=100");
                if (res.success && Array.isArray(res.data)) {
                    setItems(res.data);
                } else setError(res.message);
            } catch (err) {
                setError(err?.message || "Failed to fetch timeline");
            } finally {
                setLoading(false);
            }
        };
        fetchTimeline();
    }, [language]);

    if (loading) return <div className="py-8 text-center text-text-secondary">{language === "en" ? "Loading timeline..." : "جاري تحميل الخط الزمني..."}</div>;
    if (error) return <div className="py-8 text-center text-error">{error}</div>;
    if (items.length === 0) return null;

    return (
        <div className="relative mx-auto w-full max-w-[300px] md:mx-0 md:w-[240px]">
            {/* Vertical timeline line */}
            <div
                className="
                    absolute
                    right-[7px]
                    top-[10px]
                    bottom-[12px]
                    w-[2px]
                    rounded-full
                    bg-primary
                    shadow-[0_0_14px_rgba(122,92,255,0.5)]
                "
            />

            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="
                            relative
                            min-h-[104px]
                            pb-7
                            last:min-h-0
                            last:pb-0
                        "
                    >
                        {/* Dot */}
                        <div
                            className="
                                absolute
                                right-0
                                top-1
                                z-10
                            "
                        >
                            {index === 0 ? (
                                <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_rgba(122,92,255,0.65)]" />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-4
                                        w-4
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        border-primary
                                        bg-background
                                    "
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div
                            className="
                                pr-11
                                text-right
                            "
                        >
                            <h3
                                className="
                                    text-[28px]
                                    font-bold
                                    leading-none
                                    text-primary
                                    drop-shadow-[0_0_10px_rgba(122,92,255,0.3)]
                                "
                            >
                                {item.year}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-base
                                    font-medium
                                    leading-7
                                    text-text-primary
                                "
                            >
                                {localize(item._translations?.title || item.title)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
