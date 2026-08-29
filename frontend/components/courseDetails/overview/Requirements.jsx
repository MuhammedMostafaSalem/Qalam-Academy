"use client";

import {
    HiOutlineInformationCircle,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const Requirements = ({ requirements: reqProp }) => {
    const { language, localize } = useLanguage();
    const reqList = Array.isArray(reqProp) ? reqProp.filter(Boolean) : [];

    if (reqList.length === 0) return null;

    return (
        <section className="mt-14">
            <h2 className="text-2xl font-bold">
                {language === "en" ? "Course Requirements" : "متطلبات الكورس"}
            </h2>

            <div
                className="
                    mt-8
                    rounded-3xl
                    border
                    border-border
                    bg-card
                    p-8
                "
            >
                <ul className="space-y-5">
                    {reqList.map((item, index) => (
                        <li
                            key={index}
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >
                            <HiOutlineInformationCircle
                                className="
                                    mt-1
                                    text-primary
                                    shrink-0
                                "
                                size={22}
                            />

                            <span className="text-text-secondary">
                                {localize(item)}
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Requirements;
