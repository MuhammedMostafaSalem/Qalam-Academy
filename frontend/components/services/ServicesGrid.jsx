"use client";

import { useEffect, useState } from "react";
import { getServicesAction } from "@/actions/serviceActions";
import ServiceCard from "./ServiceCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import {
    FaCode,
    FaMobileAlt,
    FaGraduationCap,
    FaShoppingCart,
    FaPaintBrush,
    FaBullhorn,
} from "react-icons/fa";
import { GrVmMaintenance } from "react-icons/gr";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const defaultIcons = [
    FaCode,
    FaMobileAlt,
    FaGraduationCap,
    FaShoppingCart,
    FaPaintBrush,
    FaBullhorn,
    GrVmMaintenance,
];

import { useLanguage } from "@/providers/LanguageProvider";

const ServicesGrid = () => {
    const { language } = useLanguage();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicesAction("isActive=true&limit=12").then((result) => {
            if (result.success) setServices(result.data);
            setLoading(false);
        });
    }, [language]);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {language === "en" ? "Loading services..." : "جاري تحميل الخدمات..."}
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                {language === "en" ? "No services available currently" : "لا توجد خدمات حالياً"}
            </div>
        );
    }

    return (
        <div
            className="
                grid
                grid-cols-1
                gap-8
                sm:grid-cols-2
                xl:grid-cols-3
            "
        >
            {services.map((service, index) => {
                const serviceKey = typeof service?._id === "string" ? service._id : (service?.id || `service-${index}`);
                const serviceSlug = service?.slug || (typeof service?._id === "string" ? service._id : `service-${index}`);

                return (
                    <ServiceCard
                        index={index}
                        key={serviceKey}
                        service={{
                            title: service.title || "",
                            description: service.description || "",
                            icon: defaultIcons[index % defaultIcons.length],
                            image: service.image ? `${BASE_URL}${service.image}` : null,
                            slug: serviceSlug,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ServicesGrid;
