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
import userIcon from '@/public/assets/user-icon.png';

const roleLabels = {
    admin: "مدير النظام",
    instructor: "مدرس",
    student: "طالب",
};

const ProfileHeroCard = () => {
    const { user } = useAuth();

    if (!user) return null;

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
                                        ? "bg-green-500/10 text-green-500"
                                        : "bg-red-500/10 text-red-500"
                                    }
                                `}
                            >
                                {isActive ? "نشط" : "معطل"}
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
                        الدور
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {roleLabel}
                    </h3>

                </div>

                <div>

                    <p className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineCalendarDays />
                        تاريخ الانضمام
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("ar-EG", {
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
                        آخر دخول
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {user.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString("ar-EG", {
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