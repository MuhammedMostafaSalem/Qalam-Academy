"use client";

import {
    HiOutlineCheckBadge,
    HiOutlineCog6Tooth,
    HiOutlineUserGroup,
} from "react-icons/hi2";

import SectionBadge from "@/components/sections/SectionBadge";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const ServicesHeroContent = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const features = [
        {
            id: 1,
            icon: HiOutlineCheckBadge,
            title: isEn ? "High Quality" : "جودة عالية",
            description: isEn ? "We adhere to the highest quality standards" : "نلتزم بأعلى معايير الجودة",
        },
        {
            id: 2,
            icon: HiOutlineUserGroup,
            title: isEn ? "Expert Team" : "فريق محترف",
            description: isEn ? "Specialists in the latest modern technologies" : "خبراء في أحدث التقنيات",
        },
        {
            id: 3,
            icon: HiOutlineCog6Tooth,
            title: isEn ? "Continuous Support" : "دعم مستمر",
            description: isEn ? "We stand with you at every single step" : "نحن معك في كل خطوة",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <SectionBadge>
                {isEn ? "Our Services" : "خدماتنا"}
            </SectionBadge>

            <h1
                {...heroAnimation.title}
                className="
                    text-3xl leading-[1.5] md:text-[40px]
                "
            >
                {isEn ? (
                    <>
                        Integrated Software Solutions
                        <br />
                        <span className="gradient-text">
                            To Grow Your Business
                        </span>
                    </>
                ) : (
                    <>
                        حلول برمجية متكاملة
                        <br />
                        <span className="gradient-text">
                            لتنمية أعمالك
                        </span>
                    </>
                )}
            </h1>

            <p
                {...heroAnimation.description}
                className="
                    max-w-2xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {isEn
                    ? "We deliver a comprehensive suite of software services engineered to help companies and individuals digitally transform and achieve their goals efficiently."
                    : "نقدم مجموعة شاملة من الخدمات البرمجية المصممة خصيصًا لمساعدة الشركات والأفراد على التحول الرقمي وتحقيق أهدافهم بكفاءة."}
            </p>

            {/* Features */}
            <div
                className="
                    grid
                    gap-8
                    sm:grid-cols-3
                "
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={index}
                            {...cardAnimation(index)}
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
                                <Icon className={`h-7 w-7 ${animations.hoverIcon}`} />
                            </div>

                            <div>
                                <h3
                                    {...heroAnimation.title}
                                    className="
                                        font-bold
                                        text-text-primary
                                    "
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    {...heroAnimation.description}
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
    );
};

export default ServicesHeroContent;