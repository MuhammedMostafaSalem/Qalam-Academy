import Link from "next/link"

const CTAButton = () => {
    return (
        <Link
            href="/contact"
            className="gradient-button rounded-full px-6 py-3 font-semibold text-white shadow-neon w-full"
        >
            تواصل معنا
        </Link>
    )
}

export default CTAButton