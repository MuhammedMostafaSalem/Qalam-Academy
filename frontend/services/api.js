import axios from "axios";
import { refreshTokenRequest } from "./refreshApi";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    withCredentials: true,
});

// متغير داخلي لحفظ الـ Access Token مؤقتاً في الذاكرة لتجنب الاستيراد الدائري
let memoryAccessToken = null;

export const setMemoryAccessToken = (token) => {
    memoryAccessToken = token;
};

// ================================
// Request Interceptor
// ================================
api.interceptors.request.use(
    (config) => {
        if (memoryAccessToken) {
            config.headers.Authorization = `Bearer ${memoryAccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ================================
// Refresh Queue & Response Interceptor
// ================================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isRefreshRequest = originalRequest.url.includes("/auth/refresh-token");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRequest
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await refreshTokenRequest();
                const newToken = res.data.data.accessToken;

                // تحديث الـ token في الذاكرة
                setMemoryAccessToken(newToken);

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                setMemoryAccessToken(null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;