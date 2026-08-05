import axios from "axios";

const refreshApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    withCredentials: true,
});

export const refreshTokenRequest = () =>
    refreshApi.post("/auth/refresh-token");