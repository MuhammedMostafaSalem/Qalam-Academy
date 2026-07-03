"use client"

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const CTAButtons = () => {
    const router = useRouter();

    return (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
                onClick={() => router.push("/contact")}
                className="gradient-button"
            >
                ابدأ مشروعك
            </Button>

            <Button
                onClick={() => router.push("/services")}
                variant="ghost"
            >
                استكشف خدماتنا
            </Button>
        </div>
    );
};

export default CTAButtons;