"use client"

import { getUsersAction } from "@/actions/userActions";
import { useCallback, useEffect, useState } from "react";

const useAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        let query = "";

        if (searchQuery) query += `search=${searchQuery}&`;
        if (roleFilter) query += `role=${roleFilter}&`;
        if (statusFilter) query += `isActive=${statusFilter}&`;

        const res = await getUsersAction(query);
        if (res.success) {
            // اعتماداً على بنية الـ API عندك، لو البيانات راجعة في documents أو users
            setUsers(res.data.users || res.data.documents || res.data);
        }
        setLoading(false);
    }, [roleFilter, statusFilter, searchQuery]);

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
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        fetchUsers,
        handleClearFilters,
    }
}

export default useAdminUsers