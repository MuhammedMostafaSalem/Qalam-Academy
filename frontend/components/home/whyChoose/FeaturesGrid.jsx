import { whyChoose } from '@/constants/whyChoose'
import React from 'react'
import FeatureCard from './FeatureCard'

const FeaturesGrid = () => {
    return (
        <div
            className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >
            {whyChoose.map((feature) => (
                <FeatureCard
                    key={feature.id}
                    feature={feature}
                />
            ))}
        </div>
    )
}

export default FeaturesGrid