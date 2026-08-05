import api from "./api";

export const signupApi = (data) =>
    api.post("/auth/signup", data);

export const loginApi = (data) =>
    api.post("/auth/login", data);

export const verifyOtpApi = (data) =>
    api.post("/auth/verify-otp", data);

export const resendOtpApi = (data) =>
    api.post("/auth/resend-otp", data);

export const forgotPasswordApi = (data) =>
    api.post("/auth/forgot-password", data);

export const resetPasswordApi = (data) =>
    api.patch("/auth/reset-password", data);

export const logoutApi = () =>
    api.post("/auth/logout");