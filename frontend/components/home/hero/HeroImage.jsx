import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/assets/logos/hero-image.png';
import { heroAnimation } from '@/lib/animation/heroAnimation';
import { animations } from '@/lib/animations';

const HeroImage = () => {
    return (
        <div
            {...heroAnimation.image}
            className="hidden lg:block"
        >
            <Image
                src={heroImage}
                alt="Qalam Academy"
                priority
                className={`
                    h-auto
                    w-full
                    max-w-[520px]
                    rounded-[24px]
                    object-cover
                    ${animations.floating}
                `}
            />
        </div>
    )
}

export default HeroImage