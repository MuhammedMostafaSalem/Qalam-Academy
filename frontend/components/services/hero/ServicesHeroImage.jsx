import Image from "next/image";
import heroImage from "@/public/assets/images/services-hero.png";

const ServicesHeroImage = () => {
    return (
        <div className="relative hidden lg:flex lg:justify-start">
            {/* Background Glow */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    flex
                    items-center
                    justify-center
                "
            >
                <div
                    className="
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-primary/15
                        blur-[120px]
                    "
                />
            </div>

            {/* Hero Image */}

            <div
                className="
                    relative
                    w-full
                    max-w-[620px]
                    transition-transform
                    duration-500
                    hover:scale-105
                "
            >
                <Image
                    src={heroImage}
                    alt="Software Development Services"
                    priority
                    className="
                        h-auto
                        w-full
                        object-contain
                        drop-shadow-2xl
                    "
                />
            </div>
        </div>
    )
}

export default ServicesHeroImage