"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getReviewsAction } from "@/actions/reviewActions";
import ReviewForm from "./ReviewForm";

const ReviewsList = ({ courseId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const fetchReviews = async () => {
        try {
            const result = await getReviewsAction(`course=${courseId}`);
            if (result.success) {
                setReviews(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) {
            fetchReviews();
        }
    }, [courseId]);

    const handleReviewSubmitted = () => {
        setShowForm(false);
        fetchReviews(); // Refresh reviews list
    };

    if (loading) {
        return (
            <div className="py-8 text-center text-text-secondary">
                جاري تحميل التقييمات...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Add Review Button */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">جميع التقييمات</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="
                        rounded-xl
                        bg-primary
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                    "
                >
                    {showForm ? "إلغاء" : "أضف تقييمك"}
                </button>
            </div>

            {/* Review Form */}
            {showForm && (
                <ReviewForm 
                    courseId={courseId} 
                    onSuccess={handleReviewSubmitted}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <div className="py-16 text-center text-text-secondary">
                    لا توجد تقييمات حتى الآن. كن أول من يقيم هذا الكورس!
                </div>
            ) : (
                <div className="grid gap-6">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsList;