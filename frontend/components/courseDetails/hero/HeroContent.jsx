import SectionBadge from "@/components/sections/SectionBadge";
import HeroMeta from "./HeroMeta";
import { heroAnimation } from "@/lib/animation/heroAnimation";

const HeroContent = ({ course }) => {
    const title = course?.title?.ar || course?.title?.en || course?.title || "دورة تعليمية";
    const description = course?.description?.ar || course?.description?.en || course?.description || "";
    const categoryName = course?.category?.name?.ar || course?.category?.name?.en || course?.category?.name || "";

    return (
        <div className="flex flex-col">
            {categoryName && (
                <SectionBadge>
                    {categoryName}
                </SectionBadge>
            )}

            <h1
                {...heroAnimation.title}
                className="
                    mt-5
                    text-4xl
                    font-bold
                    leading-[1.4]

                    lg:text-5xl
                "
            >
                {title}
            </h1>

            <p
                {...heroAnimation.description}
                className="
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {description}
            </p>

            <HeroMeta course={course} />
        </div>
    );
};

export default HeroContent;