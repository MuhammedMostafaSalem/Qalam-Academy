import LessonHeader from "../lessonContent/LessonHeader";
import LessonTabs from "../lessonContent/LessonTabs";
import LessonNavigation from "../LessonNavigation";
import PlayerControls from "./PlayerControls";
import VideoPlayer from "./VideoPlayer";

const LessonPlayer = ({ lesson, courseSlug, courseProgress }) => {
    return (
        <div className="flex flex-col">
            <VideoPlayer lesson={lesson} />

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

                <div className="mt-8">
                    <PlayerControls lesson={lesson} />
                </div>

                <div className="mt-10">
                    <LessonTabs lesson={lesson} />
                </div>

                <div className="mt-12">
                    <LessonNavigation 
                        lesson={lesson}
                        courseSlug={courseSlug}
                        courseProgress={courseProgress}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonPlayer;