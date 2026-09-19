"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiCheckCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import { updateProgressAction } from "@/actions/progressActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const POSITION_SAVE_INTERVAL_MS = 10_000;
const COMPLETION_THRESHOLD = 0.9;

const VideoPlayer = ({ lesson, onProgressUpdated, canTrackProgress = false }) => {
    const videoRef = useRef(null);
    const onProgressUpdatedRef = useRef(onProgressUpdated);
    const completionRequestRef = useRef(Boolean(lesson?.isCompleted));
    const lastSaveAtRef = useRef(0);
    const lastSavedPositionRef = useRef(Number(lesson?.lastPosition) || 0);
    const watchedSecondsRef = useRef(Number(lesson?.watchedSeconds) || 0);
    const previousPlaybackTimeRef = useRef(Number(lesson?.lastPosition) || 0);

    const [isCompleted, setIsCompleted] = useState(Boolean(lesson?.isCompleted));
    const [isCompleting, setIsCompleting] = useState(false);
    const { language, localize } = useLanguage();
    const { successMessage, errorMessage } = useToast();
    const isEn = language === "en";

    const videoUrl = lesson?.video?.startsWith("http")
        ? lesson.video
        : lesson?.video
            ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}${lesson.video}`
            : null;

    const thumbnailUrl = lesson?.thumbnail?.startsWith("http")
        ? lesson.thumbnail
        : lesson?.thumbnail
            ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}${lesson.thumbnail}`
            : null;

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;

        try {
            const parsedUrl = new URL(url);

            if (parsedUrl.hostname === "youtu.be") {
                const videoId = parsedUrl.pathname.slice(1);
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }

            if (["www.youtube.com", "youtube.com", "m.youtube.com"].includes(parsedUrl.hostname)) {
                const videoId = parsedUrl.searchParams.get("v");
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }

            return null;
        } catch {
            return null;
        }
    };

    const youtubeUrl = getYoutubeEmbedUrl(lesson?.videoYoutube);

    useEffect(() => {
        onProgressUpdatedRef.current = onProgressUpdated;
    }, [onProgressUpdated]);

    useEffect(() => {
        const completed = Boolean(lesson?.isCompleted);
        const savedPosition = Number(lesson?.lastPosition) || 0;

        setIsCompleted(completed);
        setIsCompleting(false);
        completionRequestRef.current = completed;
        lastSaveAtRef.current = 0;
        lastSavedPositionRef.current = savedPosition;
        watchedSecondsRef.current = Number(lesson?.watchedSeconds) || 0;
        previousPlaybackTimeRef.current = savedPosition;
    }, [lesson?._id, lesson?.isCompleted, lesson?.lastPosition, lesson?.watchedSeconds]);

    const persistProgress = useCallback(async ({ completed = false, force = false, notify = false } = {}) => {
        if (!canTrackProgress || !lesson?._id) return null;

        if (completed && completionRequestRef.current) {
            return null;
        }

        const now = Date.now();
        if (!completed && !force && now - lastSaveAtRef.current < POSITION_SAVE_INTERVAL_MS) {
            return null;
        }

        const currentPosition = Math.max(
            0,
            Number(videoRef.current?.currentTime ?? lastSavedPositionRef.current) || 0
        );

        if (!completed && force && Math.abs(currentPosition - lastSavedPositionRef.current) < 1) {
            return null;
        }

        if (completed) {
            completionRequestRef.current = true;
            setIsCompleting(true);
        }

        lastSaveAtRef.current = now;

        const result = await updateProgressAction({
            lessonId: lesson._id,
            watchedSeconds: Math.max(watchedSecondsRef.current, currentPosition),
            lastPosition: currentPosition,
            completed,
        });

        if (!result.success) {
            if (completed) {
                completionRequestRef.current = false;
                setIsCompleting(false);
            }
            if (notify) {
                errorMessage(result.message || (isEn ? "Failed to complete lesson" : "فشل إكمال الدرس"));
            }
            return result;
        }

        lastSavedPositionRef.current = currentPosition;
        const savedLesson = result.data?.lesson;

        if (savedLesson?.completed) {
            completionRequestRef.current = true;
            setIsCompleted(true);
            setIsCompleting(false);
        }

        onProgressUpdatedRef.current?.(result.data);

        if (notify && savedLesson?.completed) {
            successMessage(isEn ? "Lesson marked as completed" : "تم تحديد الدرس كمكتمل");
        }

        return result;
    }, [canTrackProgress, errorMessage, isEn, lesson?._id, successMessage]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            const savedPosition = Math.max(0, Number(lesson?.lastPosition) || 0);
            if (savedPosition > 0 && Number.isFinite(video.duration)) {
                video.currentTime = Math.min(savedPosition, Math.max(0, video.duration - 0.25));
                previousPlaybackTimeRef.current = video.currentTime;
            }
        };

        const handleTimeUpdate = () => {
            if (!Number.isFinite(video.duration) || video.duration <= 0) return;

            const currentTime = Math.max(0, video.currentTime);
            const playbackDelta = currentTime - previousPlaybackTimeRef.current;

            if (!video.paused && playbackDelta > 0 && playbackDelta <= 2) {
                watchedSecondsRef.current += playbackDelta;
            }
            previousPlaybackTimeRef.current = currentTime;

            if (currentTime / video.duration >= COMPLETION_THRESHOLD) {
                if (!completionRequestRef.current) {
                    void persistProgress({ completed: true });
                } else {
                    // Keep the resume position current after completion; the
                    // backend preserves the completed flag on position saves.
                    void persistProgress();
                }
                return;
            }

            void persistProgress();
        };

        const handlePause = () => {
            void persistProgress({ force: true });
        };

        const handleEnded = () => {
            void persistProgress({ completed: true });
        };

        const handleSeeking = () => {
            previousPlaybackTimeRef.current = video.currentTime;
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("seeking", handleSeeking);

        if (video.readyState >= 1) {
            handleLoadedMetadata();
        }

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("seeking", handleSeeking);

            if (Math.abs(video.currentTime - lastSavedPositionRef.current) >= 1) {
                void persistProgress({ force: true });
            }
        };
    }, [lesson?.lastPosition, persistProgress, videoUrl]);

    const handleManualCompletion = async () => {
        await persistProgress({ completed: true, force: true, notify: true });
    };

    return (
        <div className="bg-black">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
                {videoUrl ? (
                    <video
                        key={videoUrl}
                        ref={videoRef}
                        className="h-full w-full object-contain"
                        src={videoUrl}
                        poster={thumbnailUrl || undefined}
                        controls
                        playsInline
                        controlsList="nodownload"
                    />
                ) : youtubeUrl ? (
                    <iframe
                        className="h-full w-full"
                        src={youtubeUrl}
                        title={localize(lesson?.title, "YouTube video")}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-lg text-white">
                            {isEn ? "No video available for this lesson" : "لا يوجد فيديو متاح لهذا الدرس"}
                        </p>
                    </div>
                )}
            </div>

            {canTrackProgress && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-white md:px-6">
                <p className="text-sm text-white/70">
                    {isCompleted
                        ? (isEn ? "This lesson is completed." : "تم إكمال هذا الدرس.")
                        : (isEn ? "The lesson completes automatically at 90%." : "يكتمل الدرس تلقائيًا عند مشاهدة 90٪.")}
                </p>

                <button
                    type="button"
                    onClick={handleManualCompletion}
                    disabled={isCompleted || isCompleting}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        isCompleted
                            ? "cursor-default bg-success/20 text-success"
                            : "bg-primary text-white hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60"
                    }`}
                >
                    {isCompleted ? <HiCheckCircle size={20} /> : <HiOutlineCheckCircle size={20} />}
                    {isCompleted
                        ? (isEn ? "Completed" : "مكتمل")
                        : isCompleting
                            ? (isEn ? "Completing..." : "جاري الإكمال...")
                            : (isEn ? "Mark as completed" : "تحديد كمكتمل")}
                </button>
            </div>
            )}
        </div>
    );
};

export default VideoPlayer;
