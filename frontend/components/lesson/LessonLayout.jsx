import LessonPlayer from "./lessonPlayer/LessonPlayer";
import LessonSidebar from "./lessonSidebar/LessonSidebar";

const LessonLayout = () => {
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
            <LessonPlayer />

            {/* Sidebar */}
            <aside
                className="
                    border-r
                    border-border
                "
            >
                <LessonSidebar />
            </aside>
        </div>
    );
};

export default LessonLayout;