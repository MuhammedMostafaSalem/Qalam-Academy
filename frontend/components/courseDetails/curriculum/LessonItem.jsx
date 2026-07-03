import {
    HiOutlineLockClosed,
    HiOutlinePlayCircle,
    HiOutlineClock,
} from "react-icons/hi2";

const LessonItem = ({
    lesson,
}) => {
    return (
        <div
            className="
                flex
                items-center
                justify-between
                border-b
                border-border
                px-6
                py-5
                last:border-none
                hover:bg-white/5
                transition-colors
            "
        >
            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >
                {lesson.preview
                    ? (
                        <HiOutlinePlayCircle
                            size={24}
                            className="text-primary"
                        />
                    )
                    : (
                        <HiOutlineLockClosed
                            size={22}
                            className="text-text-secondary"
                        />
                    )
                }

                <div>
                    <h4 className="font-medium">
                        {lesson.title}
                    </h4>

                    {lesson.preview && (
                        <span
                            className="
                                mt-1
                                inline-block
                                rounded-full
                                bg-primary/10
                                px-3
                                py-1
                                text-xs
                                text-primary
                            "
                        >
                            معاينة مجانية
                        </span>
                    )}
                </div>
            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text-secondary
                "
            >
                <HiOutlineClock />

                {lesson.duration}
            </div>
        </div>
    );
};

export default LessonItem;