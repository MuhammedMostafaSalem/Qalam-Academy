
"use client";

import { useEffect, useRef, useState } from "react";
import {
    HiCheckCircle,
    HiOutlineCheckCircle,
    HiOutlineDocumentText,
} from "react-icons/hi2";

import { updateProgressAction } from "@/actions/progressActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const TextLessonContent = ({
    lesson,
    onProgressUpdated,
    canTrackProgress,
}) => {
    const { language, localize } = useLanguage();
    const { successMessage, errorMessage } = useToast();

    const [isSaving, setIsSaving] = useState(false);
    const [isCompleted, setIsCompleted] = useState(
        Boolean(lesson?.isCompleted)
    );

    const lessonIdRef = useRef(lesson?._id || lesson?.id);

    const isEnglish = language === "en";

    const messages = {
        completed: isEnglish
            ? "Lesson completed successfully."
            : "تم إكمال الدرس بنجاح.",
        failed: isEnglish
            ? "Failed to update lesson progress."
            : "فشل تحديث تقدم الدرس.",
        completeLesson: isEnglish
            ? "Mark as completed"
            : "تم إكمال الدرس",
        completedLesson: isEnglish
            ? "Lesson completed"
            : "تم إكمال الدرس بالفعل",
        saving: isEnglish ? "Saving..." : "جاري الحفظ...",
        unavailable: isEnglish
            ? "Lesson content is not available."
            : "محتوى الدرس غير متوفر.",
        loginRequired: isEnglish
            ? "Please log in to track your progress."
            : "سجّل الدخول أولًا لحفظ تقدمك.",
    };

    // Select the content matching the current language.
    const content = localize(lesson?.content, "");

    // Reset completion state when navigating to another lesson.
    useEffect(() => {
        const currentLessonId = lesson?._id || lesson?.id;

        if (String(lessonIdRef.current) !== String(currentLessonId)) {
            lessonIdRef.current = currentLessonId;
        }

        setIsCompleted(Boolean(lesson?.isCompleted));
    }, [lesson?._id, lesson?.id, lesson?.isCompleted]);

    const handleCompleteLesson = async () => {
        if (isSaving || isCompleted) return;

        if (!canTrackProgress) {
            errorMessage(messages.loginRequired);
            return;
        }

        if (!lesson?._id) {
            errorMessage(messages.failed);
            return;
        }

        setIsSaving(true);

        try {
            const result = await updateProgressAction({
                lessonId: lesson._id,
                watchedSeconds: 0,
                lastPosition: 0,
                completed: true,
            });

            if (!result?.success) {
                errorMessage(result?.message || messages.failed);
                return;
            }

            setIsCompleted(true);

            // Keep the sidebar and parent progress state synchronized.
            if (result.data) {
                onProgressUpdated?.(result.data);
            }

            successMessage(result.message || messages.completed);
        } catch (error) {
            console.error("Complete text lesson error:", error);
            errorMessage(messages.failed);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="w-full">
            {/* Text lesson content */}
            <div className="relative overflow-hidden border-b border-border bg-background">
                <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <HiOutlineDocumentText className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary">
                                {isEnglish ? "Text Lesson" : "درس نصي"}
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                                {localize(lesson?.title, "")}
                            </h2>
                        </div>
                    </div>

                    {content?.trim() ? (
                        <article
                            dir={isEnglish ? "ltr" : "rtl"}
                            lang={isEnglish ? "en" : "ar"}
                            className="rounded-2xl border border-border bg-card p-5 text-base leading-8 text-foreground sm:p-8 sm:text-lg"
                        >
                            <div className="whitespace-pre-wrap break-words">
                                {content}
                            </div>
                        </article>
                    ) : (
                        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                            {messages.unavailable}
                        </div>
                    )}

                    {/* Completion action */}
                    {canTrackProgress && (
                        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                {isCompleted ? (
                                    <HiCheckCircle className="h-7 w-7 shrink-0 text-green-500" />
                                ) : (
                                    <HiOutlineCheckCircle className="h-7 w-7 shrink-0 text-muted-foreground" />
                                )}

                                <div>
                                    <p className="font-semibold text-foreground">
                                        {isCompleted
                                            ? messages.completedLesson
                                            : isEnglish
                                                ? "Have you finished reading?"
                                                : "هل انتهيت من قراءة الدرس؟"}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {isCompleted
                                            ? isEnglish
                                                ? "Your progress has been saved."
                                                : "تم حفظ تقدمك."
                                            : isEnglish
                                                ? "Mark this lesson as completed to update your progress."
                                                : "اضغط على الزر بعد الانتهاء لتحديث تقدمك."}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleCompleteLesson}
                                disabled={isSaving || isCompleted}
                                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isCompleted && (
                                    <HiCheckCircle className="h-5 w-5" />
                                )}

                                {isSaving
                                    ? messages.saving
                                    : isCompleted
                                        ? messages.completedLesson
                                        : messages.completeLesson}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TextLessonContent;
