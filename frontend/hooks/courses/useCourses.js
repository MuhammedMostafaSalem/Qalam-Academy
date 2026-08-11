"use client";

import { getCoursesAction } from "@/actions/courseActions";
import { useCallback, useEffect, useState } from "react";

const useCourses = (queryString = "") => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getCoursesAction(queryString);

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
        fetchCourses();
    }, [fetchCourses]);

    return {
        courses,
        loading,
        error,
        meta,
        refetch: fetchCourses,
    };
};

export default useCourses;
