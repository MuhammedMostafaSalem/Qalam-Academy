import { configureStore } from '@reduxjs/toolkit'
import toastReducer from "./slices/toastSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        auth: authReducer,
    },
});