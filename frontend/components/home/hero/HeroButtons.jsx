"use client"

import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/providers/LanguageProvider"

const HeroButtons = ({ primaryText, primaryLink, secondaryText, secondaryLink }) => {
    const router = useRouter();
    const { language } = useLanguage();

    return (
        <div className="mt-10 flex flex-wrap gap-4">

            <Button onClick={() => router.push(primaryLink || "/courses")}>
                {primaryText || (language === "en" ? "Explore Courses" : "استكشف الدورات")}
            </Button>

            <Button variant="secondary" onClick={() => router.push(secondaryLink || "/about")}>
                {secondaryText || (language === "en" ? "About Us" : "من نحن")}
            </Button>

        </div>
    )
}

export default HeroButtons
