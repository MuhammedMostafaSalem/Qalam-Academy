"use client";

import { getBlogsAction } from "@/actions/blogActions";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

const useBlogs = (queryString = "") => {
    const { language } = useLanguage();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getBlogsAction(queryString);

            if (result.success) {
                setBlogs(result.data);
                setMeta(result.meta);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, [queryString, language]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        blogs,
        loading,
        error,
        meta,
        refetch: fetchBlogs,
    };
};

export default useBlogs;
