"use client"

import Link from "next/link";
import Button from "@/components/ui/Button";
import { HiArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const HeroButtons = () => {
    const router = useRouter();

    return (
        <div
            className="
                mt-10
                flex
                flex-wrap
                justify-center
                gap-5
            "
        >
            <Button
                onClick={() => router.push("/contact")}
                className="gradient-button flex gap-2 items-center"
            >
                <span>ابدأ مشروعك</span>
                <HiArrowLeft size={20} />
            </Button>

            <Button
                onClick={() => router.push("/services")}
                variant="ghost"
            >
                خدماتنا
            </Button>
        </div>
    );
};

export default HeroButtons;