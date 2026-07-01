"use client";

import Link from "next/link";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Button from "@/components/ui/Button";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const AboutHeroContent = () => {
    const router = useRouter();

    return (
        <div
            className="
                mx-auto
                max-w-xl
                flex
                flex-col
                items-center
                gap-7
                text-center

                lg:mx-0
            "
        >
            <SectionBadge>
                من نحن
            </SectionBadge>

            <SectionTitle
                center
                className="
                    flex
                    flex-col
                    gap-2

                    lg:items-start
                "
            >
                <div className="text-3xl leading-[1.2] md:text-[40px]">
                    <div>نحوّل الأفكار إلى</div>

                    <div className="gradient-text">
                        حلول برمجية متكاملة
                    </div>
                </div>
            </SectionTitle>

            <SectionDescription className="max-w-lg">
                قلم أكاديمي هي شركة متخصصة في تقديم حلول رقمية مبتكرة تساعد
                الشركات والأفراد على النمو والتطور في عالم يتغير بسرعة
            </SectionDescription>

            <div
                className="
                    flex
                    w-full
                    flex-col
                    items-center
                    gap-4
                "
            >
                <Button
                    className="
                        gradient-button
                        flex
                        w-full
                        max-w-[280px]
                        items-center
                        justify-center
                        gap-2
                    "
                    onClick={() => router.push("/contact")}
                >
                    <HiArrowRight className="h-5 w-5" />
                    <span>اعرف المزيد عن رحلتنا</span>
                </Button>

                <Button
                    variant={null}
                    size="lg"
                    className="flex items-center gap-2 text-text-secondary"
                >
                    <HiOutlinePlay
                        size={18}
                        className="glass border-text-secondary rounded-full w-[30px] p-[5px]"
                    />

                    <span>شاهد فيديو تعريفي</span>
                </Button>
            </div>
        </div>
    )
}

export default AboutHeroContent