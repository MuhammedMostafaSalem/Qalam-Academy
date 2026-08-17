"use client";

import { getAdminDashboardAction, getInstructorDashboardAction } from "@/actions/dashboardActions";
import { useAuth } from "@/providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";

const useAdminDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const action = user?.role === "instructor" ? getInstructorDashboardAction : getAdminDashboardAction;
            const result = await action();
            
            if (result.success) {
                setDashboardData(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || "حدث خطأ أثناء جلب البيانات");
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [fetchDashboardData, user]);

    return {
        dashboardData,
        loading,
        error,
        refetch: fetchDashboardData,
    };
};

export default useAdminDashboard;