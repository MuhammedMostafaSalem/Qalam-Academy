"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import {
    getWishlistAction,
    addToWishlistAction,
    removeFromWishlistAction,
} from "@/actions/wishlistActions";

const useWishlist = () => {
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = useCallback(async () => {
        setLoading(true);
        const result = await getWishlistAction();

        if (result.success) {
            setWishlist(result.data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const addToWishlist = async (courseId) => {
        const result = await addToWishlistAction(courseId);

        if (result.success) {
            dispatch(showToast({ message: result.message, type: "success" }));
            fetchWishlist();
        } else {
            dispatch(showToast({ message: result.message, type: "error" }));
        }

        return result;
    };

    const removeFromWishlist = async (courseId) => {
        const result = await removeFromWishlistAction(courseId);

        if (result.success) {
            dispatch(showToast({ message: result.message, type: "success" }));
            setWishlist((prev) => prev.filter((c) => c._id !== courseId));
        } else {
            dispatch(showToast({ message: result.message, type: "error" }));
        }

        return result;
    };

    return {
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
    };
};

export default useWishlist;
