import ReviewCard from "./ReviewCard";
import reviews from "./reviews";

const ReviewsList = () => {
    return (
        <div className="grid gap-6">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                />
            ))}
        </div>
    );
};

export default ReviewsList;