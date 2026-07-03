import Link from "next/link"
import { animations } from "@/lib/animations"
import { ctaAnimation } from "@/lib/animation/ctaAnimation"

const CTAButton = () => {
    return (
        <Link
            {...ctaAnimation.buttons}
            href="/contact"
            className={`
                gradient-button
                rounded-full
                px-6 py-3
                font-semibold text-white
                shadow-neon
                w-full

                ${animations.transition}
                ${animations.press}

                hover:shadow-xl
                hover:-translate-y-1
            `}
        >
            تواصل معنا
        </Link>
    )
}

export default CTAButton