"use client";

import { useActionState, useEffect, useState } from "react";
import { addCategoryAction } from "@/actions/categoryActions";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";

const initialState = {
    success: false,
    category: null,
    error: null,
    errors: null,

}
const useAddCategory = ({ isOpen, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const [state, formAction, isPending] = useActionState(addCategoryAction, initialState);

    // Form states
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");

    const [descAr, setDescAr] = useState("");
    const [descEn, setDescEn] = useState("");

    const [type, setType] = useState("");

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Reset form
    const resetForm = () => {
        setTitleAr("");
        setTitleEn("");

        setDescAr("");
        setDescEn("");

        setType("");

        setImage(null);
        setImagePreview(null);
    }

    // Handle image
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setImage(null);
            setImagePreview(null);
            return;
        }

        setImage(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }

    // Submit
    const handleSubmit = (formData) => {
        formAction(formData);
    }

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            resetForm();
        }
    }, [isOpen]);

    // Handle success
    useEffect(() => {
        if (!state.success) return;

        resetForm();

        onSuccess?.(state.category);
        // onClose?.();
    }, [state.success]);

    // General error
    useEffect(() => {
        if (!state.error) return;

        dispatch(
            showToast({
                type: "error",
                message: state.error,
            })
        );
    }, [state.error, dispatch]);

    // Cleanup preview URL
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return {
        // Form values
        titleAr,
        titleEn,
        descAr,
        descEn,
        type,
        image,
        imagePreview,

        // Setters
        setTitleAr,
        setTitleEn,
        setDescAr,
        setDescEn,
        setType,

        // Actions
        handleImageChange,
        handleSubmit,
        resetForm,

        // Server action state
        state,
        isPending,
    }
}

export default useAddCategory