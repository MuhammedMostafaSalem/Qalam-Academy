"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";


const useVerifyOtpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email");
    const type = searchParams.get("type") || "signup";


    const {
        verifyOtp,
        resendOtp,
        loading,
        error,
        fieldErrors,
        message,
    } = useAuth();


    const {
        successMessage,
        errorMessage,
    } = useToast();


    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(60);



    useEffect(() => {
        if (!email) {
            router.replace("/register");
        }
    }, [email, router]);



    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);



    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 6) {
            setOtp(value);
        }
    };



    const getPurpose = () => {
        return type === "reset-password"
            ? "forgot_password"
            : "email_verification";
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) return;

        try {
            const res = await verifyOtp({
                email,
                otp,
                purpose: getPurpose(),
            });

            successMessage("تم التحقق بنجاح");

            if (type === "reset-password") {
                const resetToken = res.data.resetToken;

                router.push(`/reset-password?token=${resetToken}`);
            } else {
                router.push("/login");
            }
        } catch (err) {
            console.log(error)
            console.log(err.message)
            if (err.message !== "Invalid OTP") {
                errorMessage(err.message);
            }
        }
    };



    const handleResend = async () => {
        if (seconds > 0) return;


        try {
            await resendOtp({
                email,
                purpose: getPurpose(),
            });


            successMessage(
                "تم إعادة إرسال الرمز"
            );

            setSeconds(60);


        } catch (err) {
            errorMessage(err.message);
        }
    };



    return {
        email,
        type,
        otp,
        seconds,
        loading,
        error,
        message,
        handleOtpChange,
        handleSubmit,
        handleResend,
    };
};


export default useVerifyOtpForm;