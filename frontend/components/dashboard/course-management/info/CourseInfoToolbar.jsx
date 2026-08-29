"use client";

import Section from "@/components/sections/Section";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseInfoToolbar = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <Section
            className="
                mb-6
                flex
                items-center
                justify-between
            "
        >
            <div>
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center

                            rounded-2xl

                            bg-primary/10
                            text-primary
                        "
                    >
                        <HiOutlineInformationCircle size={22} />
                    </div>

                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        {isEn ? "Course Information" : "معلومات الكورس"}
                    </h2>
                </div>

                <p
                    className="
                        mt-2
                        text-sm
                        text-text-secondary
                    "
                >
                    {isEn ? "Edit course basic details and configuration." : "تعديل بيانات الكورس الأساسية وإعداداته."}
                </p>
            </div>
        </Section>
    );
};

export default CourseInfoToolbar;