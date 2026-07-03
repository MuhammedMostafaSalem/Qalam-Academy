import {
    HiStar,
    HiUserCircle,
} from "react-icons/hi2";

const ReviewCard = ({
    review,
}) => {
    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-7
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    flex-wrap
                "
            >
                <div className="flex items-center gap-4">

                    <HiUserCircle
                        size={50}
                        className="text-primary"
                    />

                    <div>
                        <h3 className="font-semibold">
                            {review.name}
                        </h3>

                        <p className="text-sm text-text-secondary">
                            {review.date}
                        </p>
                    </div>

                </div>

                <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, index) => (
                        <HiStar key={index} size={18} />
                    ))}
                </div>
            </div>

            <p
                className="
                    mt-6
                    leading-8
                    text-text-secondary
                "
            >
                {review.comment}
            </p>
        </div>
    );
};

export default ReviewCard;