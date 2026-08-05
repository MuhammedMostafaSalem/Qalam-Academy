import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";

export default function useToast() {
    const dispatch = useDispatch();

    return {
        successMessage: (message) => {
            dispatch(
                showToast({
                    message,
                    type: "success"
                })
            );
        },

        errorMessage: (message) => {
            dispatch(
                showToast({
                    message,
                    type: "error"
                })
            );
        },
    };
}