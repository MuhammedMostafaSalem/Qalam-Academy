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
                    px-6
                    py-3
                    font-semibold
                "
            >
                <HiOutlineArrowPath size={22} />

                عرض المزيد
            </button>
        </div>
    );
};

export default LoadMore;