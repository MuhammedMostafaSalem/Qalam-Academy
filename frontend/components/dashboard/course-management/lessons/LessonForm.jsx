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
import { useLanguage } from "@/providers/LanguageProvider";

const LessonForm = ({
    mode = "create",
    lesson,
    courseId,
    courseSlug,
}) => {
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();
    const { language } = useLanguage();

    const isEn = language === "en";
    
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
                    {
                        mode === "create"
                        ? isEn
                            ? "Add New Lesson"
                            : "إضافة درس جديد"
                        : isEn
                            ? "Edit Lesson"
                            : "تعديل الدرس"
                    }
                </h2>
                <p className="mt-2 text-text-secondary">
                    {
                        isEn
                        ? "Manage lesson content and settings"
                        : "إدارة محتوى الدرس وإعداداته"
                    }
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
                    <label className="mb-2 block font-medium">
                        {
                            isEn
                            ? "Lesson Title (Arabic)"
                            : "عنوان الدرس (عربي)"
                        }
                    </label>
                    <input
                        name="titleAr"
                        defaultValue={lesson?._translations?.title?.ar || lesson?.title?.ar || (typeof lesson?.title === "string" ? lesson?.title : "")}
                        placeholder="مثال: مقدمة في React"
                        className="input-style"
                    />
                </div>

                {/* Title (English) */}
                <div>
                    <label className="mb-2 block font-medium">
                        {
                            isEn
                            ? "Lesson Title (English)"
                            : "عنوان الدرس (إنجليزي)"
                        }
                    </label>
                    <input
                        name="titleEn"
                        defaultValue={lesson?._translations?.title?.en || lesson?.title?.en || ""}
                        placeholder="Example: Introduction to React"
                        className="input-style"
                    />
                </div>

                {/* Description (Arabic) */}
                <div>
                    <label className="mb-2 block font-medium">
                        {
                            isEn
                            ? "Lesson Description (Arabic)"
                            : "وصف الدرس (عربي)"
                        }
                    </label>
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
                    <label className="mb-2 block font-medium">
                        {
                            isEn
                            ? "Lesson Description (English)"
                            : "وصف الدرس (إنجليزي)"
                        }
                    </label>
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
                        <label className="mb-2 block font-medium">
                            {
                                isEn
                                ? "Lesson Duration (minutes)"
                                : "مدة الدرس (بالدقائق)"
                            }
                        </label>
                        <input
                            name="duration"
                            type="number"
                            defaultValue={lesson?.duration}
                            placeholder="مثال: 20"
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">
                            {isEn ? "Sort Order" : "الترتيب"}
                        </label>
                        <input
                            name="sortOrder"
                            type="number"
                            defaultValue={lesson?.sortOrder ?? 1}
                            placeholder="1"
                            className="input-style"
                            readOnly
                        />
                    </div>
                </div>

                {/* Video Source Selection (File vs YouTube) */}
                <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineVideoCamera />
                            {
                                isEn
                                ? "Video Source"
                                : "مصدر الفيديو"
                            }
                        </label>
                        <div className="flex gap-2 bg-background p-1 rounded-xl border border-border">
                            <button
                                type="button"
                                onClick={() => setVideoType("file")}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    videoType === "file" ? "bg-primary text-white" : "text-text-secondary"
                                }`}
                            >
                                {isEn ? "Upload File" : "رفع ملف"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setVideoType("youtube")}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    videoType === "youtube" ? "bg-primary text-white" : "text-text-secondary"
                                }`}
                            >
                                {
                                    isEn
                                    ? "YouTube Link"
                                    : "رابط يوتيوب"
                                }
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
                            <p className="mt-1 text-xs text-text-secondary">
                                {
                                    isEn
                                    ? "Choose a video file from your device (MP4, MKV, etc.)"
                                    : "اختر ملف فيديو من جهازك (MP4, MKV, إلخ.)"
                                }
                            </p>
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
                            <p className="mt-1 text-xs text-text-secondary">
                                {
                                    isEn
                                        ? "Paste a direct YouTube video URL"
                                        : "الصق رابط فيديو يوتيوب مباشر"
                                    }
                            </p>
                        </div>
                    )}

                    {lesson?.video && (
                        <p className="text-sm text-text-secondary pt-2 border-t border-border">
                            {
                                isEn
                                ? "Current video:"
                                : "الفيديو الحالي:"
                            }{" "}
                            <a href={lesson.video} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                {
                                    isEn
                                    ? "View current file / link"
                                    : "عرض الرابط / الملف الحالي"
                                }
                            </a>
                        </p>
                    )}
                </div>

                {/* Thumbnail & Attachment Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Thumbnail Upload */}
                    <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-3">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineCloudArrowUp />
                            {
                                isEn
                                ? "Thumbnail - Optional"
                                : "الصورة المصغرة (Thumbnail) - اختياري"
                            }
                        </label>
                        <input
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            className="input-style"
                        />
                        {lesson?.thumbnail && (
                            <p className="text-xs text-text-secondary">
                                {
                                    isEn
                                    ? "Current image:"
                                    : "الصورة الحالية:"
                                }{" "}
                                <a href={lesson.thumbnail} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                    {
                                        isEn
                                        ? "View Image"
                                        : "عرض الصورة"
                                    }
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Attachment Upload */}
                    <div className="p-4 rounded-2xl border border-border bg-background-alt/50 space-y-3">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineDocumentText />
                            {isEn
                                ? "Lesson Attachment - Optional"
                                : "ملف الدرس (Attachment) - اختياري"}
                        </label>
                        <input
                            name="attachment"
                            type="file"
                            accept=".pdf,.zip,.rar,.doc,.docx"
                            className="input-style"
                        />
                        {lesson?.attachment && (
                            <p className="text-xs text-text-secondary">
                                {isEn
                                    ? "Current file:"
                                    : "الملف الحالي:"}{" "}
                                <a href={lesson.attachment} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                    {isEn
                                        ? "Download Attachment"
                                        : "تحميل المرفق"}
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            {isEn ? "Status" : "الحالة"}
                        </label>
                        <select
                            name="isPublished"
                            defaultValue={lesson?.isPublished ? "true" : "false"}
                            className="input-style"
                        >
                            <option value="true">
                                {isEn ? "Published" : "منشور"}
                            </option>
                            <option value="false">
                                {isEn ? "Draft" : "مسودة"}
                            </option>
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
                        <span>
                            {isEn
                                ? "Free Preview Lesson"
                                : "درس مجاني (معاينة)"}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-2xl border border-border px-6 py-3 hover:bg-background-alt"
                    >
                        {isEn ? "Cancel" : "إلغاء"}
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-2xl bg-primary px-6 py-3 text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {isPending
                            ? isEn
                                ? "Saving..."
                                : "جاري الحفظ..."
                            : mode === "create"
                                ? isEn
                                    ? "Save Lesson"
                                    : "حفظ الدرس"
                                : isEn
                                    ? "Update Lesson"
                                    : "تحديث الدرس"}
                    </button>
                </div>
            </form>
        </Section>
    );
};

export default LessonForm;