"use client";

import Button from "@/components/ui/Button";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { fadeUp } from "@/lib/animationHelpers";
import { ctaAnimation } from "@/lib/animation/ctaAnimation";

const LoadMore = () => {
    return (
        <div {...fadeUp()} className="mt-16 flex justify-center">

            <Button
                {...ctaAnimation.buttons}
                className="
                    gradient-button
                    flex
                    items-center
                    gap-3
                    px-8
                "
            >
                <HiOutlineArrowPath size={22} />

                عرض المزيد
            </Button>

        </div>
    );
};

export default LoadMore;