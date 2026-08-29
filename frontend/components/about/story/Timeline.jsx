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
                const res = await getTimelineAction();
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
        <div className="relative w-full md:w-[220px]">
            {/* Horizontal Line (Mobile) */}
            <div
                className="
                    absolute
                    left-4
                    right-4
                    top-[7px]
                    h-[2px]
                    rounded-full
                    bg-primary
                    md:hidden
                "
            />

            {/* Vertical Line (Desktop) */}
            <div
                className="
                    hidden
                    md:block
                    absolute
                    right-[7px]
                    top-[16px]
                    bottom-[16px]
                    w-[2px]
                    rounded-full
                    bg-primary
                "
            />

            <div
                className="
                    flex
                    flex-row
                    justify-between
                    md:flex-col
                    md:gap-8
                "
            >
                {items.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="
                            relative
                            flex-1
                            md:flex-none
                            md:min-h-[60px]
                        "
                    >
                        {/* Dot */}
                        <div
                            className="
                                absolute
                                left-1/2
                                -translate-x-1/2
                                top-0
                                z-10
                                md:left-auto
                                md:translate-x-0
                                md:right-0
                                md:top-2
                            "
                        >
                            {index === 0 ? (
                                <div className="h-[14px] w-[14px] rounded-full bg-primary" />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-[14px]
                                        w-[14px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        border-primary
                                        bg-background
                                    "
                                >
                                    <div className="h-[5px] w-[5px] rounded-full bg-primary" />
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div
                            className="
                                pt-8
                                text-center
                                md:pt-0
                                md:pr-10
                                md:text-right
                            "
                        >
                            <h3
                                className="
                                    text-xl
                                    font-bold
                                    leading-none
                                    text-primary
                                    md:text-[28px]
                                "
                            >
                                {item.year}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-5
                                    text-text-primary
                                    md:text-[17px]
                                    md:leading-6
                                "
                            >
                                {localize(item.title)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
