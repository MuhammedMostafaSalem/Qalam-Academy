"use client";

import Button from "@/components/ui/Button";
import { HiOutlineArrowPath } from "react-icons/hi2";

const LoadMore = () => {
    return (
        <div className="mt-5 flex justify-center">
            <button
                className="
                    gradient-button
                    rounded-button
                    flex
                    items-center
                    gap-3
                    px-3 sm:px-5
                    py-1 sm:py-2
                    font-semibold
                    text-[12px] sm:text-[16px]
                "
            >
                <HiOutlineArrowPath size={22} />

                عرض المزيد
            </button>
        </div>
    );
};

export default LoadMore;