import SectionBadge from "@/components/sections/SectionBadge";
import Button from "@/components/ui/Button";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";
import { heroAnimation } from "@/lib/animation/heroAnimation";


const CoursesHeroContent = () => {
    return (
        <div className="flex flex-col">
            <SectionBadge>
                كورساتنا
            </SectionBadge>

            {/* Heading */}
            <h1
                {...heroAnimation.title}
                className="mt-6 max-w-2xl"
            >
                <span className="block text-4xl md:text-5xl lg:text-[60px] text-white">
                    كورسات تقنية احترافية
                </span>

                <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                    <span className="bg-gradient-to-r from-[#3ABEFF] via-[#4F8BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                        بقيادة خبراء المجال
                    </span>
                </span>
            </h1>

            <p
                {...heroAnimation.description}
                className="
                    mt-6
                    max-w-xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                تعلم المهارات المطلوبة لسوق العمل من خلال
                دورات عملية مصممة باحترافية، تبدأ من الأساسيات
                وحتى الاحتراف الكامل بمشاريع حقيقية.
            </p>

            <HeroButtons />

            <HeroFeatures />

        </div>
    );
};

export default CoursesHeroContent;