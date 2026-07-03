import Image from "next/image";
import officeImage from "@/public/assets/images/about-hero.png";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const AboutHeroImage = () => {
    return (
        <div {...heroAnimation.image} className="relative">

            {/* Glow */}

            <div
                className="
                    absolute
                    inset-0
                    rounded-3xl
                    bg-primary/20
                    blur-3xl
                    -z-10
                    scale-95
                "
            />

            {/* Image */}

            <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-card
                    animate-pulse-glow
                "
            >
                <Image
                    src={officeImage}
                    alt="Qalam Academy Office"
                    priority
                    className={`h-full w-full object-cover ${animations.floating}`}
                />
            </div>

            {/* Experience Card */}

            <div
                className={`
                    absolute
                    -bottom-8
                    left-0
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-card/90
                    px-[50]
                    py-4
                    backdrop-blur-xl
                    shadow-2xl
                    ${animations.hoverLift}
                `}
            >
                <div className="flex flex-col justify-end items-end gap-1">

                    <h3 className="text-3xl">
                        +7
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        سنوات من الخبرة
                    </p>

                    <p className="text-sm text-muted-foreground">
                        في تطوير الحلول الرقمية
                    </p>

                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-primary
                        to-secondary
                        absolute
                        top-[3px]
                        -left-3
                    "
                >
                    <HiOutlineRocketLaunch className={`h-7 w-7 text-white ${animations.floating}`} />
                </div>
            </div>

        </div>
    )
}

export default AboutHeroImage