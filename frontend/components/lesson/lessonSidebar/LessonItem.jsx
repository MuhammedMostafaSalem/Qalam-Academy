import {
    HiCheckCircle,
    HiLockClosed,
    HiPlayCircle,
} from "react-icons/hi2";
import Link from "next/link";

const LessonItem = ({ lesson, currentLessonId, courseSlug }) => {
    const isCompleted = lesson.isCompleted || false;
    const isActive = lesson._id === currentLessonId;
    const isLocked = !lesson.isPublished;
    const title = lesson.title?.ar || lesson.title?.en || lesson.title;
    const duration = lesson.duration || "—";

    return (
        <Link
            href={`/courses/${courseSlug}/lesson/${lesson._id}`}
            className={`
                block
                w-full
                border-r-4
                px-6
                py-4
                text-right
                transition

                ${isActive
                    ? "border-primary bg-primary/5"
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
                        className="text-green-500"
                        size={22}
                    />
                ) : isLocked ? (
                    <HiLockClosed
                        className="text-text-secondary"
                        size={20}
                    />
                ) : (
                    <HiPlayCircle
                        className="text-primary"
                        size={22}
                    />
                )}

                <div className="flex-1">
                    <h4 className="font-medium">
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