"use client";

import { getEnrollmentsAction } from "@/actions/enrollmentActions";
import { useCallback, useEffect, useState } from "react";

const useEnrollments = (queryString = "") => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchEnrollments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getEnrollmentsAction(queryString);

            if (result.success) {
                setEnrollments(result.data);
                setMeta(result.meta);
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
        fetchEnrollments();
    }, [fetchEnrollments]);

    return {
        enrollments,
        loading,
        error,
        meta,
        refetch: fetchEnrollments,
    };
};

export default useEnrollments;
