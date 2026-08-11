import {
    HiStar,
    HiUserCircle,
} from "react-icons/hi2";

const ReviewCard = ({ review }) => {
    const userName = review.user 
        ? `${review.user.firstName || ''} ${review.user.lastName || ''}`.trim()
        : "مستخدم";
    
    const createdAt = review.createdAt 
        ? new Date(review.createdAt).toLocaleDateString('ar-EG', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
        : "";

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
                            {userName}
                        </h3>

                        <p className="text-sm text-text-secondary">
                            {createdAt}
                        </p>
                    </div>
                </div>

                <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <HiStar 
                            key={index} 
                            size={18}
                            className={index < review.rating ? "" : "opacity-30"}
                        />
                    ))}
                </div>
            </div>

            {review.comment && (
                <p
                    className="
                        mt-6
                        leading-8
                        text-text-secondary
                    "
                >
                    {review.comment}
                </p>
            )}
        </div>
    );
};

export default ReviewCard;