"use client";

import { useRef, useEffect } from "react";
import { updateProgressAction } from "@/actions/progressActions";
import { useLanguage } from "@/providers/LanguageProvider";

const VideoPlayer = ({ lesson }) => {
    const videoRef = useRef(null);
    const progressUpdateRef = useRef(null);

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

    // Convert YouTube URL to embed URL
    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;

        try {
            const parsedUrl = new URL(url);

            // youtu.be/JvA6iBb6gBc
            if (parsedUrl.hostname === "youtu.be") {
                const videoId = parsedUrl.pathname.slice(1);

                return videoId
                    ? `https://www.youtube.com/embed/${videoId}`
                    : null;
            }

            // youtube.com/watch?v=JvA6iBb6gBc
            if (
                parsedUrl.hostname === "www.youtube.com" ||
                parsedUrl.hostname === "youtube.com" ||
                parsedUrl.hostname === "m.youtube.com"
            ) {
                const videoId = parsedUrl.searchParams.get("v");

                return videoId
                    ? `https://www.youtube.com/embed/${videoId}`
                    : null;
            }

            return null;
        } catch {
            return null;
        }
    }

    const youtubeUrl = getYoutubeEmbedUrl(lesson?.videoYoutube);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset tracking on lesson change
        progressUpdateRef.current = false;

        // Update progress when video reaches 90% completion
        const handleTimeUpdate = () => {
            if (!video.duration) return;
            const progress = (video.currentTime / video.duration) * 100;
            
            // Mark as completed when 90% watched
            if (progress >= 90 && !progressUpdateRef.current && lesson?._id) {
                progressUpdateRef.current = true;
                updateProgressAction(lesson._id, true).catch(console.error);
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        
        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [lesson?._id]);

    const { language } = useLanguage();
    const isEn = language === "en";

    // No video at all
    if (!videoUrl && !youtubeUrl) {
        return (
            <div
                className="
                    relative
                    aspect-video
                    w-full
                    overflow-hidden
                    bg-black
                    flex
                    items-center
                    justify-center
                "
            >
                <p className="text-white text-lg">
                    {isEn ? "No video available for this lesson" : "لا يوجد فيديو متاح لهذا الدرس"}
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                relative
                aspect-video
                w-full
                overflow-hidden
                bg-black
            "
        >
            {/* Local Video */}
            {
                videoUrl && (
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
                )
            }

            {/* YouTube Video */}
            {
                !videoUrl && youtubeUrl && (
                    <iframe
                        className="h-full w-full"
                        src={youtubeUrl}
                        title={lesson?.title || "YouTube video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                )
            }
        </div>
    );
};

export default VideoPlayer;