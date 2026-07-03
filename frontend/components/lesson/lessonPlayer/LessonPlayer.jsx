import LessonHeader from "../lessonContent/LessonHeader";
import LessonTabs from "../lessonContent/LessonTabs";
import LessonNavigation from "../LessonNavigation";
import PlayerControls from "./PlayerControls";
import VideoPlayer from "./VideoPlayer";

const LessonPlayer = () => {
    return (
        <div className="flex flex-col">
            <VideoPlayer />

            <div
                className="
                    mx-auto
                    w-full
                    max-w-6xl
                    px-6
                    py-8
                "
            >
                <LessonHeader />

                <div className="mt-8">
                    <PlayerControls />
                </div>

                <div className="mt-10">
                    <LessonTabs />
                </div>

                <div className="mt-12">
                    <LessonNavigation />
                </div>
            </div>
        </div>
    );
};

export default LessonPlayer;