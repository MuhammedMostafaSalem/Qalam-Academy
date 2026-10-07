"use client";

import React from 'react';
import { whyChoose } from '@/constants/whyChoose';
import FeatureCard from './FeatureCard';
import { fadeUp } from '@/lib/animationHelpers';

const FeaturesGrid = ({items}) => {
    return (
        <div
            {...fadeUp()}
            className="
                flex
                flex-wrap
                justify-center
                gap-6
            "
        >
            {
                items?.isActive === true ?
                    items?.items.map((feature, index) => (
                        <FeatureCard
                            index={index}
                            key={feature._id || index}
                            feature={feature}
                        />
                    ))
                : whyChoose.map((feature, index) => (
                    <FeatureCard
                        index={index}
                        key={feature.id || index}
                        feature={feature}
                    />
                ))
            }
        </div>
    );
};

export default FeaturesGrid;
