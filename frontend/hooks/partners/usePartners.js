"use client";

import { getPartnersAction } from "@/actions/partnerActions";
import { useCallback, useEffect, useState } from "react";

const usePartners = (queryString = "") => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchPartners = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getPartnersAction(queryString);

            if (result.success) {
                setPartners(result.data);
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
        fetchPartners();
    }, [fetchPartners]);

    return {
        partners,
        loading,
        error,
        meta,
        refetch: fetchPartners,
    };
};

export default usePartners;
