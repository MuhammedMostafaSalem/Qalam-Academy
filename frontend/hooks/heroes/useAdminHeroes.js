"use client";

import { useCallback, useEffect, useState } from "react";
import { getHeroesAction } from "@/actions/heroActions";

export function useAdminHeroes() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHeroes = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getHeroesAction("limit=50&sort=sortOrder,page");

            if (result.success) {
                setHeroes(result.data || []);
            } else {
                setError(result.message);
            }
        } catch (fetchError) {
            setError(fetchError?.message || "Failed to load heroes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHeroes();
    }, [fetchHeroes]);

    return { heroes, loading, error, refetch: fetchHeroes };
}

export default useAdminHeroes;
