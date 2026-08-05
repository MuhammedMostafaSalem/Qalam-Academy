"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";


const initialState = {
    password: "",
    confirmPassword: "",
};


const useResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const {
        resetPassword,
        loading,
        fieldErrors,
    } = useAuth();


    const {
        successMessage,
        errorMessage,
    } = useToast();


    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            errorMessage("رمز إعادة التعيين غير موجود");
            return;
        }

        try {
            const res = await resetPassword({
                token,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            successMessage(res.message);

            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err) {
            console.log(err.message);
            if (err.message !== "Validation failed" && err.message !== "كلمتا المرور غير متطابقتين") {
                errorMessage(err.message);
            }
        }
    };


    return {
        formData,
        loading,
        fieldErrors,
        handleChange,
        handleSubmit,
    };
};

export default useResetPasswordForm;