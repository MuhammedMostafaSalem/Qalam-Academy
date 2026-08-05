"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    password: "",
};

const useRegisterForm = () => {
    const router = useRouter();
    const { signup, loading, error, message, fieldErrors, clearFieldError } = useAuth();
    const { successMessage, errorMessage } = useToast();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (fieldErrors[name]) {
            clearFieldError(name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, ...signupData } = formData;

        // if (error) {
        //     errorMessage(error);
        //     console.log(error);
        //     return;
        // }
        
        try {
            const res = await signup({
                ...signupData,
                password,
            });
            
            successMessage(res.message);

            setTimeout(() => {
                router.push(`/verify-otp?email=${formData.email}&type=register`);
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
        error,
        message,
        fieldErrors,
        handleChange,
        handleSubmit,
    }
};

export default useRegisterForm;