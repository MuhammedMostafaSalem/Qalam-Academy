"use client"

import { getCategoriesAction } from "@/actions/categoryActions";
import { useCallback, useEffect, useState } from "react";

const useGetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchCategories = useCallback(async () => {
        setLoading(true);

        let query = "";

        if (searchQuery) query += `search=${searchQuery}&`;
        if (typeFilter) query += `type=${typeFilter}&`;
        if (statusFilter) query += `isActive=${statusFilter}&`;

        const res = await getCategoriesAction(query);
        console.log("Categories response:", res);
        if (res.success) {
            setCategories(res.data.categories || res.data.documents || res.data);
        }
        setLoading(false);
    }, [typeFilter, statusFilter, searchQuery]);

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
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,
        fetchCategories,
        handleClearFilters,
    }
}

export default useGetCategories