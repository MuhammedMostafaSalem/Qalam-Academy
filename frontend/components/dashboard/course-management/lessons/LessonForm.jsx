
"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineVideoCamera,
    HiOutlineDocumentText,
    HiOutlineCloudArrowUp,
    HiOutlineLink,
} from "react-icons/hi2";
import {
    useActionState,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    createLessonAction,
    updateLessonAction,
} from "@/actions/lessonActions";
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

    // ----------------------------------------
    // Initial video source
    // ----------------------------------------

    const youtubeVal =
        lesson?.videoYoutube ||
        (
            lesson?.video &&
            (
                lesson.video.includes("youtube.com") ||
                lesson.video.includes("youtu.be")
            )
                ? lesson.video
                : ""
        );

    const isInitialYoutube = Boolean(youtubeVal);

    // ----------------------------------------
    // Lesson content type
    // ----------------------------------------

    const [contentType, setContentType] = useState(
        lesson?.contentType || "video"
    );

    const [videoType, setVideoType] = useState(
        isInitialYoutube ? "youtube" : "file"
    );

    // ----------------------------------------
    // Learning Points
    // ----------------------------------------

    const [learningPoints, setLearningPoints] = useState(() => {
        const points =
            lesson?._translations?.learningPoints ??
            lesson?.learningPoints;

        if (!Array.isArray(points) || points.length === 0) {
            return [{ ar: "", en: "" }];
        }

        return points.map((point) => ({
            ar:
                typeof point === "object" && point !== null
                    ? point.ar || ""
                    : "",
            en:
                typeof point === "object" && point !== null
                    ? point.en || ""
                    : "",
        }));
    });

    const handleLearningPointChange = (index, field, value) => {
        setLearningPoints((prev) =>
            prev.map((point, pointIndex) =>
                pointIndex === index
                    ? { ...point, [field]: value }
                    : point
            )
        );
    };

    const addLearningPoint = () => {
        setLearningPoints((prev) => [
            ...prev,
            { ar: "", en: "" },
        ]);
    };

    const removeLearningPoint = (index) => {
        setLearningPoints((prev) =>
            prev.filter((_, pointIndex) => pointIndex !== index)
        );
    };

    // ----------------------------------------
    // Server action
    // ----------------------------------------

    const boundAction =
        mode === "create"
            ? createLessonAction
            : updateLessonAction.bind(null, lesson?._id);

    const [state, formAction, isPending] = useActionState(
        boundAction,
        {
            success: false,
            message: "",
            errors: null,
        }
    );

    // ----------------------------------------
    // Handle success / error
    // ----------------------------------------

    useEffect(() => {
        if (state.success && state.message) {
            successMessage(state.message);

            router.push(
                `/dashboard/courses/${courseSlug || courseId}`
            );

            router.refresh();
        } else if (!state.success && state.message) {
            errorMessage(state.message);
        }
    }, [
        state,
        courseSlug,
        courseId,
        router,
        successMessage,
        errorMessage,
    ]);

    // ----------------------------------------
    // Localized labels
    // ----------------------------------------

    const text = {
        lessonType: isEn ? "Lesson Type" : "نوع الدرس",
        videoLesson: isEn ? "Video Lesson" : "درس فيديو",
        textLesson: isEn ? "Text Lesson" : "درس نصي",

        videoSource: isEn ? "Video Source" : "مصدر الفيديو",
        uploadFile: isEn ? "Upload File" : "رفع ملف",
        youtubeLink: isEn ? "YouTube Link" : "رابط يوتيوب",

        textContent: isEn ? "Lesson Content" : "محتوى الدرس",
        contentArabic: isEn
            ? "Lesson Content (Arabic)"
            : "محتوى الدرس (عربي)",
        contentEnglish: isEn
            ? "Lesson Content (English)"
            : "محتوى الدرس (إنجليزي)",

        contentArabicPlaceholder: isEn
            ? "Write the lesson content in Arabic..."
            : "اكتب محتوى الدرس باللغة العربية...",

        contentEnglishPlaceholder: isEn
            ? "Write the lesson content in English..."
            : "Write the lesson content in English...",

        contentHint: isEn
            ? "Provide the content in at least one language."
            : "أدخل محتوى الدرس بلغة واحدة على الأقل.",

        videoRequired: isEn
            ? "Choose a video file or provide a YouTube URL."
            : "اختر ملف فيديو أو أدخل رابط YouTube.",

        currentVideo: isEn ? "Current video:" : "الفيديو الحالي:",
        viewCurrentVideo: isEn
            ? "View current file / link"
            : "عرض الرابط / الملف الحالي",

        currentImage: isEn ? "Current image:" : "الصورة الحالية:",
        viewImage: isEn ? "View Image" : "عرض الصورة",

        currentFile: isEn ? "Current file:" : "الملف الحالي:",
        downloadAttachment: isEn
            ? "Download Attachment"
            : "تحميل المرفق",

        // Learning Points
        learningPoints: isEn
            ? "Learning Points"
            : "نقاط التعلّم",

        learningPointsDescription: isEn
            ? "Add the key concepts students will learn in this lesson."
            : "أضف أهم المفاهيم التي سيتعلمها الطالب في هذا الدرس.",

        learningPoint: isEn
            ? "Learning Point"
            : "نقطة تعلّم",

        arabicPoint: isEn
            ? "Learning Point (Arabic)"
            : "نقطة التعلّم (عربي)",

        englishPoint: isEn
            ? "Learning Point (English)"
            : "نقطة التعلّم (إنجليزي)",

        arabicPointPlaceholder: isEn
            ? "Enter the learning point in Arabic..."
            : "اكتب نقطة التعلّم باللغة العربية...",

        englishPointPlaceholder: isEn
            ? "Enter the learning point in English..."
            : "Enter the learning point in English...",

        addLearningPoint: isEn
            ? "Add Learning Point"
            : "إضافة نقطة تعلّم",

        removeLearningPoint: isEn
            ? "Remove"
            : "حذف",
    };
console.log(lesson)
    return (
        <Section className="glass rounded-3xl border border-border p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    {mode === "create"
                        ? isEn
                            ? "Add New Lesson"
                            : "إضافة درس جديد"
                        : isEn
                            ? "Edit Lesson"
                            : "تعديل الدرس"}
                </h2>

                <p className="mt-2 text-text-secondary">
                    {isEn
                        ? "Manage lesson content and settings"
                        : "إدارة محتوى الدرس وإعداداته"}
                </p>
            </div>

            {/* Error message */}
            {!state.success && state.message && (
                <div className="mb-6 rounded-xl border border-error/20 bg-error/10 p-4 text-error">
                    {state.message}
                </div>
            )}

            <form
                ref={formRef}
                action={formAction}
                className="space-y-6"
            >
                {/* Course */}
                {courseId && (
                    <input
                        type="hidden"
                        name="course"
                        value={courseId}
                    />
                )}

                {/* Lesson content type */}
                <div className="space-y-3 rounded-2xl border border-border bg-background-alt/50 p-4">
                    <label className="block font-medium">
                        {text.lessonType}
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => setContentType("video")}
                            aria-pressed={contentType === "video"}
                            className={`flex items-center justify-center gap-3 rounded-xl border p-4 transition-all ${
                                contentType === "video"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-text-secondary hover:bg-background-alt"
                            }`}
                        >
                            <HiOutlineVideoCamera className="text-xl" />

                            <span className="font-medium">
                                {text.videoLesson}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setContentType("text")}
                            aria-pressed={contentType === "text"}
                            className={`flex items-center justify-center gap-3 rounded-xl border p-4 transition-all ${
                                contentType === "text"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-text-secondary hover:bg-background-alt"
                            }`}
                        >
                            <HiOutlineDocumentText className="text-xl" />

                            <span className="font-medium">
                                {text.textLesson}
                            </span>
                        </button>
                    </div>

                    <input
                        type="hidden"
                        name="contentType"
                        value={contentType}
                    />
                </div>

                {/* Arabic title */}
                <div>
                    <label className="mb-2 block font-medium">
                        {isEn
                            ? "Lesson Title (Arabic)"
                            : "عنوان الدرس (عربي)"}
                    </label>

                    <input
                        name="titleAr"
                        defaultValue={
                            lesson?._translations?.title?.ar ||
                            lesson?.title?.ar ||
                            (
                                typeof lesson?.title === "string"
                                    ? lesson.title
                                    : ""
                            )
                        }
                        placeholder="مثال: مقدمة في React"
                        className="input-style"
                    />
                </div>

                {/* English title */}
                <div>
                    <label className="mb-2 block font-medium">
                        {isEn
                            ? "Lesson Title (English)"
                            : "عنوان الدرس (إنجليزي)"}
                    </label>

                    <input
                        name="titleEn"
                        defaultValue={
                            lesson?._translations?.title?.en ||
                            lesson?.title?.en ||
                            ""
                        }
                        placeholder="Example: Introduction to React"
                        className="input-style"
                    />
                </div>

                {/* Arabic description */}
                <div>
                    <label className="mb-2 block font-medium">
                        {isEn
                            ? "Lesson Description (Arabic)"
                            : "وصف الدرس (عربي)"}
                    </label>

                    <textarea
                        name="descriptionAr"
                        rows={5}
                        defaultValue={
                            lesson?._translations?.description?.ar ||
                            lesson?.description?.ar ||
                            (
                                typeof lesson?.description === "string"
                                    ? lesson.description
                                    : ""
                            )
                        }
                        placeholder="اكتب وصفًا مختصرًا للدرس..."
                        className="input-style resize-y"
                    />
                </div>

                {/* English description */}
                <div>
                    <label className="mb-2 block font-medium">
                        {isEn
                            ? "Lesson Description (English)"
                            : "وصف الدرس (إنجليزي)"}
                    </label>

                    <textarea
                        name="descriptionEn"
                        rows={5}
                        defaultValue={
                            lesson?._translations?.description?.en ||
                            lesson?.description?.en ||
                            ""
                        }
                        placeholder="Write a brief description of the lesson..."
                        className="input-style resize-y"
                    />
                </div>

                {/* Learning Points */}
                <div className="space-y-5 rounded-2xl border border-border bg-background-alt/50 p-4">
                    <div>
                        <h3 className="font-semibold">
                            {text.learningPoints}
                        </h3>

                        <p className="mt-2 text-sm text-text-secondary">
                            {text.learningPointsDescription}
                        </p>
                    </div>

                    <input
                        type="hidden"
                        name="learningPointsSubmitted"
                        value="true"
                    />

                    <div className="space-y-4">
                        {learningPoints.map((point, index) => (
                            <div
                                key={index}
                                className="space-y-4 rounded-xl border border-border bg-background p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-medium">
                                        {text.learningPoint} #{index + 1}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeLearningPoint(index)
                                        }
                                        className="rounded-lg px-3 py-1.5 text-sm text-error transition-colors hover:bg-error/10"
                                    >
                                        {text.removeLearningPoint}
                                    </button>
                                </div>

                                {/* Arabic learning point */}
                                <div>
                                    <label
                                        htmlFor={`learning-point-ar-${index}`}
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        {text.arabicPoint}
                                    </label>

                                    <input
                                        id={`learning-point-ar-${index}`}
                                        name="learningPointsAr"
                                        type="text"
                                        value={point.ar}
                                        onChange={(event) =>
                                            handleLearningPointChange(
                                                index,
                                                "ar",
                                                event.target.value
                                            )
                                        }
                                        placeholder={text.arabicPointPlaceholder}
                                        dir="rtl"
                                        maxLength={500}
                                        className="input-style"
                                    />
                                </div>

                                {/* English learning point */}
                                <div>
                                    <label
                                        htmlFor={`learning-point-en-${index}`}
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        {text.englishPoint}
                                    </label>

                                    <input
                                        id={`learning-point-en-${index}`}
                                        name="learningPointsEn"
                                        type="text"
                                        value={point.en}
                                        onChange={(event) =>
                                            handleLearningPointChange(
                                                index,
                                                "en",
                                                event.target.value
                                            )
                                        }
                                        placeholder={text.englishPointPlaceholder}
                                        dir="ltr"
                                        maxLength={500}
                                        className="input-style"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addLearningPoint}
                        className="w-full rounded-xl border border-dashed border-primary/50 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
                    >
                        + {text.addLearningPoint}
                    </button>
                </div>

                {/* Text lesson content */}
                {contentType === "text" && (
                    <div className="space-y-5 rounded-2xl border border-border bg-background-alt/50 p-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2 font-medium">
                                <HiOutlineDocumentText className="text-xl" />

                                <span>{text.textContent}</span>
                            </div>

                            <p className="text-sm text-text-secondary">
                                {text.contentHint}
                            </p>
                        </div>

                        {/* Arabic content */}
                        <div>
                            <label className="mb-2 block font-medium">
                                {text.contentArabic}
                            </label>

                            <textarea
                                key={`content-ar-${lesson?._id || "new"}`}
                                name="contentAr"
                                rows={12}
                                defaultValue={
                                    lesson?._translations?.content?.ar ??
                                    lesson?.content?.ar ??
                                    ""
                                }
                                placeholder={text.contentArabicPlaceholder}
                                dir="rtl"
                                className="input-style resize-y leading-8"
                            />
                        </div>

                        {/* English content */}
                        <div>
                            <label className="mb-2 block font-medium">
                                {text.contentEnglish}
                            </label>

                            <textarea
                                key={`content-en-${lesson?._id || "new"}`}
                                name="contentEn"
                                rows={12}
                                defaultValue={
                                    lesson?._translations?.content?.en ??
                                    lesson?.content?.en ??
                                    ""
                                }
                                placeholder={text.contentEnglishPlaceholder}
                                dir="ltr"
                                className="input-style resize-y leading-8"
                            />
                        </div>
                    </div>
                )}

                {/* Duration + Sort order */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            {isEn
                                ? "Lesson Duration (minutes)"
                                : "مدة الدرس (بالدقائق)"}
                        </label>

                        <input
                            name="duration"
                            type="number"
                            min="0"
                            defaultValue={lesson?.duration ?? ""}
                            placeholder="20"
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
                            min="1"
                            defaultValue={lesson?.sortOrder ?? 1}
                            placeholder="1"
                            className="input-style"
                            readOnly
                        />
                    </div>
                </div>

                {/* Video source selection */}
                {contentType === "video" && (
                    <div className="space-y-4 rounded-2xl border border-border bg-background-alt/50 p-4">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <label className="flex items-center gap-2 font-medium">
                                <HiOutlineVideoCamera className="text-xl" />

                                {text.videoSource}
                            </label>

                            <div className="flex gap-2 rounded-xl border border-border bg-background p-1">
                                <button
                                    type="button"
                                    onClick={() => setVideoType("file")}
                                    aria-pressed={videoType === "file"}
                                    className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                                        videoType === "file"
                                            ? "bg-primary text-white"
                                            : "text-text-secondary"
                                    }`}
                                >
                                    {text.uploadFile}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVideoType("youtube")}
                                    aria-pressed={videoType === "youtube"}
                                    className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                                        videoType === "youtube"
                                            ? "bg-primary text-white"
                                            : "text-text-secondary"
                                    }`}
                                >
                                    {text.youtubeLink}
                                </button>
                            </div>
                        </div>

                        {/* Upload video file */}
                        {videoType === "file" && (
                            <div>
                                <input
                                    key={`video-file-${lesson?._id || "new"}`}
                                    name="video"
                                    type="file"
                                    accept="video/*"
                                    className="input-style"
                                />

                                <p className="mt-1 text-xs text-text-secondary">
                                    {isEn
                                        ? "Choose a video file from your device."
                                        : "اختر ملف فيديو من جهازك."}
                                </p>

                                {lesson?.video && !lesson?.videoYoutube && (
                                    <p className="mt-2 text-sm text-text-secondary">
                                        {text.currentVideo}{" "}

                                        <a
                                            href={lesson.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline"
                                        >
                                            {text.viewCurrentVideo}
                                        </a>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* YouTube URL */}
                        {videoType === "youtube" && (
                            <div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                                        <HiOutlineLink />
                                    </span>

                                    <input
                                        key={`youtube-${lesson?._id || "new"}`}
                                        name="videoYoutube"
                                        type="url"
                                        defaultValue={youtubeVal}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="input-style pr-10"
                                    />
                                </div>

                                <p className="mt-1 text-xs text-text-secondary">
                                    {isEn
                                        ? "Paste a direct YouTube video URL."
                                        : "الصق رابط فيديو YouTube مباشر."}
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-text-secondary">
                            {text.videoRequired}
                        </p>
                    </div>
                )}

                {/* Thumbnail + Attachment */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Thumbnail */}
                    <div className="space-y-3 rounded-2xl border border-border bg-background-alt/50 p-4">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineCloudArrowUp className="text-xl" />

                            {isEn
                                ? "Thumbnail - Optional"
                                : "الصورة المصغرة - اختياري"}
                        </label>

                        <input
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            className="input-style"
                        />

                        {lesson?.thumbnail && (
                            <p className="text-xs text-text-secondary">
                                {text.currentImage}{" "}

                                <a
                                    href={lesson.thumbnail}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                >
                                    {text.viewImage}
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Attachment */}
                    <div className="space-y-3 rounded-2xl border border-border bg-background-alt/50 p-4">
                        <label className="flex items-center gap-2 font-medium">
                            <HiOutlineDocumentText className="text-xl" />

                            {isEn
                                ? "Lesson Attachment - Optional"
                                : "ملف الدرس - اختياري"}
                        </label>

                        <input
                            name="attachment"
                            type="file"
                            accept=".pdf,.zip,.rar,.doc,.docx"
                            className="input-style"
                        />

                        {lesson?.attachment && (
                            <p className="text-xs text-text-secondary">
                                {text.currentFile}{" "}

                                <a
                                    href={lesson.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                >
                                    {text.downloadAttachment}
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Publication status */}
                    <div>
                        <label className="mb-2 block font-medium">
                            {isEn ? "Status" : "الحالة"}
                        </label>

                        <select
                            name="isPublished"
                            defaultValue={
                                lesson?.isPublished ? "true" : "false"
                            }
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

                    {/* Preview */}
                    <div className="mt-8 flex items-center gap-3">
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

                {/* Form actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={isPending}
                        className="rounded-2xl border border-border px-6 py-3 hover:bg-background-alt disabled:opacity-60"
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
