import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { useCallback, useMemo } from "react";

export default function useToast() {
    const dispatch = useDispatch();

    const successMessage = useCallback((message) => {
        dispatch(showToast({ message, type: "success" }));
    }, [dispatch]);

    const errorMessage = useCallback((message) => {
        dispatch(showToast({ message, type: "error" }));
    }, [dispatch]);

    return useMemo(() => ({ successMessage, errorMessage }), [errorMessage, successMessage]);
}
