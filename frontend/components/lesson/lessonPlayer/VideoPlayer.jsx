"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiCheckCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import { updateProgressAction } from "@/actions/progressActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const POSITION_SAVE_INTERVAL_MS = 10_000;
const COMPLETION_THRESHOLD = 0.9;

const VideoPlayer = ({ lesson, onProgressUpdated, canTrackProgress = false }) => {
    const videoRef = useRef(null); // عنصر الـ video العادي
    const youtubeContainerRef = useRef(null); // الـ div اللي هيتحول لـ iframe بواسطة يوتيوب
    const ytPlayerRef = useRef(null); // كائن مشغل يوتيوب
    const ytTimerRef = useRef(null); // العداد الخاص بتتبع يوتيوب

    const onProgressUpdatedRef = useRef(onProgressUpdated);
    const completionRequestRef = useRef(Boolean(lesson?.isCompleted));
    const lastSaveAtRef = useRef(0);
    const lastSavedPositionRef = useRef(Number(lesson?.lastPosition) || 0);
    const watchedSecondsRef = useRef(Number(lesson?.watchedSeconds) || 0);
    const previousPlaybackTimeRef = useRef(Number(lesson?.lastPosition) || 0);
    const hasInitializedRef = useRef(false);

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

    // استخراج الـ YouTube Video ID بدلاً من الـ Embed URL الكامل
    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === "youtu.be") {
                return parsedUrl.pathname.slice(1) || null;
            }
            if (["www.youtube.com", "youtube.com", "m.youtube.com"].includes(parsedUrl.hostname)) {
                return parsedUrl.searchParams.get("v");
            }
            return null;
        } catch {
            return null;
        }
    };

    const youtubeVideoId = getYoutubeVideoId(lesson?.videoYoutube);

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
        hasInitializedRef.current = false;
    }, [lesson?._id]);

    // دالة حفظ التقدم الموحدة للنوعين
    const persistProgress = useCallback(async ({ completed = false, force = false, notify = false } = {}) => {
        if (!canTrackProgress || !lesson?._id) return null;

        if (completed && completionRequestRef.current) {
            return null;
        }

        const now = Date.now();
        if (!completed && !force && now - lastSaveAtRef.current < POSITION_SAVE_INTERVAL_MS) {
            return null;
        }

        let currentPosition = 0;
        if (videoRef.current) {
            currentPosition = Math.max(0, Number(videoRef.current.currentTime ?? lastSavedPositionRef.current) || 0);
        } else if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
            currentPosition = Math.max(0, Number(ytPlayerRef.current.getCurrentTime() ?? lastSavedPositionRef.current) || 0);
        } else {
            currentPosition = lastSavedPositionRef.current;
        }

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

    // معالجة الفيديو العادي (HTML5 Video)
    useEffect(() => {
        const video = videoRef.current;
        if (!video || videoUrl) { // لو مفيش فيديو عادي متنفذش دي
            // لكن لو في فيديو عادي:
        }
        if (!video) return;

        const handleLoadedMetadata = () => {
            const savedPosition = Math.max(0, Number(lesson?.lastPosition) || 0);
            if (!hasInitializedRef.current && savedPosition > 0 && Number.isFinite(video.duration)) {
                video.currentTime = Math.min(savedPosition, Math.max(0, video.duration - 0.25));
                previousPlaybackTimeRef.current = video.currentTime;
                hasInitializedRef.current = true;
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
                    void persistProgress();
                }
                return;
            }

            void persistProgress();
        };

        const handlePause = () => void persistProgress({ force: true });
        const handleEnded = () => void persistProgress({ completed: true });
        const handleSeeking = () => { previousPlaybackTimeRef.current = video.currentTime; };

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
    }, [persistProgress, videoUrl]);

    // معالجة فيديو يوتيوب باستخدام YouTube IFrame API
    useEffect(() => {
        if (!youtubeVideoId || videoUrl) return;

        let isMounted = true;

        // تحميل سكريبت يوتيوب أوتوماتيكياً لو مش متحمل
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initYouTubePlayer();
                return;
            }

            if (!document.getElementById("youtube-iframe-api")) {
                const tag = document.createElement("script");
                tag.id = "youtube-iframe-api";
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            window.onYouTubeIframeAPIReady = () => {
                if (isMounted) initYouTubePlayer();
            };
        };

        const initYouTubePlayer = () => {
            if (!youtubeContainerRef.current) return;

            const savedPosition = Math.max(0, Number(lesson?.lastPosition) || 0);

            ytPlayerRef.current = new window.YT.Player(youtubeContainerRef.current, {
                height: "100%",
                width: "100%",
                videoId: youtubeVideoId,
                playerVars: {
                    autoplay: 0,
                    start: Math.floor(savedPosition),
                },
                events: {
                    onReady: (event) => {
                        if (!hasInitializedRef.current && savedPosition > 0) {
                            event.target.seekTo(savedPosition, true);
                            previousPlaybackTimeRef.current = savedPosition;
                            hasInitializedRef.current = true;
                        }
                    },
                    onStateChange: (event) => {
                        // حالة التشغيل: Playing (1)
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            startYouTubeTracking();
                        } else {
                            stopYouTubeTracking();
                            if (event.data === window.YT.PlayerState.PAUSED) {
                                void persistProgress({ force: true });
                            } else if (event.data === window.YT.PlayerState.ENDED) {
                                void persistProgress({ completed: true });
                            }
                        }
                    },
                },
            });
        };

        const startYouTubeTracking = () => {
            stopYouTubeTracking();
            ytTimerRef.current = setInterval(() => {
                const player = ytPlayerRef.current;
                if (!player || typeof player.getCurrentTime !== "function" || typeof player.getDuration !== "function") return;

                const duration = player.getDuration();
                if (!duration || duration <= 0) return;

                const currentTime = Math.max(0, player.getCurrentTime());
                const playbackDelta = currentTime - previousPlaybackTimeRef.current;

                if (playbackDelta > 0 && playbackDelta <= 2) {
                    watchedSecondsRef.current += playbackDelta;
                }
                previousPlaybackTimeRef.current = currentTime;

                if (currentTime / duration >= COMPLETION_THRESHOLD) {
                    if (!completionRequestRef.current) {
                        void persistProgress({ completed: true });
                    } else {
                        void persistProgress();
                    }
                    return;
                }

                void persistProgress();
            }, 1000);
        };

        const stopYouTubeTracking = () => {
            if (ytTimerRef.current) {
                clearInterval(ytTimerRef.current);
                ytTimerRef.current = null;
            }
        };

        loadYouTubeAPI();

        return () => {
            isMounted = false;
            stopYouTubeTracking();
            if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === "function") {
                try {
                    const currentTime = ytPlayerRef.current.getCurrentTime();
                    if (currentTime && Math.abs(currentTime - lastSavedPositionRef.current) >= 1) {
                        void persistProgress({ force: true });
                    }
                    ytPlayerRef.current.destroy();
                } catch {}
            }
        };
    }, [youtubeVideoId, videoUrl, persistProgress]);

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
                ) : youtubeVideoId ? (
                    /* مكان الـ div اللي يوتيوب API هيحوله لـ iframe أوتوماتيكياً */
                    <div ref={youtubeContainerRef} className="h-full w-full" />
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