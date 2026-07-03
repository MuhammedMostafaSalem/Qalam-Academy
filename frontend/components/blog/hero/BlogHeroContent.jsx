import SectionBadge from "@/components/sections/SectionBadge"
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const BlogHeroContent = () => {
    return (
        <div
            className="
                mx-auto
                flex
                max-w-4xl
                flex-col
                items-center
                text-center
            "
        >
            <SectionBadge>
                المدونة
            </SectionBadge>

            <SectionTitle>
                <span>مقالات تساعدك على</span> {" "}

                <span className="gradient-text">
                    بناء منتجات رقمية أفضل
                </span>
            </SectionTitle>

            <SectionDescription>
                اكتشف أحدث المقالات في تطوير الويب، تصميم واجهات المستخدم،
                الذكاء الاصطناعي، هندسة البرمجيات، وتجارب عملية تساعدك
                على تطوير مهاراتك وبناء مشاريع احترافية.
            </SectionDescription>

            <HeroButtons />

            <HeroStats />
        </div>
    );
};

export default BlogHeroContent;