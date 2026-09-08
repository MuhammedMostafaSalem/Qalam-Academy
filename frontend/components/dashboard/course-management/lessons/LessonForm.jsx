"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineVideoCamera,
    HiOutlineDocumentText,
    HiOutlineCloudArrowUp,
    HiOutlineLink
} from "react-icons/hi2";
import { useActionState, useEffect, useRef, useState } from "react";
import { createLessonAction, updateLessonAction } from "@/actions/lessonActions";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

const LessonForm = ({
    mode = "create",
    lesson,
    courseId,
    courseSlug,
}) => {
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();
    const formRef = useRef(null);

    // تحديد نوع الفيديو الافتراضي بناءً على البيانات الموجودة
    // const isInitialYoutube = lesson?.video && (lesson.video.includes("youtube.com") || lesson.video.includes("youtu.be"));
    // const [videoType, setVideoType] = useState(isInitialYoutube ? "youtube" : "file");
    const youtubeVal = lesson?.videoYoutube || (lesson?.video && (lesson.video.includes("youtube.com") || lesson.video.includes("youtu.be")) ? lesson.video : "");
    const isInitialYoutube = Boolean(youtubeVal);
    
    const [videoType, setVideoType] = useState(isInitialYoutube ? "youtube" : "file");

    // Bind the action for create/edit
    const boundAction = mode === "create"
        ? createLessonAction
        : updateLessonAction.bind(null, lesson?._id);

    const [state, formAction, isPending] = useActionState(boundAction, {
        success: false,
        message: "",
        errors: null,
    });

    // استخدام useEffect للتحويل وإظهار التوست عند النجاح لتجنب مشاكل الـ Render
    useEffect(() => {
        if (state.success && state.message) {
            successMessage(state.message);
            router.push(`/dashboard/courses/${courseSlug || courseId}`);
            router.refresh();
        } else if (!state.success && state.message) {
            errorMessage(state.message);
        }
    }, [state, courseSlug, courseId, router, successMessage, errorMessage]);

    return (
        <Section className="glass rounded-3xl border border-border p-6">
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    {mode === "create" ? "إضافة درس جديد" : "تعديل الدرس"}
                </h2>
                <p className="mt-2 text-text-secondary">
                    إدارة محتوى الدرس وإعداداته.
                </p>
            </div>

            {!state.success && state.message && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-6">
                {courseId && (
                    <input type="hidden" name="course" value={courseId} />
                )}

                {/* Title (Arabic) */}
                <div>
                    <label className="mb-2 block font-medium">عنوان الدرس (عربي)</label>
                    <input
                        name="titleAr"
                        defaultValue={lesson?._translations?.title?.ar || lesson?.title?.ar || (typeof lesson?.title === "string" ? lesson?.title : "")}
                        placeholder="مثال: مقدمة في React"
                        className="input-style"
                    />
                </div>

                {/* Title (English) */}
                <div>
                    <label className="mb-2 block font-medium">عنوان الدرس (إنجليزي)</label>
                    <input
                        name="titleEn"
                        defaultValue={lesson?._translations?.title?.en || lesson?.title?.en || ""}
                        placeholder="Example: Introduction to React"
                        className="input-style"
                    />
                </div>

                {/* Description (Arabic) */}
                <div>
                    <label className="mb-2 block font-medium">وصف الدرس (عربي)</label>
                    <textarea
                        name="descriptionAr"
                        rows={5}
                        defaultValue={lesson?._translations?.description?.ar || lesson?.description?.ar || (typeof lesson?.description === "string" ? lesson?.description : "")}
                        placeholder="اكتب وصف مختصر للدرس..."
                        className="input-style resize-none"
                    />
                </div>

                {/* Description (English) */}
                <div>
                    <label className="mb-2 block font-medium">وصف الدرس (إنجليزي)</label>
                    <textarea
                        name="descriptionEn"
                        rows={5}
                        defaultValue={lesson?._translations?.description?.en || lesson?.description?.en || ""}
                        placeholder="Write a brief description of the lesson..."
                        className="input-style resize-none"
                    />
                </div>

                {/* Duration + Sort Order */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">مدة الدرس (بالدقائق)</label>
                        <input
                            name="duration"
                            type="number"
                            defaultValue={lesson?.duration}
                            placeholder="مثال: 20"
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">الترتيب</label>
                        <input
                            name="sortOrder"
                            type="number"
                            defaultValue={lesson?.sortOrder ?? 1}
                            placeholder="1"
                            className="input-style"
                        />
                    </div>
                </div>

                {/* Video Source Selection (File vs YouTube) */}
                <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineVideoCamera /> مصدر الفيديو
                        </label>
                        <div className="flex gap-2 bg-background p-1 rounded-xl border border-border">
                            <button
                                type="button"
                                onClick={() => setVideoType("file")}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    videoType === "file" ? "bg-primary text-white" : "text-text-secondary"
                                }`}
                            >
                                رفع ملف
                            </button>
                            <button
                                type="button"
                                onClick={() => setVideoType("youtube")}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    videoType === "youtube" ? "bg-primary text-white" : "text-text-secondary"
                                }`}
                            >
                                رابط يوتيوب
                            </button>
                        </div>
                    </div>

                    {videoType === "file" ? (
                        <div>
                            <input
                                name="video"
                                type="file"
                                accept="video/*"
                                className="input-style"
                            />
                            <p className="mt-1 text-xs text-text-secondary">اختر ملف فيديو من جهازك (MP4, MKV, etc.)</p>
                        </div>
                    ) : (
                        <div>
                            <div className="relative">
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                                    <HiOutlineLink />
                                </span>
                                <input
                                    name="videoYoutube"
                                    type="url"
                                    defaultValue={youtubeVal}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="input-style pr-10"
                                />
                            </div>
                            <p className="mt-1 text-xs text-text-secondary">الصق رابط فيديو يوتيوب مباشر</p>
                        </div>
                    )}

                    {lesson?.video && (
                        <p className="text-sm text-text-secondary pt-2 border-t border-border">
                            الفيديو الحالي:{" "}
                            <a href={lesson.video} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                عرض الرابط / الملف الحالي
                            </a>
                        </p>
                    )}
                </div>

                {/* Thumbnail & Attachment Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Thumbnail Upload */}
                    <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-3">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineCloudArrowUp /> الصورة المصغرة (Thumbnail) - اختياري
                        </label>
                        <input
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            className="input-style"
                        />
                        {lesson?.thumbnail && (
                            <p className="text-xs text-text-secondary">
                                الصورة الحالية:{" "}
                                <a href={lesson.thumbnail} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                    عرض الصورة
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Attachment Upload */}
                    <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-3">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineDocumentText /> ملف الدرس (Attachment) - اختياري
                        </label>
                        <input
                            name="attachment"
                            type="file"
                            accept=".pdf,.zip,.rar,.doc,.docx"
                            className="input-style"
                        />
                        {lesson?.attachment && (
                            <p className="text-xs text-text-secondary">
                                الملف الحالي:{" "}
                                <a href={lesson.attachment} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                    تحميل المرفق
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">الحالة</label>
                        <select
                            name="isPublished"
                            defaultValue={lesson?.isPublished ? "true" : "false"}
                            className="input-style"
                        >
                            <option value="true">منشور</option>
                            <option value="false">مسودة</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                        <input
                            name="isPreview"
                            type="checkbox"
                            defaultChecked={lesson?.isPreview}
                            value="true"
                            className="h-5 w-5 accent-primary"
                        />
                        <span>درس مجاني (معاينة)</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-2xl border border-border px-6 py-3 hover:bg-background-alt"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-2xl bg-primary px-6 py-3 text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {isPending ? "جاري الحفظ..." : mode === "create" ? "حفظ الدرس" : "تحديث الدرس"}
                    </button>
                </div>
            </form>
        </Section>
    );
};

export default LessonForm;