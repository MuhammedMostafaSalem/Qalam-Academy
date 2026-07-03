"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { HiArrowRight, HiOutlineBookOpen } from "react-icons/hi2";

const HeroButtons = () => {
    const router = useRouter();

    return (
        <div
            className="
                mt-10
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
            "
        >
            <Button
                className="
                    gradient-button
                    flex
                    items-center
                    gap-2
                "
                onClick={() => router.push("/contact")}
            >
                <HiArrowRight size={20} />

                <span>ابدأ مشروعك معنا</span>
            </Button>

            <Button
                variant="ghost"
                className="
                    flex
                    items-center
                    gap-2
                "
                onClick={() =>
                    window.scrollTo({
                        top: 700,
                        behavior: "smooth",
                    })
                }
            >
                <HiOutlineBookOpen size={20} />

                <span>تصفح المقالات</span>
            </Button>
        </div>
    );
};

export default HeroButtons;