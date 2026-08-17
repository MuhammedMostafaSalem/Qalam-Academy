import Link from "next/link";
import {
    HiArrowLongLeft,
    HiArrowLongRight,
} from "react-icons/hi2";

const LessonNavigation = ({ lesson, courseSlug, courseLessons = [] }) => {
    if (!courseLessons || courseLessons.length === 0) {
        return null;
    }

    const currentId = String(lesson?._id || lesson?.id || "");
    const currentIndex = courseLessons.findIndex(
        (item) => String(item._id || item.id) === currentId
    );

    const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
    const nextLesson = (currentIndex >= 0 && currentIndex < courseLessons.length - 1)
        ? courseLessons[currentIndex + 1]
        : null;

    if (!previousLesson && !nextLesson) {
        return null;
    }

    const getLessonTitle = (l) => l?.title?.ar || l?.title?.en || l?.title || "درس";
    const getLessonId = (l) => l?._id || l?.id;

    return (
        <div
            className={`
                mt-12
                flex
                flex-col
                gap-5
                sm:flex-row
                ${previousLesson && nextLesson ? "sm:justify-between" : previousLesson ? "sm:justify-start" : "sm:justify-end"}
            `}
        >
            {/* Previous Lesson */}
            {previousLesson && (
                <Link
                    href={`/courses/${courseSlug}/lesson/${getLessonId(previousLesson)}`}
                    className="
                        group
                        flex
                        flex-1
                        items-center
                        justify-between
                        rounded-3xl
                        border
                        border-border
                        bg-card
                        p-6
                        transition-all
                        duration-300
                        hover:border-primary
                        hover:-translate-y-1
                    "
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                                transition
                                group-hover:bg-primary
                                group-hover:text-white
                            "
                        >
                            <HiArrowLongRight size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-text-secondary">
                                الدرس السابق
                            </p>

                            <h3 className="mt-1 font-semibold">
                                {getLessonTitle(previousLesson)}
                            </h3>
                        </div>
                    </div>
                </Link>
            )}

            {/* Next Lesson */}
            {nextLesson && (
                <Link
                    href={`/courses/${courseSlug}/lesson/${getLessonId(nextLesson)}`}
                    className="
                        group
                        flex
                        flex-1
                        items-center
                        justify-between
                        rounded-3xl
                        border
                        border-border
                        bg-card
                        p-6
                        transition-all
                        duration-300
                        hover:border-primary
                        hover:-translate-y-1
                    "
                >
                    <div>
                        <p className="text-sm text-text-secondary">
                            الدرس التالي
                        </p>

                        <h3 className="mt-1 font-semibold">
                            {getLessonTitle(nextLesson)}
                        </h3>
                    </div>

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/10
                            text-primary
                            transition
                            group-hover:bg-primary
                            group-hover:text-white
                        "
                    >
                        <HiArrowLongLeft size={24} />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default LessonNavigation;