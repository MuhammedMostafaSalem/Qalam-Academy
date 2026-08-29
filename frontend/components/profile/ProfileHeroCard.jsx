"use client";

import { useEffect, useRef, useState } from "react";
import {
    HiOutlineCamera,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineXMark,
} from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import Section from "../sections/Section";
import { useLanguage } from "@/providers/LanguageProvider";
import useProfile from "@/hooks/profile/useProfile";
import useToast from "@/hooks/useToast";
import { resolveAvatarUrl } from "@/constants/avatar";

const ProfileHeroCard = () => {
    const { user, loadingProfile, handleUpdateProfile } = useProfile();
    const { errorMessage } = useToast();
    const { language } = useLanguage();
    const isEn = language === "en";
    const inputRef = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    if (!user) return null;

    const resetAvatarSelection = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleAvatarSelection = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            errorMessage(isEn ? "Please select an image file" : "يرجى اختيار ملف صورة");
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            errorMessage(isEn ? "The profile image must be 5 MB or smaller" : "يجب ألا يتجاوز حجم صورة الملف الشخصي 5 ميجابايت");
            event.target.value = "";
            return;
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleAvatarUpload = async () => {
        if (!avatarFile) return;

        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const result = await handleUpdateProfile(formData);

        if (result?.success) resetAvatarSelection();
    };

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

                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <img
                                src={avatarPreview || resolveAvatarUrl(user.avatar)}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={120}
                                height={120}
                                className="h-[120px] w-[120px] rounded-3xl border border-border object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                disabled={loadingProfile}
                                aria-label={isEn ? "Choose profile image" : "اختيار صورة الملف الشخصي"}
                                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-primary text-white shadow-lg transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 rtl:-left-2 rtl:right-auto"
                            >
                                <HiOutlineCamera size={21} />
                            </button>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                onChange={handleAvatarSelection}
                                className="sr-only"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={loadingProfile}
                            className="text-sm font-semibold text-primary hover:underline disabled:opacity-60"
                        >
                            {isEn ? "Change photo" : "تغيير الصورة"}
                        </button>

                        {avatarFile && (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleAvatarUpload}
                                    disabled={loadingProfile}
                                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                                >
                                    {loadingProfile
                                        ? (isEn ? "Uploading..." : "جاري الرفع...")
                                        : (isEn ? "Save photo" : "حفظ الصورة")}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetAvatarSelection}
                                    disabled={loadingProfile}
                                    aria-label={isEn ? "Cancel image selection" : "إلغاء اختيار الصورة"}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-secondary hover:bg-background-alt disabled:opacity-60"
                                >
                                    <HiOutlineXMark size={18} />
                                </button>
                            </div>
                        )}
                    </div>

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
