"use client";

import { getPartnersAction } from '@/actions/partnerActions';
import { fadeUp } from '@/lib/animationHelpers';
import { animations } from '@/lib/animations'
import { useLanguage } from '@/providers/LanguageProvider';
import { useEffect, useState } from 'react';

const HeroPartners = () => {
    const { language } = useLanguage();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPartnersAction("limit=6").then((result) => {
            if (result.success) setPartners(result.data);
            setLoading(false);
        });
    }, [language]);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {language === "en" ? "Loading partners..." : "جاري تحميل الشركاء..."}
            </div>
        );
    }

    if (partners.length < 2) {
        return null;
    }

    return (
        <div
            className="
                mt-[60px]
            "
        >
            <div className="px-8 pb-8">
                <div className="mb-8 flex items-center">
                    <div className="h-px flex-1 bg-border" />

                    <span
                        className="
                            px-4
                            text-sm
                            font-medium
                            text-text-secondary
                            whitespace-nowrap
                        "
                    >
                        {language === "en" ? "Trusted by our clients" : "موضع ثقة عملائنا"}
                    </span>

                    <div className="h-px flex-1 bg-border" />
                </div>

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-8
                    "
                >
                    {partners.map((partner) => (
                        <div
                            {...fadeUp(partner.id * 80)}
                            key={partner._id}
                            className={`
                                flex
                                justify-center
                                text-lg
                                font-semibold
                                text-text-muted

                                ${animations.transition}
                                hover:text-primary
                                hover:scale-110
                            `}
                        >
                            {partner.name}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default HeroPartners
