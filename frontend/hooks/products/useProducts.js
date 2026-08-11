"use client";

import { getProductsAction } from "@/actions/productActions";
import { useCallback, useEffect, useState } from "react";

const useProducts = (queryString = "") => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getProductsAction(queryString);

            if (result.success) {
                setProducts(result.data);
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
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        meta,
        refetch: fetchProducts,
    };
};

export default useProducts;
