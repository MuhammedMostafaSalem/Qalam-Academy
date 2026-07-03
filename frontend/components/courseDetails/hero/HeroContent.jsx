import SectionBadge from "@/components/sections/SectionBadge";
import HeroMeta from "./HeroMeta";
import { heroAnimation } from "@/lib/animation/heroAnimation";

const HeroContent = () => {
    return (
        <div className="flex flex-col">

            <SectionBadge>
                Frontend Development
            </SectionBadge>

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
                Frontend Development Bootcamp
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
                تعلم Frontend Development من الصفر وحتى الاحتراف باستخدام
                HTML وCSS وJavaScript وReact مع تنفيذ مشاريع عملية تحاكي سوق
                العمل الحقيقي.
            </p>

            <HeroMeta />

        </div>
    );
};

export default HeroContent;