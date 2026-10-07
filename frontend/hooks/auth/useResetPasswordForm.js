"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { resetPasswordAction } from "@/actions/authActions";
import { useLanguage } from "@/providers/LanguageProvider";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const { language } = useLanguage();
    const isEn = language === "en";

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
                const tokenError = state.fieldErrors.token;
                const passwordError = state.fieldErrors.password;
                const confirmPasswordError = state.fieldErrors.confirmPassword;

                // setFieldErrors(state.fieldErrors);
                setFieldErrors((prev) => ({
                    ...prev,

                    ...(tokenError && {
                        token: 
                            tokenError === "Reset token is required"
                                ? isEn
                                    ? "Reset token is required"
                                    : "رمز إعادة التعيين مطلوب"
                                : tokenError,
                    }),

                    ...(passwordError && {
                        password: 
                            passwordError === "password is required"
                                ? isEn
                                    ? "Password is required"
                                    : "كلمة المرور مطلوبة"
                                : passwordError === "Password must be at least 6 characters"
                                    ? isEn
                                        ? "Password must be at least 6 characters"
                                        : "يجب أن تكون كلمة المرور 6 أحرف على الأقل"
                                    : passwordError === "Password must be at most 20 characters"
                                        ? isEn
                                            ? "Password must be at most 20 characters"
                                            : "يجب أن تكون كلمة المرور 20 حرفًا على الأكثر"
                                        : passwordError === "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                            ? isEn
                                                ? "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                                : "يجب أن تكون كلمة المرور 6-20 حرفًا، وتتضمن حرفًا واحدًا ورقمًا واحدًا، ويمكن أن تشمل رموزًا: _@$!%*#?&-"
                                            : passwordError
                    }),

                    ...(confirmPasswordError && {
                        confirmPassword: 
                            confirmPasswordError === "confirm password is required"
                                ? isEn
                                    ? "Confirm password is required"
                                    : "تأكيد كلمة المرور مطلوب"
                                : confirmPasswordError === "Confirm password must be at least 6 characters"
                                    ? isEn
                                        ? "Confirm password must be at least 6 characters"
                                        : "يجب أن يكون تأكيد كلمة المرور 6 أحرف على الأقل"
                                    : confirmPasswordError === "Confirm password must be at most 20 characters"
                                        ? isEn
                                            ? "Confirm password must be at most 20 characters"
                                            : "يجب أن يكون تأكيد كلمة المرور 20 حرفًا على الأكثر"
                                        : confirmPasswordError
                    }),
                }));
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
        token,
        formAction,
        loading: isPending,
        errors,
        fieldErrors,
        handleInputChange,
        isEn
    };
};

export default useResetPasswordForm;