"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { loginAction } from "@/actions/authActions";
import { useAuth } from "@/providers/AuthProvider";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useLoginForm = () => {
    const { setUser, setSessionExpiresAt } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            setUser(state.data.user);
            setSessionExpiresAt(state.sessionExpiresAt);

            dispatch(
                showToast({
                    message: state.message,
                    type: "success",
                })
            );
            // التوجيه للوحة التحكم أو الصفحة الرئيسية بعد تسجيل الدخول بنجاح
            // router.push("/");
            router.replace("/");
        } else {
            // console.log(state)
            if (state.fieldErrors) {
                setFieldErrors(state.fieldErrors);
            }

            if (state.message !== "Validation failed") {
                dispatch(
                    showToast({
                        message: state.message,
                        type: "error",
                    })
                );
            }
        }
    }, [state, router, setUser, dispatch]);

    const handleInputChange = (e) => {
        const { name } = e.target;
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    return {
        formAction,
        loading: isPending,
        fieldErrors,
        handleInputChange,
    };
};

export default useLoginForm;