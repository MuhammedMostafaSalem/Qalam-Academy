"use client";

import React, { useEffect, useState } from 'react';
import { whyChoose as fallbackWhyChoose } from '@/constants/whyChoose';
import FeatureCard from './FeatureCard';
import { fadeUp } from '@/lib/animationHelpers';
import { getChooseUsAction } from '@/actions/chooseActions';
import { FaGraduationCap, FaChalkboardTeacher, FaBriefcase, FaCertificate } from "react-icons/fa";

const defaultIcons = [FaGraduationCap, FaChalkboardTeacher, FaBriefcase, FaCertificate];

const FeaturesGrid = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const res = await getChooseUsAction();
                if (res.success && res.data && Array.isArray(res.data.points) && res.data.points.length > 0) {
                    const formatted = res.data.points.map((p, idx) => ({
                        id: p._id || idx + 1,
                        title: p.title?.ar || p.title?.en || p.title,
                        description: p.description?.ar || p.description?.en || p.description,
                        icon: defaultIcons[idx % defaultIcons.length],
                    }));
                    setFeatures(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch choose us features", err);
            }
        };
        fetchFeatures();
    }, []);

    const displayFeatures = features.length > 0 ? features : fallbackWhyChoose;

    return (
        <div
            {...fadeUp()}
            className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
                place-items-center
                justify-items-center
            "
        >
            {displayFeatures.map((feature, index) => (
                <FeatureCard
                    index={index}
                    key={feature.id || index}
                    feature={feature}
                />
            ))}
        </div>
    );
};

export default FeaturesGrid;