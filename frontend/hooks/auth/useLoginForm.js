"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { loginAction } from "@/actions/authActions";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useLoginForm = () => {
    const { setUser, setSessionExpiresAt } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    const { language, isRtl } = useLanguage();
    const isEn = language === "en";

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
            // التوجيه للوحة التحكم حسب دور المستخدم
            const roleRedirects = {
                admin: "/dashboard",
                instructor: "/dashboard",
                student: "/user",
            };
            // const redirectPath = roleRedirects[state.data?.user?.role] || "/";
            const redirectPath = "/";
            router.replace(redirectPath);
        } else {
            // console.log(state)
            if (state.fieldErrors) {
                const emailError = state.fieldErrors.email;
                const passwordError = state.fieldErrors.password;

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

                    ...(passwordError && {
                        password:
                            passwordError === "Password is required"
                                ? isEn
                                    ? "Password is required"
                                    : "كلمة المرور مطلوبة"
                                : passwordError === "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                    ? isEn
                                        ? "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                        : "يجب أن تكون كلمة المرور بين 6-20 حرفًا، وتتضمن حرفًا واحدًا على الأقل ورقمًا واحدًا، ويمكن أن تشمل رموز: _@$!%*#?&-"
                                    : passwordError,
                    })
                }))
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
    }, [state, router, setUser, dispatch, isEn]);

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
        isEn,
        isRtl
    };
};

export default useLoginForm;