import { HiStar } from "react-icons/hi2";

const ReviewSummary = () => {
    return (
        <div
            className="
                mb-12
                rounded-3xl
                border
                border-border
                bg-card
                p-8
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>
                    <h3 className="text-6xl font-bold">
                        4.9
                    </h3>

                    <div className="mt-3 flex gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HiStar key={index} size={22} />
                        ))}
                    </div>

                    <p className="mt-3 text-text-secondary">
                        بناءً على 1,248 تقييم
                    </p>
                </div>

                <div className="flex-1 space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div
                            key={star}
                            className="flex items-center gap-4"
                        >
                            <span className="w-6">{star}</span>

                            <div className="h-2 flex-1 rounded-full bg-background-alt">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width:
                                            star === 5
                                                ? "82%"
                                                : star === 4
                                                    ? "12%"
                                                    : star === 3
                                                        ? "4%"
                                                        : "1%",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewSummary;