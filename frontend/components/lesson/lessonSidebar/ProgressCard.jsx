import lessonData from "../lessonData";

const ProgressCard = () => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-border
                bg-background
                p-5
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >
                <h3 className="font-semibold">
                    تقدمك
                </h3>

                <span className="text-primary font-bold">
                    {lessonData.progress}%
                </span>
            </div>

            <div
                className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-background-alt
                "
            >
                <div
                    className="h-full rounded-full bg-primary"
                    style={{
                        width: `${lessonData.progress}%`,
                    }}
                />
            </div>

            <div
                className="
                    mt-4
                    flex
                    justify-between
                    text-sm
                    text-text-secondary
                "
            >
                <span>
                    {lessonData.completedLessons} / {lessonData.totalLessons}
                </span>

                <span>
                    درس مكتمل
                </span>
            </div>
        </div>
    );
};

export default ProgressCard;