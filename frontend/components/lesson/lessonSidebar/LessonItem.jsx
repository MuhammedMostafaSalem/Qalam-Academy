import {
    HiCheckCircle,
    HiLockClosed,
    HiPlayCircle,
} from "react-icons/hi2";
import Link from "next/link";

const LessonItem = ({ lesson, currentLessonId, courseSlug }) => {
    const lessonId = lesson?._id || lesson?.id;
    const isCompleted = lesson?.isCompleted || false;
    const isActive = String(lessonId) === String(currentLessonId);
    const isLocked = lesson?.canAccess === false;
    const title = lesson?.title?.ar || lesson?.title?.en || lesson?.title || "درس";
    const duration = lesson?.duration ? `${lesson.duration} دقيقة` : "—";

    return (
        <Link
            href={`/courses/${courseSlug}/lesson/${lessonId}`}
            className={`
                block
                w-full
                border-r-4
                px-6
                py-4
                text-right
                transition

                ${isActive
                    ? "border-primary bg-primary/5 font-medium"
                    : "border-transparent hover:bg-background-alt"
                }
                
                ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={(e) => {
                if (isLocked) {
                    e.preventDefault();
                }
            }}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                {isCompleted ? (
                    <HiCheckCircle
                        className="text-green-500 shrink-0"
                        size={22}
                    />
                ) : isLocked ? (
                    <HiLockClosed
                        className="text-text-secondary shrink-0"
                        size={20}
                    />
                ) : (
                    <HiPlayCircle
                        className="text-primary shrink-0"
                        size={22}
                    />
                )}

                <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm">
                        {title}
                    </h4>

                    <p className="mt-1 text-xs text-text-secondary">
                        {duration}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default LessonItem;