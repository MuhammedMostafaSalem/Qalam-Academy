import { useDispatch, useSelector } from "react-redux";

import {
    forgotPassword,
    login,
    logout,
    resendOtp,
    resetPassword,
    signup,
    verifyOtp,
    refreshToken,
} from "@/store/thunk/authThunk";
import { clearFieldError } from "@/store/slices/authSlice";


export default function useAuth() {
    const dispatch = useDispatch();


    const auth = useSelector(
        (state) => state.auth
    );

    return {
        ...auth,

        isAuthenticated: !!auth.accessToken,

        signup: (data) =>
            dispatch(signup(data)).unwrap(),

        login: (data) =>
            dispatch(login(data)).unwrap(),

        verifyOtp: (data) =>
            dispatch(verifyOtp(data)).unwrap(),

        resendOtp: (data) =>
            dispatch(resendOtp(data)).unwrap(),

        forgotPassword: (data) =>
            dispatch(forgotPassword(data)).unwrap(),

        resetPassword: (data) =>
            dispatch(resetPassword(data)).unwrap(),

        refreshToken: () =>
            dispatch(refreshToken()).unwrap(),

        logout: () =>
            dispatch(logout()).unwrap(),

        clearFieldError: (field) =>
            dispatch(clearFieldError(field)),
    };
}