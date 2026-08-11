"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import { updateProgressAction } from "@/actions/progressActions";

const VideoPlayer = ({ lesson }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef(null);
    const progressUpdateRef = useRef(null);

    const videoUrl = lesson?.video?.startsWith('http') 
        ? lesson.video 
        : lesson?.video 
            ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${lesson.video}`
            : null;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Update progress when video reaches 90% completion
        const handleTimeUpdate = () => {
            const progress = (video.currentTime / video.duration) * 100;
            
            // Mark as completed when 90% watched
            if (progress >= 90 && !progressUpdateRef.current) {
                progressUpdateRef.current = true;
                updateProgressAction(lesson._id, true).catch(console.error);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [lesson._id]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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
                group
            "
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(isPlaying ? false : true)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="h-full w-full"
                src={videoUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
            />

            {/* Custom Play/Pause Overlay (when video is paused) */}
            {!isPlaying && showControls && (
                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        transition-opacity
                    "
                >
                    <button
                        onClick={handlePlayPause}
                        className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-primary
                            text-white
                            shadow-2xl
                            transition
                            hover:scale-110
                        "
                    >
                        <HiOutlinePlay
                            size={34}
                            className="translate-x-[2px]"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;