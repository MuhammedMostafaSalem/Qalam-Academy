"use client";

import Image from "next/image";
import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlinePencilSquare,
    HiOutlineKey,
    HiOutlineCalendarDays,
    HiOutlineClock,
} from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import Section from "../sections/Section";

const ProfileHeroCard = () => {
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

                {/* Left */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center">

                    <img
                        src="https://i.pravatar.cc/300?img=12"
                        alt="Profile"
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
                                Marwan Salem
                            </h1>

                            <span
                                className="
                                    rounded-full
                                    bg-green-500/10
                                    px-3
                                    py-1
                                    text-sm
                                    font-medium
                                    text-green-500
                                "
                            >
                                Active
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

                            Super Administrator
                        </div>

                        <div className="mt-6 grid gap-3 text-text-secondary">

                            <div className="flex items-center gap-3">
                                <HiOutlineEnvelope size={20} />
                                marwan@company.com
                            </div>

                            <div className="flex items-center gap-3">
                                <HiOutlinePhone size={20} />
                                +20 100 123 4567
                            </div>

                        </div>

                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-3">

                    <button
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2

                            rounded-xl

                            bg-primary

                            px-5
                            py-3

                            text-white

                            transition
                            hover:opacity-90
                        "
                    >
                        <HiOutlinePencilSquare size={20} />
                        تعديل البيانات
                    </button>

                    <button
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2

                            rounded-xl

                            border
                            border-border

                            px-5
                            py-3

                            transition
                            hover:bg-background-alt
                        "
                    >
                        <HiOutlineKey size={20} />
                        تغيير كلمة المرور
                    </button>

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
                        Role
                    </p>

                    <h3 className="mt-1 font-semibold">
                        Super Admin
                    </h3>

                </div>

                <div>

                    <p className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineCalendarDays />
                        Member Since
                    </p>

                    <h3 className="mt-1 font-semibold">
                        15 Jan 2025
                    </h3>

                </div>

                <div>

                    <p className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineClock />
                        Last Login
                    </p>

                    <h3 className="mt-1 font-semibold">
                        Today • 10:45 AM
                    </h3>

                </div>

            </div>

        </Section>
    );
};

export default ProfileHeroCard;