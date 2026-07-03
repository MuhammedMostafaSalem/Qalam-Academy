import Link from "next/link";
import {
    HiArrowLongLeft,
    HiArrowLongRight,
} from "react-icons/hi2";
import lessonData from "./lessonData";

const LessonNavigation = () => {
    const lessons = lessonData.modules.flatMap(
        (module) => module.lessons
    );

    const currentIndex = lessons.findIndex(
        (lesson) => lesson.active
    );

    const previousLesson =
        currentIndex > 0
            ? lessons[currentIndex - 1]
            : null;

    const nextLesson =
        currentIndex < lessons.length - 1
            ? lessons[currentIndex + 1]
            : null;

    return (
        <div
            className="
                mt-12
                flex
                flex-col
                gap-5

                md:flex-row
                md:justify-between
            "
        >
            {/* Previous */}

            {previousLesson && (
                <Link
                    href={`/courses/slag/lesson/${previousLesson.id}`}
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
                                {previousLesson.title}
                            </h3>

                        </div>

                    </div>
                </Link>
            )}

            {/* Next */}
            {
                nextLesson && (
                    <Link
                        href={`/courses/slag/lesson/${nextLesson.id}`}
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
                                {nextLesson.title}
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
                )
            }
        </div>
    );
};

export default LessonNavigation;