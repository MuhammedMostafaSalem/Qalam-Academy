"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";

const initialState = {
    email: "",
};

const useForgotPasswordForm = () => {
    const router = useRouter();

    const {
        forgotPassword,
        loading,
        fieldErrors,
    } = useAuth();

    const {
        successMessage,
        errorMessage,
    } = useToast();

    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await forgotPassword(formData);

            successMessage(res.message);

            setTimeout(() => {
                router.push(
                    `/verify-otp?email=${formData.email}&type=reset-password`
                );
            }, 3000);

        } catch (err) {
            if (err.message !== "Validation failed") {
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


export default useForgotPasswordForm;