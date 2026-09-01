"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createCourseAction } from "@/actions/courseActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import { getInstructorsAction } from "@/actions/userActions";
import { useAuth } from "@/providers/AuthProvider";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const inputClass = `
    w-full
    rounded-2xl
    border
    border-border
    bg-background
    px-4
    py-3
    outline-none
    transition
    focus:border-primary
`;

const labelClass = "mb-2 block font-medium text-text-secondary text-sm";

const CreateCourseForm = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const router = useRouter();
    const { user } = useAuth();
    const { successMessage, errorMessage } = useToast();
    const isInstructor = user?.role === "instructor";

    const [categories, setCategories] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const [state, formAction, isPending] = useActionState(createCourseAction, {
        success: false,
        course: null,
        message: "",
        errors: null,
    });

    useEffect(() => {
        let mounted = true;

        Promise.all([
            getCategoriesAction("type=course&limit=100"),
            getInstructorsAction("limit=100"),
        ]).then(([categoriesRes, instructorsRes]) => {
            if (!mounted) return;

            if (categoriesRes.success) {
                const list = categoriesRes.data?.categories || categoriesRes.data?.documents || categoriesRes.data || [];
                setCategories(list);
            }

            if (instructorsRes.success) {
                const list = instructorsRes.data?.users || instructorsRes.data?.documents || instructorsRes.data || [];
                setInstructors(list);
            }

            setLoadingOptions(false);
        });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!state.success || !state.course) return;

        successMessage(state.message || (isEn ? "Course created successfully" : "تم إنشاء الكورس بنجاح"));
        router.replace(`/dashboard/courses/${state.course.slug || state.course._id}`);
    }, [state, router, successMessage, isEn]);

    useEffect(() => {
        if (state.success || !state.message) return;

        errorMessage(state.message);
    }, [state, errorMessage]);

    if (loadingOptions) {
        return <p className="text-text-secondary py-6">{isEn ? "Loading options..." : "جاري تحميل البيانات..."}</p>;
    }

    return (
        <form
            action={formAction}
            className="grid gap-6"
        >
            {/* Errors */}
            {!state.success && state.message && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            {/* Title */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>{isEn ? "Course Title (Arabic)" : "اسم الكورس (عربي)"}</label>
                    <input name="titleAr" type="text" required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Course Title (English)" : "اسم الكورس (إنجليزي)"}</label>
                    <input name="titleEn" type="text" required className={inputClass} />
                </div>
            </div>

            {/* Description */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>{isEn ? "Course Description (Arabic)" : "وصف الكورس (عربي)"}</label>
                    <textarea name="descriptionAr" rows={5} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Course Description (English)" : "وصف الكورس (إنجليزي)"}</label>
                    <textarea name="descriptionEn" rows={5} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            {/* Category & Instructor */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>{isEn ? "Category" : "التصنيف"}</label>
                    <select name="category" required className={inputClass} defaultValue="">
                        <option value="" disabled>{isEn ? "Select category" : "اختر التصنيف"}</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {localize(category.title)}
                            </option>
                        ))}
                    </select>
                </div>
                {isInstructor ? (
                    <div>
                        <label className={labelClass}>{isEn ? "Instructor" : "المدرب"}</label>
                        <input
                            type="text"
                            disabled
                            value={`${user?.firstName || ""} ${user?.lastName || ""}`}
                            className={`${inputClass} bg-background/50 cursor-not-allowed`}
                        />
                        <input type="hidden" name="instructor" value={user?._id || user?.id || ""} />
                    </div>
                ) : (
                    <div>
                        <label className={labelClass}>{isEn ? "Instructor" : "المدرب"}</label>
                        <select name="instructor" required className={inputClass} defaultValue="">
                            <option value="" disabled>{isEn ? "Select instructor" : "اختر المدرب"}</option>
                            {instructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.firstName} {instructor.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Level & Language */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>{isEn ? "Level" : "المستوى"}</label>
                    <select name="level" defaultValue="beginner" className={inputClass}>
                        <option value="beginner">{isEn ? "Beginner" : "مبتدئ"}</option>
                        <option value="intermediate">{isEn ? "Intermediate" : "متوسط"}</option>
                        <option value="advanced">{isEn ? "Advanced" : "متقدم"}</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Course Language" : "لغة الكورس"}</label>
                    <select name="language" defaultValue="arabic" className={inputClass}>
                        <option value="arabic">{isEn ? "Arabic" : "العربية"}</option>
                        <option value="english">{isEn ? "English" : "English"}</option>
                    </select>
                </div>
            </div>

            {/* Price & Duration */}
            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className={labelClass}>{isEn ? "Price (EGP)" : "السعر"}</label>
                    <input name="price" type="number" min="0" required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Discount Price (EGP)" : "السعر بعد الخصم"}</label>
                    <input name="discountPrice" type="number" min="0" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Duration (Hours)" : "المدة (بالساعات)"}</label>
                    <input name="duration" type="number" min="0" step="any" placeholder={isEn ? "e.g. 24" : "مثال: 24"} className={inputClass} />
                </div>
            </div>

            {/* Requirements & Objectives */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>{isEn ? "Requirements (comma separated ,)" : "المتطلبات (افصل بينها بفاصلة ,)"}</label>
                    <textarea name="requirements" rows={3} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>{isEn ? "Objectives (comma separated ,)" : "الأهداف (افصل بينها بفاصلة ,)"}</label>
                    <textarea name="objectives" rows={3} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            <div>
                <label className={labelClass}>{isEn ? "Tags / Keywords (comma separated ,)" : "الكلمات المفتاحية / Tags (افصل بينها بفاصلة ,)"}</label>
                <textarea name="tags" rows={2} required className={`${inputClass} resize-none`} />
            </div>

            {/* Thumbnail */}
            <div>
                <label className={labelClass}>{isEn ? "Course Thumbnail" : "صورة الكورس (Thumbnail)"}</label>
                <input name="thumbnail" type="file" accept="image/*" className={inputClass} />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/courses")}
                    className="rounded-2xl border border-border px-6 py-3 transition hover:bg-background"
                >
                    {isEn ? "Cancel" : "إلغاء"}
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="gradient-button rounded-2xl px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-60"
                >
                    {isPending ? (isEn ? "Creating..." : "جاري الإنشاء...") : (isEn ? "Create Course" : "إنشاء الكورس")}
                </button>
            </div>
        </form>
    );
};

export default CreateCourseForm;
