"use client";

import { useEffect, useState, useActionState } from "react";
import { getCourseByIdAction, updateCourseAction } from "@/actions/courseActions";
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

const CourseInfoForm = ({ courseId }) => {
    const [course, setCourse] = useState(null);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const { successMessage, errorMessage } = useToast();

    const boundAction = updateCourseAction.bind(null, courseId);
    const [state, formAction, isPending] = useActionState(boundAction, {
        success: false,
        message: "",
        errors: null,
    });

    useEffect(() => {
        if (!courseId) return;
        getCourseByIdAction(courseId).then((result) => {
            if (result.success) setCourse(result.data);
            setLoadingCourse(false);
        });
    }, [courseId]);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                successMessage(state.message);
            } else {
                errorMessage(state.message);
            }
        }
    }, [state]);

    if (loadingCourse) {
        return <p className="text-text-secondary py-6">جاري تحميل بيانات الكورس...</p>;
    }

    return (
        <form
            action={formAction}
            className="
                grid
                gap-6
            "
        >
            {/* Error message */}
            {!state.success && state.message && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            {/* اسم الكورس (عربي) */}
            <div>
                <label className="mb-2 block font-medium">
                    اسم الكورس (عربي)
                </label>
                <input
                    name="titleAr"
                    type="text"
                    defaultValue={course?.title?.ar || course?.title}
                    className={inputClass}
                />
            </div>

            {/* اسم الكورس (إنجليزي) */}
            <div>
                <label className="mb-2 block font-medium">
                    اسم الكورس (إنجليزي)
                </label>
                <input
                    name="titleEn"
                    type="text"
                    defaultValue={course?.title?.en}
                    className={inputClass}
                />
            </div>

            {/* الوصف (عربي) */}
            <div>
                <label className="mb-2 block font-medium">
                    وصف الكورس (عربي)
                </label>
                <textarea
                    name="descriptionAr"
                    rows={6}
                    defaultValue={course?.description?.ar || course?.description}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* الوصف (إنجليزي) */}
            <div>
                <label className="mb-2 block font-medium">
                    وصف الكورس (إنجليزي)
                </label>
                <textarea
                    name="descriptionEn"
                    rows={6}
                    defaultValue={course?.description?.en}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* السعر */}
            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >
                <div>
                    <label className="mb-2 block font-medium">
                        السعر
                    </label>
                    <input
                        name="price"
                        type="number"
                        defaultValue={course?.price}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        السعر بعد الخصم
                    </label>
                    <input
                        name="discountPrice"
                        type="number"
                        defaultValue={course?.discountPrice}
                        className={inputClass}
                    />
                </div>
            </div>

            {/* المستوى والمدة */}
            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >
                <div>
                    <label className="mb-2 block font-medium">
                        المستوى
                    </label>
                    <select
                        name="level"
                        defaultValue={course?.level || "beginner"}
                        className={inputClass}
                    >
                        <option value="beginner">مبتدئ</option>
                        <option value="intermediate">متوسط</option>
                        <option value="advanced">متقدم</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        مدة الكورس
                    </label>
                    <input
                        name="duration"
                        defaultValue={course?.duration}
                        placeholder="مثال: 28 ساعة"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* صورة الكورس */}
            <div>
                <label className="mb-2 block font-medium">
                    صورة الكورس (Thumbnail)
                </label>
                <input
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className={inputClass}
                />
                {course?.thumbnail && (
                    <img
                        src={course.thumbnail}
                        alt="Current thumbnail"
                        className="mt-2 h-24 w-40 rounded-xl object-cover border border-border"
                    />
                )}
            </div>

            {/* فيديو المعاينة */}
            <div>
                <label className="mb-2 block font-medium">
                    رابط فيديو المعاينة
                </label>
                <input
                    name="previewVideo"
                    defaultValue={course?.previewVideo}
                    placeholder="https://youtube.com/..."
                    className={inputClass}
                />
            </div>

            {/* النشر */}
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <input
                    name="isPublished"
                    type="checkbox"
                    defaultChecked={course?.isPublished}
                    value="true"
                    className="h-5 w-5"
                />
                <span>
                    نشر الكورس
                </span>
            </div>

            {/* زر الحفظ */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="
                        rounded-2xl
                        bg-primary
                        px-6
                        py-3
                        text-white
                        transition
                        hover:opacity-90
                        disabled:opacity-60
                    "
                >
                    {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
            </div>
        </form>
    );
};

export default CourseInfoForm;