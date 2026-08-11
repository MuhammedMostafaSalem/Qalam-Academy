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

const ServicesGrid = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicesAction("limit=6").then((result) => {
            if (result.success) setServices(result.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                جاري تحميل الخدمات...
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                لا توجد خدمات متاحة حالياً
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
                        title: service.title?.ar || service.title,
                        description: service.description?.ar || service.description,
                        slug: service._id,
                    }}
                />
            ))}
        </div>
    );
};

export default ServicesGrid;