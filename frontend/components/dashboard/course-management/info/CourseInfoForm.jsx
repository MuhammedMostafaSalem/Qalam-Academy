"use client";

import { useEffect, useState, useActionState } from "react";
import { getCourseByIdAction, updateCourseAction } from "@/actions/courseActions";
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

const CourseInfoForm = ({ courseId }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

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
                successMessage(state.message || (isEn ? "Course updated successfully" : "تم تحديث الكورس بنجاح"));
            } else {
                errorMessage(state.message || (isEn ? "Failed to update course" : "فشل تحديث الكورس"));
            }
        }
    }, [state, isEn]);

    if (loadingCourse) {
        return <p className="text-text-secondary py-6">{isEn ? "Loading course information..." : "جاري تحميل بيانات الكورس..."}</p>;
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
                    {isEn ? "Course Title (Arabic)" : "اسم الكورس (عربي)"}
                </label>
                <input
                    name="titleAr"
                    type="text"
                    defaultValue={course?._translations?.title?.ar || course?.title?.ar || (typeof course?.title === "string" ? course?.title : "")}
                    className={inputClass}
                />
            </div>

            {/* اسم الكورس (إنجليزي) */}
            <div>
                <label className="mb-2 block font-medium">
                    {isEn ? "Course Title (English)" : "اسم الكورس (إنجليزي)"}
                </label>
                <input
                    name="titleEn"
                    type="text"
                    defaultValue={course?._translations?.title?.en || course?.title?.en || ""}
                    className={inputClass}
                />
            </div>

            {/* الوصف (عربي) */}
            <div>
                <label className="mb-2 block font-medium">
                    {isEn ? "Course Description (Arabic)" : "وصف الكورس (عربي)"}
                </label>
                <textarea
                    name="descriptionAr"
                    rows={6}
                    defaultValue={course?._translations?.description?.ar || course?.description?.ar || (typeof course?.description === "string" ? course?.description : "")}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* الوصف (إنجليزي) */}
            <div>
                <label className="mb-2 block font-medium">
                    {isEn ? "Course Description (English)" : "وصف الكورس (إنجليزي)"}
                </label>
                <textarea
                    name="descriptionEn"
                    rows={6}
                    defaultValue={course?._translations?.description?.en || course?.description?.en || ""}
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
                        {isEn ? "Price (EGP)" : "السعر"}
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
                        {isEn ? "Discount Price (EGP)" : "السعر بعد الخصم"}
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
                        {isEn ? "Level" : "المستوى"}
                    </label>
                    <select
                        name="level"
                        defaultValue={course?.level || "beginner"}
                        className={inputClass}
                    >
                        <option value="beginner">{isEn ? "Beginner" : "مبتدئ"}</option>
                        <option value="intermediate">{isEn ? "Intermediate" : "متوسط"}</option>
                        <option value="advanced">{isEn ? "Advanced" : "متقدم"}</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        {isEn ? "Course Duration (Hours)" : "مدة الكورس (بالساعات)"}
                    </label>
                    <input
                        name="duration"
                        type="number"
                        min="0"
                        step="any"
                        defaultValue={course?.duration}
                        placeholder={isEn ? "e.g. 28" : "مثال: 28"}
                        className={inputClass}
                    />
                </div>
            </div>

            {/* صورة الكورس */}
            <div>
                <label className="mb-2 block font-medium">
                    {isEn ? "Course Thumbnail" : "صورة الكورس (Thumbnail)"}
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
                    {isEn ? "Preview Video URL" : "رابط فيديو المعاينة"}
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
                    {isEn ? "Publish Course" : "نشر الكورس"}
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
                    {isPending ? (isEn ? "Saving..." : "جاري الحفظ...") : (isEn ? "Save Changes" : "حفظ التعديلات")}
                </button>
            </div>
        </form>
    );
};

export default CourseInfoForm;