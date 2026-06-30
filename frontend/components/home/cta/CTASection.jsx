import Section from "@/components/sections/Section";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import { HiArrowRight } from "react-icons/hi2";
import { BsEnvelopeFill } from "react-icons/bs";

const CTASection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[32px]
                        bg-[linear-gradient(90deg,#7c3aed_0%,#5b3df5_35%,#2d63ff_70%,#0ea5e9_100%)]
                        px-8
                        py-10
                        lg:px-16
                        lg:py-14
                    "
                >
                    {/* Content */}

                    <div
                        className="
                            relative
                            flex
                            flex-col-reverse
                            items-center
                            justify-between
                            gap-10
                            lg:flex-row
                        "
                    >
                        {/* Right */}

                        <div
                            className="
                                flex
                                items-center
                                gap-6
                            "
                        >
                            <div
                                className="
                                    hidden
                                    h-24
                                    w-24
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[radial-gradient(circle_at_30%_30%,#c084fc_0%,#60a5fa_55%,#22d3ee_100%)]
                                    lg:flex
                                "
                            >
                                <BsEnvelopeFill
                                    className="
                                        h-12
                                        w-12
                                        text-white
                                    "
                                />
                            </div>
                            <div>

                                <h2
                                    className="
                                        text-3xl
                                        font-bold
                                        text-white
                                    "
                                >
                                    دعنا نساعدك في تحقيق فكرتك
                                </h2>

                                <p
                                    className="
                                        mt-3
                                        max-w-md
                                        text-white/80
                                    "
                                >
                                    تواصل معنا الآن واحصل على استشارة مجانية
                                    لمشروعك أو ابدأ رحلتك التعليمية معنا.
                                </p>

                            </div>

                        </div>
                        
                        {/* Left */}

                        <div className="w-full max-w-md">

                            <div
                                className="
                                    flex
                                    overflow-hidden
                                    rounded-xl
                                    bg-background
                                "
                            >
                                <input
                                    type="email"
                                    placeholder="أدخل بريدك الإلكتروني"
                                    className="
                                        w-full
                                        bg-transparent
                                        px-5
                                        py-4
                                        text-white
                                        placeholder:text-muted-foreground
                                        outline-none
                                    "
                                />

                                <button
                                    className="rounded-none bg-white text-secondary px-6 py-3"
                                >
                                    <HiArrowRight className="h-5 w-5" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </Section>
    )
}

export default CTASection