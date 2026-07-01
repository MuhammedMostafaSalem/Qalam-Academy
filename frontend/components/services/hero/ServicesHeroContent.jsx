import {
    HiOutlineCheckBadge,
    HiOutlineCog6Tooth,
    HiOutlineUserGroup,
} from "react-icons/hi2";

import SectionBadge from "@/components/sections/SectionBadge"

const features = [
    {
        id: 1,
        icon: HiOutlineCheckBadge,
        title: "جودة عالية",
        description: "نلتزم بأعلى معايير الجودة",
    },
    {
        id: 2,
        icon: HiOutlineUserGroup,
        title: "فريق محترف",
        description: "خبراء في أحدث التقنيات",
    },
    {
        id: 3,
        icon: HiOutlineCog6Tooth,
        title: "دعم مستمر",
        description: "نحن معك في كل خطوة",
    },
];

const ServicesHeroContent = () => {
    return (
        <div className="flex flex-col gap-6">
            <SectionBadge>
                خدماتنا
            </SectionBadge>

            <h1
                className="
                    text-3xl leading-[1.5] md:text-[40px]
                "
            >
                حلول برمجية متكاملة
                <br />

                <span className="gradient-text">
                    لتنمية أعمالك
                </span>
            </h1>

            <p
                className="
                    max-w-2xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                نقدم مجموعة شاملة من الخدمات البرمجية
                المصممة خصيصًا لمساعدة الشركات والأفراد
                على التحول الرقمي وتحقيق أهدافهم بكفاءة.
            </p>

            {/* Features */}

            <div
                className="
                    grid
                    gap-8
                    sm:grid-cols-3
                "
            >
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.id}
                            className="flex items-start gap-4"
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Icon className="h-7 w-7" />
                            </div>

                            <div>

                                <h3
                                    className="
                                        font-bold
                                        text-text-primary
                                    "
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
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

        </div>
    )
}

export default ServicesHeroContent