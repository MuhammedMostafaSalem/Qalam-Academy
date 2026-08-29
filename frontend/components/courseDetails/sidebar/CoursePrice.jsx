"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const CoursePrice = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const price = course?.discountPrice || course?.price || 0;
    const oldPrice = course?.discountPrice ? course?.price : null;
    const discountPercent = oldPrice && price 
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : null;

    const currency = isEn ? "EGP" : "ج.م";

    return (
        <div>
            <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-primary">
                    {price} {currency}
                </h2>

                {oldPrice && (
                    <span
                        className="
                            text-xl
                            line-through
                            text-text-secondary
                        "
                    >
                        {oldPrice} {currency}
                    </span>
                )}
            </div>

            {discountPercent && (
                <p className="mt-3 text-sm text-success">
                    {isEn ? `Save ${discountPercent}%` : `وفر ${discountPercent}%`}
                </p>
            )}
        </div>
    );
};

export default CoursePrice;
