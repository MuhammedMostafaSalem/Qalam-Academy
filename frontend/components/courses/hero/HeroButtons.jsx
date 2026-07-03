"use client";

import Button from "@/components/ui/Button";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { heroAnimation } from "@/lib/animation/heroAnimation";

const HeroButtons = () => {
    const router = useRouter();

    return (
        <div
            className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
            "
        >
            <Button
                {...heroAnimation.buttons}
                onClick={() => router.push("/courses")}
                className="
                    gradient-button
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-w-[220px]
                "
            >
                <HiArrowRight size={20} />
                استكشف الكورسات
            </Button>

            <Button
                {...heroAnimation.buttons}
                variant="outline"
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-w-[220px]
                "
            >
                <HiOutlinePlay size={20} />
                كيف تعمل الكورسات؟
            </Button>
        </div>
    );
};

export default HeroButtons;