import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    forgotPasswordApi,
    loginApi,
    logoutApi,
    resendOtpApi,
    resetPasswordApi,
    signupApi,
    verifyOtpApi,
} from "@/services/authApi";
import { refreshTokenRequest } from "@/services/refreshApi";
import { setMemoryAccessToken } from "@/services/api"; // <-- استيراد دالة تعيين الـ token في الذاكرة
import handleApiError from "@/utils/handleApiError";

const handleError = (error) => {
    return {
        message:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong",

        errors:
            error.response?.data?.errors || {},
    }
}

// Signup
export const signup = createAsyncThunk(
    "auth/signup",
    async (data, thunkAPI) => {
        try {
            const res = await signupApi(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Login
export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginApi(data);
            const responseData = res.data;

            // لو الـ Access Token موجود، قم بتمريره للـ API مباشرة
            const accessToken = responseData.data?.accessToken;
            if (accessToken) {
                setMemoryAccessToken(accessToken);
            }

            return responseData;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (data, thunkAPI) => {
        try {
            const res = await verifyOtpApi(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Resend OTP
export const resendOtp = createAsyncThunk(
    "auth/resendOtp",
    async (data, thunkAPI) => {
        try {
            const res = await resendOtpApi(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data, thunkAPI) => {
        try {
            const res = await forgotPasswordApi(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, thunkAPI) => {
        try {
            const res = await resetPasswordApi(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Refresh Token
export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
        try {
            const res = await refreshTokenRequest();
            const responseData = res.data;

            // تحديث الـ Access Token الجديد في الذاكرة
            const newToken = responseData.data?.accessToken;
            if (newToken) {
                setMemoryAccessToken(newToken);
            }

            return responseData;
        } catch (err) {
            // لو حصل خطأ في التجديد، نصفر الـ token في الذاكرة
            setMemoryAccessToken(null);
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const res = await logoutApi();

            // عند تسجيل الخروج، نمسح الـ token من الذاكرة
            setMemoryAccessToken(null);

            return res.data;
        } catch (err) {
            // حتى لو فشل الطلب بالخروج، الأفضل نمسحه محلياً أيضاً
            setMemoryAccessToken(null);
            return thunkAPI.rejectWithValue(handleApiError(err));
        }
    }
);