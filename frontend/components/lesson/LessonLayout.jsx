import LessonPlayer from "./lessonPlayer/LessonPlayer";
import LessonSidebar from "./lessonSidebar/LessonSidebar";

const LessonLayout = ({ lesson, courseSlug, courseProgress }) => {
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
                lesson={lesson} 
                courseSlug={courseSlug}
                courseProgress={courseProgress}
            />

            {/* Sidebar */}
            <aside
                className="
                    border-r
                    border-border
                "
            >
                <LessonSidebar 
                    lesson={lesson}
                    courseSlug={courseSlug}
                    courseProgress={courseProgress}
                />
            </aside>
        </div>
    );
};

export default LessonLayout;