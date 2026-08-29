"use client";

import { getStudentsAction } from "@/actions/userActions";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

const useStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const skipRef = useRef(0);

    const buildQuery = useCallback((skip) => {
        const params = new URLSearchParams({ limit: String(LIMIT), skip: String(skip) });
        if (searchQuery) params.set("search", searchQuery);
        if (statusFilter) params.set("isActive", statusFilter);
        return params.toString();
    }, [searchQuery, statusFilter]);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        skipRef.current = 0;
        const res = await getStudentsAction(buildQuery(0));
        if (res.success) {
            setStudents(res.data.users || res.data.documents || res.data);
            setHasMore(res.meta?.hasMore ?? false);
        }
        setLoading(false);
    }, [buildQuery]);

    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);

        const nextSkip = skipRef.current + LIMIT;
        const res = await getStudentsAction(buildQuery(nextSkip));
        if (res.success) {
            const nextStudents = res.data.users || res.data.documents || res.data || [];
            skipRef.current = nextSkip;
            setStudents((current) => [...current, ...nextStudents]);
            setHasMore(res.meta?.hasMore ?? false);
        }

        setLoadingMore(false);
    }, [buildQuery, hasMore, loadingMore]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("");
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStudents();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, fetchStudents]);

    return {
        students,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        fetchStudents,
        loadMore,
        handleClearFilters,
    };
};

export default useStudents;
