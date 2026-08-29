"use client";

import React from 'react';
import { whyChoose } from '@/constants/whyChoose';
import FeatureCard from './FeatureCard';
import { fadeUp } from '@/lib/animationHelpers';

const FeaturesGrid = () => {
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
            {whyChoose.map((feature, index) => (
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
