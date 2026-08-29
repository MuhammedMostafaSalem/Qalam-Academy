"use client";

import ServiceCard from "@/components/services/ServiceCard";
import { getServicesAction } from "@/actions/serviceActions";
import { useEffect, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import Image from "next/image";

// Fallback icons to cycle through for services from API
import {
    HiOutlineAcademicCap,
    HiOutlineCode,
    HiOutlinePaintBrush,
    HiOutlineDevicePhoneMobile,
    HiOutlineServer,
    HiOutlineShieldCheck,
} from "react-icons/hi2";

const FALLBACK_ICONS = [
    HiOutlineAcademicCap,
    HiOutlineCode,
    HiOutlinePaintBrush,
    HiOutlineDevicePhoneMobile,
    HiOutlineServer,
    HiOutlineShieldCheck,
];

import { useLanguage } from "@/providers/LanguageProvider";

const ServicesGrid = () => {
    const { language } = useLanguage();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicesAction("isActive=true&limit=6").then((result) => {
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
                {language === "en" ? "No services available currently" : "لا توجد خدمات متاحة حالياً"}
            </div>
        );
    }

    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-6
            "
        >
            {services.map((service, index) => (
                <ServiceCard
                    key={service._id}
                    index={index}
                    service={{
                        icon: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
                        title: service.title,
                        description: service.description,
                        slug: service.slug,
                    }}
                />
            ))}
        </div>
    );
};

export default ServicesGrid;
