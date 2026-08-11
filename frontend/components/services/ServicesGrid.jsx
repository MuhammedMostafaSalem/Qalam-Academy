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

const ServicesGrid = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicesAction("limit=12").then((result) => {
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
                لا توجد خدمات حالياً
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
            {services.map((service, index) => (
                <ServiceCard
                    index={index}
                    key={service._id}
                    service={{
                        title: service.title?.ar || service.title || "",
                        description: service.description?.ar || service.description || "",
                        icon: defaultIcons[index % defaultIcons.length],
                        image: service.image ? `${BASE_URL}${service.image}` : null,
                        slug: service._id,
                    }}
                />
            ))}
        </div>
    );
};

export default ServicesGrid;