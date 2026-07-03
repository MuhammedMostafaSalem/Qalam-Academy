import { fadeUp } from "@/lib/animationHelpers";
import { heroCoursesFeatures } from "./heroCoursesFeatures";
import { cardAnimation } from "@/lib/animation/cardAnimation";

const HeroFeatures = () => {
    return (
        <div
            {...fadeUp()}
            className="
                mt-10
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
            "
        >
            {heroCoursesFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                    <div
                        key={index}
                        {...cardAnimation(index)}
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <Icon size={22} />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                {feature.title}
                            </h3>

                            <p
                                className="
                                    text-sm
                                    text-text-secondary
                                "
                            >
                                {feature.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default HeroFeatures