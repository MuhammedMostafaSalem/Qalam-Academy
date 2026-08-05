import { createSlice } from "@reduxjs/toolkit";

import {
    signup,
    login,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    refreshToken,
    logout,
} from "../thunk/authThunk";


const initialState = {
    loading: false,
    initialized: false,
    error: null,
    success: false,
    accessToken: null,
    user: null,
    message: "",
    fieldErrors: {},
};


const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },

        clearAccessToken(state) {
            state.accessToken = null;
            state.user = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";
            state.fieldErrors = {};
        },

        clearAuthState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";
            state.fieldErrors = {};
        },

        clearFieldError(state, action) {
            // delete state.fieldErrors[action.payload];
            const { [action.payload]: _, ...rest } = state.fieldErrors;
            state.fieldErrors = rest;
        },
    },

    extraReducers: (builder) => {
        builder
            // =====================
            // Signup
            // =====================
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.fieldErrors = {};
            })

            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(signup.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload.message || "Something went wrong";

                state.fieldErrors = action.payload.errors || {};
            })

            // =====================
            // Login
            // =====================
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                // if (action.payload.data?.accessToken) {
                // }
                state.accessToken = action.payload.data.accessToken;

                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.fieldErrors = action.payload.errors;
            })

            // =====================
            // Refresh Token
            // =====================
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.fieldErrors = {};
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.data.accessToken;
                state.user = action.payload.data.user;
                state.initialized = true;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.loading = false;
                state.accessToken = null;
                state.initialized = true;
            })

            // =====================
            // Logout
            // =====================
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.user = null;
                state.initialized = true;
            })


            // =====================
            // Other Actions
            // =====================
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.fieldErrors = {};
            })

            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.fieldErrors = action.payload.errors;
            })

            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.fieldErrors = {};
            })

            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.fieldErrors = action.payload.errors;
            })


            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.fieldErrors = {};
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.fieldErrors = action.payload.errors;
            })



            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.fieldErrors = {};
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.fieldErrors = action.payload.errors;
            });
    },
});


export const {
    setAccessToken,
    clearAccessToken,
    clearAuthState,
    clearFieldError
} = authSlice.actions;


export default authSlice.reducer;