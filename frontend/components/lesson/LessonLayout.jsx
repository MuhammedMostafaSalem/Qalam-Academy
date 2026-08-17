import LessonPlayer from "./lessonPlayer/LessonPlayer";
import LessonSidebar from "./lessonSidebar/LessonSidebar";

const LessonLayout = ({ lesson, courseSlug, courseProgress, courseLessons }) => {
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
                courseLessons={courseLessons}
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
                    courseLessons={courseLessons}
                />
            </aside>
        </div>
    );
};

export default LessonLayout;