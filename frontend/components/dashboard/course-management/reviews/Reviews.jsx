import ReviewsTable from "./ReviewsTable"
import ReviewsToolbar from "./ReviewsToolbar"

const Reviews = ({ courseId }) => {
    return (
        <>
            <ReviewsToolbar />
            <ReviewsTable courseId={courseId} />
        </>
    )
}

export default Reviews
