"use client";

import { getTeamAction } from "@/actions/teamActions";
import { useCallback, useEffect, useState } from "react";

const useTeam = (queryString = "") => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchTeam = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getTeamAction(queryString);

            if (result.success) {
                setTeam(result.data);
                setMeta(result.meta);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, [queryString]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    return {
        team,
        loading,
        error,
        meta,
        refetch: fetchTeam,
    };
};

export default useTeam;
