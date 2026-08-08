"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { resetPasswordAction } from "@/actions/authActions";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const token = searchParams.get("token") || "";

    const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);
    const [errors, setErrors] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            dispatch(
                showToast({
                    message: state.message || "تم تغيير كلمة المرور بنجاح",
                    type: "success",
                })
            );
            router.push("/login");
        } else {
            if (state.message !== "Validation failed") {
                setErrors(state.message);
            }

            if (state.fieldErrors) {
                setFieldErrors(state.fieldErrors);
            }
        }
    }, [state, router]);

    const handleInputChange = (e) => {
        const { name } = e.target;

        if (errors) {
            setErrors(null);
        }

        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    return {
        token,
        formAction,
        loading: isPending,
        errors,
        fieldErrors,
        handleInputChange,
    };
};

export default useResetPasswordForm;