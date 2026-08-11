import CurriculumAccordion from "./CurriculumAccordion";
import ProgressCard from "./ProgressCard";

const LessonSidebar = ({ lesson, courseSlug, courseProgress }) => {
    const courseTitle = lesson?.course?.title?.ar || lesson?.course?.title?.en || lesson?.course?.title || "الكورس";

    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <div className="border-b border-border p-6">
                <h2 className="text-xl font-bold">
                    {courseTitle}
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                    تابع تقدمك وأكمل الدروس بالترتيب.
                </p>
            </div>

            {/* Progress */}
            <div className="border-b border-border p-6">
                <ProgressCard courseProgress={courseProgress} />
            </div>

            {/* Curriculum */}
            <div className="flex-1 overflow-y-auto">
                <CurriculumAccordion 
                    courseProgress={courseProgress}
                    currentLessonId={lesson._id}
                    courseSlug={courseSlug}
                />
            </div>
        </div>
    );
};

export default LessonSidebar;