"use client";

import { HiStar } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const ReviewSummary = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const averageRating = course?.averageRating || 0;
    const reviewsCount = course?.totalReviews ?? course?.reviews?.length ?? 0;
    const ratingDistribution = course?.ratingDistribution || {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };

    // Calculate percentages for each star rating
    const getPercentage = (count) => {
        if (reviewsCount === 0) return 0;
        return Math.round((count / reviewsCount) * 100);
    };

    return (
        <div
            className="
                mb-12
                rounded-3xl
                border
                border-border
                bg-card
                p-8
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>
                    <h3 className="text-6xl font-bold">
                        {averageRating.toFixed(1)}
                    </h3>

                    <div className="mt-3 flex gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HiStar 
                                key={index} 
                                size={22}
                                className={index < Math.round(averageRating) ? "" : "opacity-30"}
                            />
                        ))}
                    </div>

                    <p className="mt-3 text-text-secondary">
                        {isEn ? `Based on ${reviewsCount} reviews` : `بناءً على ${reviewsCount} تقييم`}
                    </p>
                </div>

                <div className="flex-1 space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div
                            key={star}
                            className="flex items-center gap-4"
                        >
                            <span className="w-6">{star}</span>

                            <div className="h-2 flex-1 rounded-full bg-background-alt">
                                <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{
                                        width: `${getPercentage(ratingDistribution[star] || 0)}%`,
                                    }}
                                />
                            </div>
                            
                            <span className="w-12 text-sm text-text-secondary">
                                {getPercentage(ratingDistribution[star] || 0)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewSummary;
