"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { animations } from "@/lib/animations";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll To Top"
            className={`
                fixed
                bottom-6
                left-6
                z-[100]
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-primary
                text-white
                shadow-lg

                ${animations.transition}
                ${animations.press}

                ${visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-6 opacity-0"
                }
            `}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;