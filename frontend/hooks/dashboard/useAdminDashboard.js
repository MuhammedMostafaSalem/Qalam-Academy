"use client";

import { getAdminDashboardAction } from "@/actions/dashboardActions";
import { useCallback, useEffect, useState } from "react";

const useAdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await getAdminDashboardAction();
            
            if (result.success) {
                setDashboardData(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        dashboardData,
        loading,
        error,
        refetch: fetchDashboardData,
    };
};

export default useAdminDashboard;