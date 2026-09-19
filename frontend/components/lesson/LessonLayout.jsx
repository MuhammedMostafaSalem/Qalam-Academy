"use client";

import { useEffect, useMemo, useState } from "react";
import LessonPlayer from "./lessonPlayer/LessonPlayer";
import LessonSidebar from "./lessonSidebar/LessonSidebar";

const LessonLayout = ({ lesson, courseSlug, courseProgress, courseLessons }) => {
    const [currentProgress, setCurrentProgress] = useState(courseProgress);
    const [currentLessons, setCurrentLessons] = useState(courseLessons || []);

    useEffect(() => {
        setCurrentProgress(courseProgress);
        setCurrentLessons(courseLessons || []);
    }, [courseProgress, courseLessons]);

    const currentLesson = useMemo(() => {
        const lessonState = currentLessons.find(
            (item) => String(item?._id || item?.id) === String(lesson?._id || lesson?.id)
        );

        if (!lessonState) return lesson;

        return {
            ...lesson,
            isCompleted: lessonState.isCompleted,
            watchedSeconds: lessonState.watchedSeconds,
            lastPosition: lessonState.lastPosition,
            completedAt: lessonState.completedAt,
        };
    }, [currentLessons, lesson]);

    const handleProgressUpdated = (update) => {
        if (!update) return;

        if (update.courseProgress) {
            setCurrentProgress((previous) => ({
                ...previous,
                ...update.courseProgress,
            }));
        }

        if (update.lesson) {
            const updatedLessonId = String(update.lesson.lesson || "");
            setCurrentLessons((previous) => previous.map((item) =>
                String(item?._id || item?.id) === updatedLessonId
                    ? {
                        ...item,
                        isCompleted: Boolean(update.lesson.completed),
                        watchedSeconds: update.lesson.watchedSeconds || 0,
                        lastPosition: update.lesson.lastPosition || 0,
                        completedAt: update.lesson.completedAt || null,
                    }
                    : item
            ));
        }
    };

    return (
        <div
            className="
                mt-[100px]
                grid
                min-h-screen
                lg:grid-cols-[1fr_360px]
            "
        >
            {/* Main Content */}
            <LessonPlayer 
                lesson={currentLesson}
                courseSlug={courseSlug}
                courseProgress={currentProgress}
                courseLessons={currentLessons}
                onProgressUpdated={handleProgressUpdated}
                canTrackProgress={Boolean(currentProgress)}
            />

            {/* Sidebar */}
            <aside
                className="
                    border-r
                    border-border
                "
            >
                <LessonSidebar 
                    lesson={currentLesson}
                    courseSlug={courseSlug}
                    courseProgress={currentProgress}
                    courseLessons={currentLessons}
                />
            </aside>
        </div>
    );
};

export default LessonLayout;
