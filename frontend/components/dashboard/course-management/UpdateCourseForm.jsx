"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateCourseAction, getCourseByIdAction } from "@/actions/courseActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import { getInstructorsAction } from "@/actions/userActions";
import { useAuth } from "@/providers/AuthProvider";
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

const UpdateCourseForm = ({ courseId }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { successMessage, errorMessage } = useToast();
    const isInstructor = user?.role === "instructor";

    const [categories, setCategories] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courseData, setCourseData] = useState(null);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const updateCourseWithId = updateCourseAction.bind(null, courseId);
    
    const [state, formAction, isPending] = useActionState(updateCourseWithId, {
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
            getCourseByIdAction(courseId),
        ]).then(([categoriesRes, instructorsRes, courseRes]) => {
            if (!mounted) return;

            if (categoriesRes.success) {
                const list = categoriesRes.data?.categories || categoriesRes.data?.documents || categoriesRes.data || [];
                setCategories(list);
            }

            if (instructorsRes.success) {
                const list = instructorsRes.data?.users || instructorsRes.data?.documents || instructorsRes.data || [];
                setInstructors(list);
            }

            if (courseRes.success) {
                setCourseData(courseRes.data);
            }

            setLoadingOptions(false);
        });

        return () => {
            mounted = false;
        };
    }, [courseId]);

    useEffect(() => {
        if (!state.success || !state.course) return;

        successMessage(state.message || "تم تحديث الكورس بنجاح");
        router.push("/dashboard/courses");
    }, [state, router, successMessage]);

    useEffect(() => {
        if (state.success || !state.message) return;

        errorMessage(state.message);
    }, [state, errorMessage]);

    if (loadingOptions) {
        return <p className="text-text-secondary py-6">جاري تحميل البيانات...</p>;
    }

    if (!courseData) {
        return <p className="text-error py-6">تعذر تحميل بيانات الكورس</p>;
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
                    <input name="titleAr" type="text" defaultValue={courseData.title?.ar || courseData.title || ""} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>اسم الكورس (إنجليزي)</label>
                    <input name="titleEn" type="text" defaultValue={courseData.title?.en || ""} required className={inputClass} />
                </div>
            </div>

            {/* الوصف */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>وصف الكورس (عربي)</label>
                    <textarea name="descriptionAr" rows={5} defaultValue={courseData.description?.ar || courseData.description || ""} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>وصف الكورس (إنجليزي)</label>
                    <textarea name="descriptionEn" rows={5} defaultValue={courseData.description?.en || ""} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            {/* التصنيف والمدرب */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>التصنيف</label>
                    <select name="category" required className={inputClass} defaultValue={courseData.category?._id || courseData.category || ""}>
                        <option value="" disabled>اختر التصنيف</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title?.ar || category.title?.en || category.title}
                            </option>
                        ))}
                    </select>
                </div>
                {isInstructor ? (
                    <div>
                        <label className={labelClass}>المدرب</label>
                        <input
                            type="text"
                            disabled
                            value={`${courseData.instructor?.firstName || user?.firstName || ""} ${courseData.instructor?.lastName || user?.lastName || ""}`}
                            className={`${inputClass} bg-background/50 cursor-not-allowed`}
                        />
                        <input type="hidden" name="instructor" value={courseData.instructor?._id || courseData.instructor || user?._id || user?.id || ""} />
                    </div>
                ) : (
                    <div>
                        <label className={labelClass}>المدرب</label>
                        <select name="instructor" required className={inputClass} defaultValue={courseData.instructor?._id || courseData.instructor || ""}>
                            <option value="" disabled>اختر المدرب</option>
                            {instructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.firstName} {instructor.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* المستوى واللغة */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>المستوى</label>
                    <select name="level" defaultValue={courseData.level || "beginner"} className={inputClass}>
                        <option value="beginner">مبتدئ</option>
                        <option value="intermediate">متوسط</option>
                        <option value="advanced">متقدم</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>لغة الكورس</label>
                    <select name="language" defaultValue={courseData.language || "arabic"} className={inputClass}>
                        <option value="arabic">العربية</option>
                        <option value="english">English</option>
                    </select>
                </div>
            </div>

            {/* السعر */}
            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className={labelClass}>السعر</label>
                    <input name="price" type="number" min="0" defaultValue={courseData.price || 0} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>السعر بعد الخصم</label>
                    <input name="discountPrice" type="number" min="0" defaultValue={courseData.discountPrice || 0} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>المدة (بالدقائق)</label>
                    <input name="duration" type="number" min="0" defaultValue={courseData.duration || 0} className={inputClass} />
                </div>
            </div>

            {/* المتطلبات والأهداف والكلمات المفتاحية */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>المتطلبات (افصل بينها بفاصلة ,)</label>
                    <textarea name="requirements" rows={3} defaultValue={courseData.requirements?.join(",") || ""} required className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>الأهداف (افصل بينها بفاصلة ,)</label>
                    <textarea name="objectives" rows={3} defaultValue={courseData.objectives?.join(",") || ""} required className={`${inputClass} resize-none`} />
                </div>
            </div>

            <div>
                <label className={labelClass}>الكلمات المفتاحية / Tags (افصل بينها بفاصلة ,)</label>
                <textarea name="tags" rows={2} defaultValue={courseData.tags?.join(",") || ""} required className={`${inputClass} resize-none`} />
            </div>

            {/* حالة الكورس */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>حالة النشر</label>
                    <select name="isPublished" defaultValue={courseData.isPublished?.toString()} className={inputClass}>
                        <option value="true">منشور</option>
                        <option value="false">مسودة</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>كورس مميز؟</label>
                    <select name="isFeatured" defaultValue={courseData.isFeatured?.toString()} className={inputClass}>
                        <option value="true">نعم</option>
                        <option value="false">لا</option>
                    </select>
                </div>
            </div>

            {/* صورة الكورس */}
            <div>
                <label className={labelClass}>صورة الكورس (Thumbnail) - اتركها فارغة إذا لم ترد التغيير</label>
                <input name="thumbnail" type="file" accept="image/*" className={inputClass} />
                {courseData.thumbnail && (
                    <div className="mt-2 text-sm text-text-secondary flex items-center gap-2">
                        <img src={courseData.thumbnail} alt="thumbnail" className="h-10 w-10 rounded object-cover" />
                        صورة الكورس الحالية
                    </div>
                )}
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
                    {isPending ? "جاري التحديث..." : "حفظ التعديلات"}
                </button>
            </div>
        </form>
    );
};

export default UpdateCourseForm;
