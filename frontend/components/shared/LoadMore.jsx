"use client";

import { HiOutlineArrowPath } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LoadMore = ({ onClick, loading = false, pageSize = 10 }) => {
    const { language } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isEn = language === "en";

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        const currentLimit = Number(params.get("limit")) || pageSize;
        params.set("limit", String(currentLimit + pageSize));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mt-5 flex justify-center">
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
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
                    disabled:opacity-60
                "
            >
                <HiOutlineArrowPath size={22} className={loading ? "animate-spin" : ""} />

                <span>{loading ? (isEn ? "Loading..." : "جاري التحميل...") : (isEn ? "Load More" : "عرض المزيد")}</span>
            </button>
        </div>
    );
};

export default LoadMore;
