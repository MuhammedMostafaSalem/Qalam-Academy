"use client";

import { getReviewsAction } from "@/actions/reviewActions";
import { useCallback, useEffect, useState } from "react";

const useReviews = (queryString = "") => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getReviewsAction(queryString);

            if (result.success) {
                setReviews(result.data || []);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, [queryString]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, loading, error, refetch: fetchReviews };
};

export default useReviews;
