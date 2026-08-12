"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createCourseAction } from "@/actions/courseActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import { getInstructorsAction } from "@/actions/userActions";
import useToast from "@/hooks/useToast";

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
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();

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
            getCategoriesAction("limit=100"),
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

        successMessage(state.message || "تم إنشاء الكورس بنجاح");
        router.replace(`/dashboard/courses/${state.course._id}`);
    }, [state, router, successMessage]);

    useEffect(() => {
        if (state.success || !state.message) return;

        errorMessage(state.message);
    }, [state, errorMessage]);

    if (loadingOptions) {
        return <p className="text-text-secondary py-6">جاري تحميل البيانات...</p>;
    }

    return (
        <form
            action={formAction}
            className="grid gap-6"
        >
            {/* الأخطاء */}
            {!state.success && state.message && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            {/* الاسم */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>اسم الكورس (عربي)</label>
                    <input name="titleAr" type="text" required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>اسم الكورس (إنجليزي)</label>
                    <input name="titleEn" type="text" required className={inputClass} />
                </div>
            </div>

            {/* الوصف */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>وصف الكورس (عربي)</label>
                    <textarea name="descriptionAr" rows={5} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>وصف الكورس (إنجليزي)</label>
                    <textarea name="descriptionEn" rows={5} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            {/* التصنيف والمدرب */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>التصنيف</label>
                    <select name="category" required className={inputClass} defaultValue="">
                        <option value="" disabled>اختر التصنيف</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title?.ar || category.title?.en || category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>المدرب</label>
                    <select name="instructor" required className={inputClass} defaultValue="">
                        <option value="" disabled>اختر المدرب</option>
                        {instructors.map((instructor) => (
                            <option key={instructor._id} value={instructor._id}>
                                {instructor.firstName} {instructor.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* المستوى واللغة */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>المستوى</label>
                    <select name="level" defaultValue="beginner" className={inputClass}>
                        <option value="beginner">مبتدئ</option>
                        <option value="intermediate">متوسط</option>
                        <option value="advanced">متقدم</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>لغة الكورس</label>
                    <select name="language" defaultValue="arabic" className={inputClass}>
                        <option value="arabic">العربية</option>
                        <option value="english">English</option>
                    </select>
                </div>
            </div>

            {/* السعر */}
            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className={labelClass}>السعر</label>
                    <input name="price" type="number" min="0" required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>السعر بعد الخصم</label>
                    <input name="discountPrice" type="number" min="0" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>المدة (بالدقائق)</label>
                    <input name="duration" type="number" min="0" className={inputClass} />
                </div>
            </div>

            {/* المتطلبات والأهداف والكلمات المفتاحية */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>المتطلبات (افصل بينها بفاصلة ,)</label>
                    <textarea name="requirements" rows={3} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>الأهداف (افصل بينها بفاصلة ,)</label>
                    <textarea name="objectives" rows={3} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            <div>
                <label className={labelClass}>الكلمات المفتاحية / Tags (افصل بينها بفاصلة ,)</label>
                <textarea name="tags" rows={2} required className={`${inputClass} resize-none`} />
            </div>

            {/* صورة الكورس */}
            <div>
                <label className={labelClass}>صورة الكورس (Thumbnail)</label>
                <input name="thumbnail" type="file" accept="image/*" className={inputClass} />
            </div>

            {/* زر الحفظ */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/courses")}
                    className="rounded-2xl border border-border px-6 py-3 transition hover:bg-background"
                >
                    إلغاء
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="gradient-button rounded-2xl px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-60"
                >
                    {isPending ? "جاري الإنشاء..." : "إنشاء الكورس"}
                </button>
            </div>
        </form>
    );
};

export default CreateCourseForm;
