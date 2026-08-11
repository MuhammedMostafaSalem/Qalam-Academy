"use client";

import { getMyCoursesAction } from "@/actions/enrollmentActions";
import { useCallback, useEffect, useState } from "react";

const useMyCourses = (queryString = "") => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchMyCourses = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getMyCoursesAction(queryString);

            if (result.success) {
                setCourses(result.data);
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
        fetchMyCourses();
    }, [fetchMyCourses]);

    return {
        courses,
        loading,
        error,
        meta,
        refetch: fetchMyCourses,
    };
};

export default useMyCourses;
