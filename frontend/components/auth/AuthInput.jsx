"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const AuthInput = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    // value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background-alt
                        px-5
                        ${type === "password" ? "rtl:pl-12 ltr:pr-12" : ""}
                        outline-none
                        transition-all
                        duration-300
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/20
                    `}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="
                            absolute
                            rtl:left-5 rtl:right-auto
                            ltr:right-5 ltr:left-auto
                            top-1/2
                            -translate-y-1/2
                            text-text-secondary
                            hover:text-primary
                        "
                    >
                        {showPassword ? (
                            <HiEyeSlash size={20} />
                        ) : (
                            <HiEye size={20} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AuthInput;
