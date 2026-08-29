"use client";

import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineCalendarDays,
    HiOutlineClock,
} from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import Section from "../sections/Section";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import userIcon from '@/public/assets/user-icon.png';

const ProfileHeroCard = () => {
    const { user } = useAuth();
    const { language } = useLanguage();
    const isEn = language === "en";

    if (!user) return null;

    const roleLabels = {
        admin: isEn ? "Super Admin" : "مدير النظام",
        instructor: isEn ? "Instructor" : "مدرس",
        student: isEn ? "Student" : "طالب",
    };

    const roleLabel = roleLabels[user.role] || user.role;
    const isActive = user.isActive !== false;

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

                <div className="flex flex-col gap-6 md:flex-row md:items-center">

                    <img
                        src={user.avatar || userIcon}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={120}
                        height={120}
                        className="
                            rounded-3xl
                            object-cover
                            border
                            border-border
                        "
                    />

                    <div>

                        <div className="flex items-center gap-3 flex-wrap">

                            <h1 className="text-3xl font-bold">
                                {user.firstName} {user.lastName}
                            </h1>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-sm
                                    font-medium
                                    ${isActive
                                        ? "bg-success/10 text-success"
                                        : "bg-error/10 text-error"
                                    }
                                `}
                            >
                                {isActive ? (isEn ? "Active" : "نشط") : (isEn ? "Inactive" : "معطل")}
                            </span>

                        </div>

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                text-primary
                                font-medium
                            "
                        >
                            <LuShieldCheck />

                            {roleLabel}
                        </div>

                        <div className="mt-6 grid gap-3 text-text-secondary">

                            <div className="flex items-center gap-3">
                                <HiOutlineEnvelope size={20} />
                                {user.email}
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <HiOutlinePhone size={20} />
                                    {user.phone}
                                </div>
                            )}

                        </div>

                    </div>
                </div>

            </div>

            <div
                className="
                    mt-8
                    grid
                    gap-5
                    border-t
                    border-border
                    pt-6

                    sm:grid-cols-3
                "
            >

                <div>

                    <p className="text-sm text-text-secondary">
                        {isEn ? "Role" : "الدور"}
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {roleLabel}
                    </h3>

                </div>

                <div>

                    <p className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineCalendarDays />
                        {isEn ? "Join Date" : "تاريخ الانضمام"}
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                              })
                            : "—"}
                    </h3>

                </div>

                <div>

                    <p className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineClock />
                        {isEn ? "Last Active" : "آخر دخول"}
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {user.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString(isEn ? "en-US" : "ar-EG", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                              })
                            : "—"}
                    </h3>

                </div>

            </div>

        </Section>
    );
};

export default ProfileHeroCard;
