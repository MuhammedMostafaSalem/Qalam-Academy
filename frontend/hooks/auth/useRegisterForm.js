"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { signupAction } from "@/actions/authActions";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useRegisterForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [state, formAction, isPending] = useActionState(signupAction, initialState);
    const [fieldErrors, setFieldErrors] = useState({});
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            dispatch(
                showToast({
                    message: state.message,
                    type: "success",
                })
            );

            setTimeout(() => {
                router.push(`/verify-otp?email=${state.email}&purpose=email_verification`);
            }, 3000);
        } else {
            if (state.fieldErrors) {
                setFieldErrors(state.fieldErrors);
            }
        }
    }, [state, router, dispatch]);

    // دالة لمسح خطأ الحقل بمجرد أن يبدأ المستخدم في الكتابة بداخله
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

export default useRegisterForm;