"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "@/store/slices/toastSlice";

const Toast = () => {
    const dispatch = useDispatch();
    const {
        message,
        type,
        visible
    } = useSelector(
        state => state.toast
    );

    useEffect(() => {
        if (!visible)
            return;

        const timer = setTimeout(() => {
            dispatch(hideToast());
        }, 3000);

        return () => clearTimeout(timer);
    }, [
        visible,
        dispatch
    ]);


    if (!visible)
        return null;

    return (
        <div
            className={`
                fixed
                top-5
                right-5
                z-50
                min-w-[300px]
                rounded-2xl
                px-5
                py-4
                text-white
                shadow-xl
                transition-all
                duration-300

                ${type === "success"
                    ?
                    "bg-green-500"
                    :
                    "bg-red-500"
                }

            `}
        >
            {message}
        </div>
    );
};


export default Toast;