"use client";

import { fadeUp } from "@/lib/animationHelpers";
import PartnerCard from "./PartnerCard";
import { getPartnersAction } from "@/actions/partnerActions";
import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

const PartnersGrid = () => {
    const { language } = useLanguage();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPartnersAction("limit=20").then((result) => {
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

    if (partners.length === 0) {
        return (
            <div className="py-6 text-center text-text-muted">
                {language === "en" ? "No partners currently available" : "لا يوجد شركاء حالياً"}
            </div>
        );
    }

    return (
        <div
            {...fadeUp()}
            className="
                grid
                grid-cols-2
                gap-6
                sm:grid-cols-3
                lg:grid-cols-5
            "
        >
            {partners.map((partner, index) => (
                <PartnerCard
                    key={partner._id}
                    index={index}
                    partner={{
                        name: partner.name,
                        website: partner.website || "#",
                        image: partner.image,
                    }}
                />
            ))}
        </div>
    );
};

export default PartnersGrid;