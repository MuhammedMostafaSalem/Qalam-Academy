"use client"

import Link from "next/link";
import Section from "@/components/sections/Section";
import SectionBadge from "@/components/sections/SectionBadge";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
    HiArrowRight,
} from "react-icons/hi2";
import { useRouter } from "next/navigation";

const CTASection = () => {
    const router = useRouter();

    return (
        <Section className="mt-[80px]">
            <Container>
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        bg-gradient-to-br
                        from-primary
                        via-primary
                        to-secondary
                        px-8
                        py-16
                        text-center
                        text-white
                    "
                >
                    {/* Glow */}

                    <div
                        className="
                            absolute
                            -top-32
                            left-1/2
                            h-72
                            w-72
                            -translate-x-1/2
                            rounded-full
                            bg-white/10
                            blur-3xl
                        "
                    />

                    {/* Content */}

                    <div className="relative z-10 mx-auto max-w-3xl">

                        <SectionBadge
                            className="
                                border-white/20
                                bg-white/10
                                text-white
                            "
                        >
                            ابدأ مشروعك الآن
                        </SectionBadge>

                        <h2
                            className="
                                mt-6
                                text-4xl
                                font-extrabold
                                leading-tight
                                lg:text-5xl
                            "
                        >
                            جاهز لتحويل فكرتك
                            <br />
                            إلى مشروع ناجح؟
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-6
                                max-w-2xl
                                text-lg
                                leading-8
                                text-white/80
                            "
                        >
                            دع فريقنا يساعدك في بناء حلول رقمية احترافية
                            تناسب احتياجاتك وتحقق أهداف عملك بأحدث
                            التقنيات وأفضل الممارسات.
                        </p>

                        {/* Actions */}

                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                justify-center
                                gap-4
                                sm:flex-row
                            "
                        >
                            <Button
                                onClick={() => router.push("/contact")}
                                className="gradient-button flex gap-3 items-center"
                                size="lg"
                            >
                                <HiArrowRight className="h-5 w-5" />
                                <span>تواصل معنا</span>
                            </Button>

                        </div>

                    </div>

                </div>
            </Container>
        </Section>
    )
}

export default CTASection