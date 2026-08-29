"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineVideoCamera,
    HiOutlineDocumentText,
    HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import { useActionState, useRef } from "react";
import { createLessonAction, updateLessonAction } from "@/actions/lessonActions";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

const LessonForm = ({
    mode = "create",
    lesson,
    courseId,
}) => {
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();
    const formRef = useRef(null);

    // Bind the action for create/edit
    const boundAction = mode === "create"
        ? createLessonAction
        : updateLessonAction.bind(null, lesson?._id);

    const [state, formAction, isPending] = useActionState(boundAction, {
        success: false,
        message: "",
        errors: null,
    });

    // On success, redirect back to the course page
    if (state.success && state.message) {
        successMessage(state.message);
        router.push(`/dashboard/courses/${courseId}`);
    }

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
            {/* Header */}
            <div className="mb-8">
                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >
                    {
                        mode === "create"
                            ?
                            "إضافة درس جديد"
                            :
                            "تعديل الدرس"
                    }
                </h2>
                <p
                    className="
                        mt-2
                        text-text-secondary
                    "
                >
                    إدارة محتوى الدرس وإعداداته.
                </p>
            </div>

            {/* Error message */}
            {!state.success && state.message && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            <form
                ref={formRef}
                action={formAction}
                className="
                    space-y-6
                "
            >
                {/* Hidden courseId */}
                {courseId && (
                    <input type="hidden" name="course" value={courseId} />
                )}

                {/* Title (Arabic) */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        عنوان الدرس (عربي)
                    </label>
                    <input
                        name="titleAr"
                        defaultValue={lesson?._translations?.title?.ar || lesson?.title?.ar || (typeof lesson?.title === "string" ? lesson?.title : "")}
                        placeholder="مثال: مقدمة في React"
                        className="
                            input-style
                        "
                    />
                </div>

                {/* Title (English) */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        عنوان الدرس (إنجليزي)
                    </label>
                    <input
                        name="titleEn"
                        defaultValue={lesson?._translations?.title?.en || lesson?.title?.en || ""}
                        placeholder="Example: Introduction to React"
                        className="
                            input-style
                        "
                    />
                </div>

                {/* Description (Arabic) */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        وصف الدرس (عربي)
                    </label>
                    <textarea
                        name="descriptionAr"
                        rows={5}
                        defaultValue={lesson?._translations?.description?.ar || lesson?.description?.ar || (typeof lesson?.description === "string" ? lesson?.description : "")}
                        placeholder="اكتب وصف مختصر للدرس..."
                        className="
                            input-style
                            resize-none
                        "
                    />
                </div>

                {/* Description (English) */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        وصف الدرس (إنجليزي)
                    </label>
                    <textarea
                        name="descriptionEn"
                        rows={5}
                        defaultValue={lesson?._translations?.description?.en || lesson?.description?.en || ""}
                        placeholder="Write a brief description of the lesson..."
                        className="
                            input-style
                            resize-none
                        "
                    />
                </div>

                {/* Duration + Sort Order */}
                <div
                    className="
                        grid
                        gap-6

                        md:grid-cols-2
                    "
                >
                    {/* Duration */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            مدة الدرس
                        </label>
                        <input
                            name="duration"
                            defaultValue={lesson?.duration}
                            placeholder="مثال: 20:30"
                            className="
                                input-style
                            "
                        />
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            الترتيب
                        </label>
                        <input
                            name="sortOrder"
                            type="number"
                            defaultValue={lesson?.sortOrder ?? 1}
                            placeholder="1"
                            className="
                                input-style
                            "
                        />
                    </div>
                </div>

                {/* Video Upload */}
                <div>
                    <label
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2

                            font-medium
                        "
                    >

                        <HiOutlineVideoCamera />

                        ملف الفيديو

                    </label>
                    <input
                        name="video"
                        type="file"
                        accept="video/*"
                        className="
                            input-style
                        "
                    />
                    {lesson?.videoUrl && (
                        <p className="mt-1 text-sm text-text-secondary">
                            الفيديو الحالي: <a href={lesson.videoUrl} target="_blank" className="text-primary underline">عرض</a>
                        </p>
                    )}
                </div>

                {/* Settings */}
                <div
                    className="
                        grid
                        gap-6

                        md:grid-cols-2
                    "
                >
                    {/* Status */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            الحالة
                        </label>
                        <select
                            name="isPublished"
                            defaultValue={lesson?.isPublished ? "true" : "false"}
                            className="
                                input-style
                            "
                        >
                            <option value="true">منشور</option>
                            <option value="false">مسودة</option>
                        </select>
                    </div>

                    {/* Preview / Free */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3

                            mt-8
                        "
                    >
                        <input
                            name="isPreview"
                            type="checkbox"
                            defaultChecked={lesson?.isPreview}
                            value="true"
                            className="
                                h-5
                                w-5
                            "
                        />
                        <span>
                            درس مجاني (معاينة)
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex
                        justify-end
                        gap-3
                    "
                >
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="
                            rounded-2xl
                            border
                            border-border

                            px-6
                            py-3

                            hover:bg-background-alt
                        "
                    >
                        إلغاء
                    </button>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="
                            rounded-2xl

                            bg-primary

                            px-6
                            py-3

                            text-white

                            hover:opacity-90
                            disabled:opacity-60
                        "
                    >
                        {isPending
                            ? "جاري الحفظ..."
                            : mode === "create"
                                ? "حفظ الدرس"
                                : "تحديث الدرس"
                        }
                    </button>
                </div>
            </form>
        </Section>
    );
};


export default LessonForm;