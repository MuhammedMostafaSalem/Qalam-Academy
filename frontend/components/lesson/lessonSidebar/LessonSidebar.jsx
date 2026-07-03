import CurriculumAccordion from "./CurriculumAccordion";
import ProgressCard from "./ProgressCard";

const LessonSidebar = () => {
    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <div className="border-b border-border p-6">
                <h2 className="text-xl font-bold">
                    محتوى الكورس
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                    تابع تقدمك وأكمل الدروس بالترتيب.
                </p>
            </div>

            {/* Progress */}
            <div className="border-b border-border p-6">
                <ProgressCard />
            </div>

            {/* Curriculum */}
            <div className="flex-1">
                <CurriculumAccordion />
            </div>
        </div>
    );
};

export default LessonSidebar;