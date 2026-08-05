"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";

const initialState = {
    email: "",
    password: "",
};

const useLoginForm = () => {
    const router = useRouter();

    const {
        login,
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

        try {
            const res = await login(formData);

            successMessage(res.message);

            router.push("/");
        } catch (err) {
            errorMessage(err.message);
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

export default useLoginForm;