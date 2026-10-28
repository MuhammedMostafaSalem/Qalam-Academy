
"use client";

import { getAllUsersAction } from "@/actions/userActions";
import { useEffect, useState } from "react";

export default function useUserStats() {
    const [stats, setStats] = useState({
        instructors: 0,
        students: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchStats() {
            try {
                const result = await getAllUsersAction();

                if (!result.success || !isMounted) return;

                const users = Array.isArray(result.data?.users)
                    ? result.data.users
                    : Array.isArray(result.data)
                        ? result.data
                        : [];

                setStats({
                    instructors: users.filter(
                        (user) => user.role === "instructor"
                    ).length,

                    students: users.filter(
                        (user) => user.role === "student"
                    ).length,

                    totalUsers: users.length,
                });
            } catch (error) {
                console.error("Failed to fetch user stats:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchStats();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        stats,
        loading,
    };
}
