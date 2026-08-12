"use client"

import { getCategoriesAction } from "@/actions/categoryActions";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

const useGetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const skipRef = useRef(0);

    const buildQuery = useCallback((skip) => {
        let query = `limit=${LIMIT}&skip=${skip}&`;

        if (searchQuery) query += `search=${searchQuery}&`;
        if (typeFilter) query += `type=${typeFilter}&`;
        if (statusFilter) query += `isActive=${statusFilter}&`;

        return query;
    }, [searchQuery, typeFilter, statusFilter]);

    const fetchCategories = useCallback(async () => {
        setLoading(true);

        skipRef.current = 0;

        const res = await getCategoriesAction(buildQuery(0));

        if (res.success) {
            const list = res.data?.categories || res.data?.documents || res.data || [];
            setCategories(list);
            setHasMore(res.meta?.hasMore ?? false);
        }

        setLoading(false);
    }, [buildQuery]);

    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        const nextSkip = skipRef.current + LIMIT;
        const res = await getCategoriesAction(buildQuery(nextSkip));

        if (res.success) {
            const list = res.data?.categories || res.data?.documents || res.data || [];
            skipRef.current = nextSkip;
            setCategories((prev) => [...prev, ...list]);
            setHasMore(res.meta?.hasMore ?? false);
        }

        setLoadingMore(false);
    }, [buildQuery, hasMore, loadingMore]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setTypeFilter("");
        setStatusFilter("");
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchCategories();
        }, 500); // 500ms تأخير بعد ما المستخدم يخلص كتابة

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, fetchCategories]);

    return {
        categories,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,
        fetchCategories,
        loadMore,
        handleClearFilters,
    }
}

export default useGetCategories
