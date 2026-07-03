"use client";

import { initAOS, refreshAOS } from "@/lib/aos";
import { useEffect } from "react";

const AnimationProvider = ({ children }) => {
    useEffect(() => {
        initAOS();

        refreshAOS();
    }, []);

    return children
}

export default AnimationProvider