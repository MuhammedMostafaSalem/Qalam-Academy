import SectionBadge from "@/components/sections/SectionBadge"
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"

const HeroContent = () => {
    return (
        <div
            className="
                mx-auto
                flex
                max-w-4xl
                flex-col
                items-center
                text-center
                gap-5
            "
        >
            <SectionBadge>
                المتجر
            </SectionBadge>

            <SectionTitle>
                كل ما تحتاجة <span className="gradient-text">لتطوير عملك</span>
            </SectionTitle>

            <SectionDescription>
                منتجات وأدوات احترافية تساعدك على بناء وتطوير وتصميم مشاريعك بكفاءة عالية
            </SectionDescription>
        </div>
    )
}

export default HeroContent