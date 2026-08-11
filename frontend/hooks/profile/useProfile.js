"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { useAuth } from "@/providers/AuthProvider";
import { updateProfileAction, changePasswordAction } from "@/actions/userActions";

const useProfile = () => {
    const { user, refreshUser } = useAuth();
    const dispatch = useDispatch();

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const handleUpdateProfile = async (formData) => {
        if (!user?._id) return;

        setLoadingProfile(true);
        try {
            const result = await updateProfileAction(user._id, formData);

            if (result.success) {
                dispatch(showToast({ message: result.message, type: "success" }));
                await refreshUser();
            } else {
                dispatch(showToast({ message: result.message, type: "error" }));
            }

            return result;
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleChangePassword = async (formData) => {
        if (!user?._id) return;

        setLoadingPassword(true);
        try {
            const result = await changePasswordAction(user._id, formData);

            if (result.success) {
                dispatch(showToast({ message: result.message, type: "success" }));
            } else {
                dispatch(showToast({ message: result.message, type: "error" }));
            }

            return result;
        } finally {
            setLoadingPassword(false);
        }
    };

    return {
        user,
        loadingProfile,
        loadingPassword,
        handleUpdateProfile,
        handleChangePassword,
    };
};

export default useProfile;
