import Image from "next/image";
import courseImage from "@/public/assets/images/course-details-hero.png";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const HeroImage = () => {
    return (
        <div {...heroAnimation.image} className="relative">
            {/* Glow */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    rounded-full
                    bg-primary/20
                    blur-[120px]
                "
            />

            {/* Image */}
            <div
                className="
                    overflow-hidden
                    rounded-fullCard
                    glass
                "
            >
                <Image
                    src={courseImage}
                    alt="Frontend Development Bootcamp"
                    priority
                    className={`
                        h-full
                        w-full
                        object-cover
                        ${animations.floating}
                    `}
                />
            </div>

            {/* Floating Badge */}

            <div
                className={`
                    absolute
                    -bottom-6
                    left-6
                    rounded-2xl
                    border
                    border-border
                    bg-card/90
                    px-6
                    py-4
                    backdrop-blur-xl
                    ${animations.floating}
                `}
            >
                <h3 className="text-2xl font-bold text-primary">
                    +40 ساعة
                </h3>

                <p className="text-sm text-text-secondary">
                    محتوى تدريبي
                </p>
            </div>
        </div>
    );
};

export default HeroImage;