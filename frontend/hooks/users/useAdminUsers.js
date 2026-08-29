"use client"

import { getUsersAction } from "@/actions/userActions";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

const useAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const skipRef = useRef(0);

    const buildQuery = useCallback((skip) => {
        const params = new URLSearchParams({ limit: String(LIMIT), skip: String(skip) });
        if (searchQuery) params.set("search", searchQuery);
        if (roleFilter) params.set("role", roleFilter);
        if (statusFilter) params.set("isActive", statusFilter);
        return params.toString();
    }, [roleFilter, searchQuery, statusFilter]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        skipRef.current = 0;
        const res = await getUsersAction(buildQuery(0));
        if (res.success) {
            setUsers(res.data.users || res.data.documents || res.data);
            setHasMore(res.meta?.hasMore ?? false);
        }
        setLoading(false);
    }, [buildQuery]);

    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);

        const nextSkip = skipRef.current + LIMIT;
        const res = await getUsersAction(buildQuery(nextSkip));
        if (res.success) {
            const nextUsers = res.data.users || res.data.documents || res.data || [];
            skipRef.current = nextSkip;
            setUsers((current) => [...current, ...nextUsers]);
            setHasMore(res.meta?.hasMore ?? false);
        }

        setLoadingMore(false);
    }, [buildQuery, hasMore, loadingMore]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setRoleFilter("");
        setStatusFilter("");
        // الـ useEffect المرتبط بالـ fetchUsers هيقوم بالباقي تلقائياً
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 500); // 500ms تأخير بعد ما المستخدم يخلص كتابة

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, fetchUsers]);

    return {
        users,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        fetchUsers,
        loadMore,
        handleClearFilters,
    }
}

export default useAdminUsers
