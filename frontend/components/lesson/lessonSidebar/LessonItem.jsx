import {
    HiCheckCircle,
    HiLockClosed,
    HiPlayCircle,
} from "react-icons/hi2";

const LessonItem = ({
    lesson,
}) => {
    const {
        completed,
        locked,
        active,
        duration,
        title,
    } = lesson;

    return (
        <button
            className={`
                w-full
                border-r-4
                px-6
                py-4
                text-right
                transition

                ${active
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:bg-background-alt"
                }
            `}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                {completed ? (
                    <HiCheckCircle
                        className="text-green-500"
                        size={22}
                    />
                ) : locked ? (
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
        </button>
    );
};

export default LessonItem;