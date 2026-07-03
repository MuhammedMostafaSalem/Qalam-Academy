import lessonData from "../lessonData";

const LessonHeader = () => {
    const currentLesson = lessonData.modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.active);

    return (
        <header className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                <span>{lessonData.course.title}</span>

                <span>/</span>

                <span>الدرس الحالي</span>
            </div>

            {/* Lesson Title */}
            <h1
                className="
                    text-3xl
                    font-bold
                    text-text-primary
                "
            >
                {currentLesson.title}
            </h1>

            {/* Description */}
            <p
                className="
                    max-w-3xl
                    leading-8
                    text-text-secondary
                "
            >
                في هذا الدرس سنتعرف على المفاهيم الأساسية الخاصة بهذا الجزء
                من الكورس مع تطبيقات عملية تساعدك على فهم المحتوى بسهولة.
            </p>

            {/* Meta */}
            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-6
                    text-sm
                    text-text-secondary
                "
            >
                <div className="flex items-center gap-2">
                    <span>⏱</span>
                    <span>{currentLesson.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>👨‍🏫</span>
                    <span>{lessonData.course.instructor}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>{lessonData.course.level}</span>
                </div>
            </div>
        </header>
    );
};

export default LessonHeader;