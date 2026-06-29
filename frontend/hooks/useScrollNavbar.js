"use client";

import { useEffect, useState } from "react";

const useScrollNavbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            setIsTop(currentScroll < 30);

            if (currentScroll > lastScroll && currentScroll > 50) {
                // نازل لتحت
                setShowNavbar(false);
            } else {
                // طالع لفوق
                setShowNavbar(true);
            }

            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { showNavbar, isTop };
}

export default useScrollNavbar