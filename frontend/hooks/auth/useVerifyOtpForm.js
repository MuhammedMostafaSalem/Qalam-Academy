"use client";

import { resendOtpAction, verifyOtpAction } from "@/actions/authActions";
import { useLanguage } from "@/providers/LanguageProvider";
import { showToast } from "@/store/slices/toastSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const useVerifyOtpForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { language } = useLanguage();
    const isEn = language === "en";

    const [state, formAction, isPending] = useActionState(verifyOtpAction, initialState);
    const [seconds, setSeconds] = useState(60);
    const [errors, setErrors] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const email = searchParams.get("email") || "";
    const purpose = searchParams.get("purpose") || "email_verification";
    const type = purpose === "forgot_password" ? "reset-password" : "email_verification";

    // عداد الوقت لإعادة إرسال الكود
    useEffect(() => {
        if (seconds <= 0) return;
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            dispatch(
                showToast({
                    message: state.message,
                    type: "success",
                })
            );

            if (purpose === "forgot_password") {
                const token = state.data?.resetToken;
                router.push(`/reset-password?token=${token}`);
            } else {
                router.push("/login");
            }
        } else {
            // تحديث الأخطاء الخاصة بالحقول لو موجودة
            if (state.fieldErrors) {
                const emailError = state.fieldErrors.email;
                const otpError = state.fieldErrors.otp;
                const purposeError = state.fieldErrors.purpose;


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
                    
                    ...(otpError && {
                        otp:
                            otpError === "OTP is required"
                                ? isEn
                                    ? "OTP is required"
                                    : "رمز التحقق مطلوب"
                                : otpError === "OTP must be exactly 6 digits"
                                    ? isEn
                                        ? "OTP must be exactly 6 digits"
                                        : "رمز التحقق يجب أن يتكون من 6 أرقام بالضبط"
                                    : otpError === "OTP must contain only numbers"
                                        ? isEn
                                            ? "OTP must contain only numbers"
                                            : "رمز التحقق يجب أن يحتوي على أرقام فقط"
                                        : otpError,
                    }),

                    ...(purposeError && {
                        purpose:
                            purposeError === "Invalid OTP purpose"
                                ? isEn
                                    ? "Invalid OTP purpose"
                                    : "نوع رمز التحقق غير صالح"
                                : purposeError,
                    }),
                }))
            }
            if (state.message !== "Validation failed") {
                setErrors(state.message);
            }
        }
    }, [state, router, dispatch, isEn]);

    const handleInputChange = (e) => {
        const { name } = e.target;
        if (errors) {
            setErrors(null);
        }

        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    }

    const handleResend = async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("purpose", purpose);

        try {
            const response = await resendOtpAction(null, formData);
            if (response.success) {
                setSeconds(60);

                dispatch(
                    showToast({
                        message: response.message,
                        type: "success",
                    })
                )
            } else {
                dispatch(
                    showToast({
                        message: response.message,
                        type: "error",
                    })
                )
            }
        } catch (error) {
            dispatch(
                showToast({
                    message: "فشل إرسال الكود",
                    type: "error",
                })
            )
        }
    }

    return {
        email,
        type,
        seconds,
        formAction,
        loading: isPending,
        errors,
        fieldErrors,
        handleInputChange,
        handleResend,
        isEn
    };
}

export default useVerifyOtpForm;