"use client";

import Image from "next/image";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";

const ProfileHeader = () => {
    return (
        <div
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                mb-6
            "
        >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* User */}
                <div className="flex items-center gap-5">
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Profile"
                        width={90}
                        height={90}
                        className="rounded-2xl object-cover"
                    />

                    <div>
                        <h1 className="text-2xl font-bold">
                            Marwan Salem
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                            <span className="flex items-center gap-2">
                                <LuShieldCheck />
                                Super Admin
                            </span>

                            <span className="flex items-center gap-2">
                                <HiOutlineEnvelope />
                                marwan@example.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-start gap-3 lg:items-end">
                    <span
                        className="
                            rounded-full
                            bg-green-500/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-green-500
                        "
                    >
                        Active
                    </span>

                    <div className="text-sm text-text-secondary">
                        آخر تسجيل دخول
                    </div>

                    <div className="font-medium">
                        Today, 10:45 AM
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;