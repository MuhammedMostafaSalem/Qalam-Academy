"use client";

import {
    HiOutlineAcademicCap,
    HiOutlineUsers,
    HiOutlineStar,
    HiOutlineBriefcase,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const InstructorStats = ({ instructor }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const defaultBio = isEn
        ? "Software engineer specializing in modern application development with extensive expertise building enterprise-grade architectures. Has mentored thousands of students to start their professional coding journeys."
        : "مهندس برمجيات متخصص في تطوير التطبيقات بخبرة واسعة في بناء الحلول البرمجية الحديثة. قام بتدريب آلاف الطلاب وساعد الكثير منهم في الحصول على أول وظيفة في مجال البرمجة.";

    const bio = instructor?.bio ? localize(instructor.bio) : defaultBio;

    const stats = [
        {
            icon: HiOutlineBriefcase,
            value: instructor?.experience || (isEn ? "+5 Years" : "+5 سنوات"),
            label: isEn ? "Experience" : "الخبرة",
        },
        {
            icon: HiOutlineUsers,
            value: instructor?.students || "+1,000",
            label: isEn ? "Students" : "طالب",
        },
        {
            icon: HiOutlineAcademicCap,
            value: instructor?.courses || "10+",
            label: isEn ? "Courses" : "كورس",
        },
        {
            icon: HiOutlineStar,
            value: instructor?.rating || "4.9",
            label: isEn ? "Rating" : "التقييم",
        },
    ];

    return (
        <div>
            <p className="leading-8 text-text-secondary">
                {bio}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-card
                                p-6
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <Icon size={28} />
                                </div>

                                <div>
                                    <h4 className="text-2xl font-bold">
                                        {item.value}
                                    </h4>

                                    <p className="text-text-secondary">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InstructorStats;