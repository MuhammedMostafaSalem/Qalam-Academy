import services from '@/constants/services'
import React from 'react'
import ServiceCard from './ServiceCard'
import { cardAnimation } from '@/lib/animation/cardAnimation'

const ServicesGrid = () => {
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
                    key={index}
                    service={service}
                />
            ))}
        </div>
    )
}

export default ServicesGrid