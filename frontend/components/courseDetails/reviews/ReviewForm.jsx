"use client";

import { useState } from "react";
import { HiStar } from "react-icons/hi2";
import { createReviewAction } from "@/actions/reviewActions";

const ReviewForm = ({ courseId, onSuccess, onCancel }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            setError("الرجاء اختيار تقييم");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("courseId", courseId);
            formData.append("rating", rating.toString());
            formData.append("comment", comment);

            const result = await createReviewAction(null, formData);

            if (result.success) {
                // Reset form
                setRating(0);
                setComment("");
                onSuccess();
            } else {
                setError(result.message || "فشل إرسال التقييم");
            }
        } catch (err) {
            setError("حدث خطأ أثناء إرسال التقييم");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-7
            "
        >
            <h3 className="text-lg font-bold mb-5">أضف تقييمك</h3>

            {/* Star Rating */}
            <div className="mb-5">
                <label className="mb-3 block text-sm font-medium">
                    التقييم <span className="text-error">*</span>
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                        >
                            <HiStar
                                size={32}
                                className={
                                    star <= (hoveredRating || rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                }
                            />
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <p className="mt-2 text-sm text-text-secondary">
                        {rating === 5 ? "ممتاز!" : rating === 4 ? "جيد جداً" : rating === 3 ? "جيد" : rating === 2 ? "مقبول" : "ضعيف"}
                    </p>
                )}
            </div>

            {/* Comment */}
            <div className="mb-5">
                <label 
                    htmlFor="comment" 
                    className="mb-3 block text-sm font-medium"
                >
                    التعليق (اختياري)
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="شاركنا رأيك في الكورس..."
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-primary
                        resize-none
                    "
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-5 rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
                    {error}
                </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={loading || rating === 0}
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
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    {loading ? "جاري الإرسال..." : "إرسال التقييم"}
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        rounded-xl
                        border
                        border-border
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        transition
                        hover:bg-background-alt
                        disabled:opacity-50
                    "
                >
                    إلغاء
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
