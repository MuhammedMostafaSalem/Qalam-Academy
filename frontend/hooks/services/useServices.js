"use client";

import { getServicesAction } from "@/actions/serviceActions";
import { useCallback, useEffect, useState } from "react";

const useServices = (queryString = "") => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getServicesAction(queryString);

            if (result.success) {
                setServices(result.data);
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
        fetchServices();
    }, [fetchServices]);

    return {
        services,
        loading,
        error,
        meta,
        refetch: fetchServices,
    };
};

export default useServices;
