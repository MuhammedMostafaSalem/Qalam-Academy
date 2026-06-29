import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/assets/logos/hero-image.png';
const HeroImage = () => {
    return (
        <div className="hidden lg:block">
            <Image
                src={heroImage}
                alt="Qalam Academy"
                priority
                className="
                    h-auto
                    w-full
                    max-w-[520px]
                    rounded-[24px]
                    object-cover
                "
            />
        </div>
    )
}

export default HeroImage