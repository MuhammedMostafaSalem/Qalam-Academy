import LessonHeader from "../lessonContent/LessonHeader";
import LessonTabs from "../lessonContent/LessonTabs";
import LessonNavigation from "../LessonNavigation";
import VideoPlayer from "./VideoPlayer";

const LessonPlayer = ({ lesson, courseSlug, courseProgress, courseLessons, onProgressUpdated, canTrackProgress }) => {
    return (
        <div className="flex flex-col">
            <VideoPlayer
                lesson={lesson}
                onProgressUpdated={onProgressUpdated}
                canTrackProgress={canTrackProgress}
            />

            <div
                className="
                    mx-auto
                    w-full
                    max-w-6xl
                    px-6
                    py-8
                "
            >
                <LessonHeader lesson={lesson} />

                <div className="mt-10">
                    <LessonTabs lesson={lesson} />
                </div>

                <div className="mt-12">
                    <LessonNavigation 
                        lesson={lesson}
                        courseSlug={courseSlug}
                        courseProgress={courseProgress}
                        courseLessons={courseLessons}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonPlayer;
