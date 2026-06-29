"use client"

import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"

const HeroButtons = () => {
    const router = useRouter();

    return (
        <div className="mt-10 flex flex-wrap gap-4">

            <Button onClick={() => router.push("/courses")}>
                استكشف الكورسات
            </Button>

            <Button variant="secondary" onClick={() => router.push("/contact")}>
                تواصل معنا
            </Button>

        </div>
    )
}

export default HeroButtons