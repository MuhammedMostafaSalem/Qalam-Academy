"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const RememberMe = () => {
    const [remember, setRemember] = useState(false);

    return (
        <div
            className="
                flex
                items-center
                justify-between
            "
        >
            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="hidden"
                />

                <div
                    className={`
                    flex h-5 w-5 items-center justify-center rounded-lg border-2 transition-all duration-200
                    ${remember
                        ? "border-primary bg-primary"
                        : "border-gray-400 bg-white"
                    }
                `}
                >
                    {remember && (
                        <FaCheck
                            size={14}
                            className="text-white"
                            strokeWidth={3}
                        />
                    )}
                </div>

                <span>تذكرني</span>
            </label>

            <Link
                href="/forgot-password"
                className="
                    text-sm
                    text-primary
                    hover:underline
                "
            >
                نسيت كلمة المرور؟
            </Link>
        </div>
    );
};

export default RememberMe;