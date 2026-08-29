"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLanguage } from "@/providers/LanguageProvider";

const RememberMe = () => {
    const { language } = useLanguage();
    const [remember, setRemember] = useState(false);

    return (
        <div
            className="
                flex
                items-center
                justify-between
            "
        >
            <Link
                href="/forgot-password"
                className="
                    text-sm
                    text-primary
                    hover:underline
                "
            >
                {language === "en" ? "Forgot password?" : "نسيت كلمة المرور؟"}
            </Link>
        </div>
    );
};

export default RememberMe;