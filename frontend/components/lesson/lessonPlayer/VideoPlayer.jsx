"use client";

import { useRef, useEffect } from "react";
import { updateProgressAction } from "@/actions/progressActions";

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

    if (!videoUrl) {
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
                    لا يوجد فيديو متاح لهذا الدرس
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
            {/* Video Element */}
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
        </div>
    );
};

export default VideoPlayer;