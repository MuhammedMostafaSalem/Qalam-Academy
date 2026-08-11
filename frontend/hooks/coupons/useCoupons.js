"use client";

import { getCouponsAction } from "@/actions/couponActions";
import { useCallback, useEffect, useState } from "react";

const useCoupons = (queryString = "") => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchCoupons = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getCouponsAction(queryString);

            if (result.success) {
                setCoupons(result.data);
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
        fetchCoupons();
    }, [fetchCoupons]);

    return {
        coupons,
        loading,
        error,
        meta,
        refetch: fetchCoupons,
    };
};

export default useCoupons;
