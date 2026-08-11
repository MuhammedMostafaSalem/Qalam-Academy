"use client";

import { getOrdersAction } from "@/actions/orderActions";
import { useCallback, useEffect, useState } from "react";

const useOrders = (queryString = "") => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getOrdersAction(queryString);

            if (result.success) {
                setOrders(result.data);
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
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        meta,
        refetch: fetchOrders,
    };
};

export default useOrders;
