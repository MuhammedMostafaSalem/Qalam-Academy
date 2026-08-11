"use client";

import { getCartAction } from "@/actions/cartActions";
import { useCallback, useEffect, useState } from "react";

const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getCartAction();

            if (result.success) {
                setCart(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return {
        cart,
        loading,
        error,
        refetch: fetchCart,
    };
};

export default useCart;
