"use client";

import { getStudentsAction } from "@/actions/userActions";
import { useCallback, useEffect, useState } from "react";

const useStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        let query = "";

        if (searchQuery) query += `search=${searchQuery}&`;
        if (statusFilter) query += `isActive=${statusFilter}&`;

        const res = await getStudentsAction(query);
        if (res.success) {
            setStudents(res.data.users || res.data.documents || res.data);
        }
        setLoading(false);
    }, [statusFilter, searchQuery]);

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
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        fetchStudents,
        handleClearFilters,
    };
};

export default useStudents;
