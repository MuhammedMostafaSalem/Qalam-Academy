import Image from "next/image";

import heroImage from "@/public/assets/images/courses-hero.png";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const CoursesHeroImage = () => {
    return (
        <div
            {...heroAnimation.image}
            className="
                relative
                hidden
                lg:flex
                justify-center
            "
        >
            {/* Glow */}

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
                        h-[430px]
                        w-[430px]
                        rounded-full
                        bg-primary/20
                        blur-[130px]
                    "
                />
            </div>

            <div
                className="
                    relative
                    w-full
                    max-w-[620px]
                "
            >
                <Image
                    src={heroImage}
                    alt="Programming Courses"
                    priority
                    className={`
                        h-auto
                        w-full
                        object-contain
                        ${animations.floating}
                    `}
                />
            </div>
        </div>
    );
};

export default CoursesHeroImage;