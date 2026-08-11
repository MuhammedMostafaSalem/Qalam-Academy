"use client";

import { getPortfoliosAction } from "@/actions/portfolioActions";
import { useCallback, useEffect, useState } from "react";

const usePortfolios = (queryString = "") => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchPortfolios = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getPortfoliosAction(queryString);

            if (result.success) {
                setPortfolios(result.data);
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
        fetchPortfolios();
    }, [fetchPortfolios]);

    return {
        portfolios,
        loading,
        error,
        meta,
        refetch: fetchPortfolios,
    };
};

export default usePortfolios;
