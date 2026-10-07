"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { forgotPasswordAction } from "@/actions/authActions";
import { useLanguage } from "@/providers/LanguageProvider";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useForgotPasswordForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { language } = useLanguage();
    const isEn = language === "en";

    const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);
    const [errors, setErrors] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            dispatch(
                showToast({
                    message: state.message || "تم إرسال رمز التحقق بنجاح",
                    type: "success",
                })
            );

            // جلب البريد المدخل والتوجيه لصفحة التحقق بغرض إعادة تعيين كلمة المرور
            // const emailInput = document.querySelector("input[name='email']");
            // const email = emailInput ? emailInput.value : "";

            setTimeout(()=> {
                router.push(`/verify-otp?email=${state.email}&purpose=forgot_password`);
            }, 3000)
        } else {
            if (state.message !== "Validation failed") {
                setErrors(state.message);
            }
            if (state.fieldErrors) {
                const emailError = state.fieldErrors.email;

                // setFieldErrors(state.fieldErrors);
                setFieldErrors((prev) => ({
                    ...prev,

                    ...(emailError && {
                        email:
                            emailError === "Email is required"
                                ? isEn
                                    ? "Email is required"
                                    : "البريد الإلكتروني مطلوب"
                                : emailError === "Please enter a valid email address"
                                    ? isEn
                                        ? "Please enter a valid email address"
                                        : "يرجى إدخال عنوان بريد إلكتروني صالح"
                                    : emailError,
                    }),
                }))
            }
        }
    }, [state, router, isEn]);

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
        formAction,
        loading: isPending,
        errors,
        fieldErrors,
        handleInputChange,
        isEn
    };
};

export default useForgotPasswordForm;