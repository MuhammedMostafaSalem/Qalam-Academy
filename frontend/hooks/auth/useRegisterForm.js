"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { signupAction } from "@/actions/authActions";
import useLanguage from "../useLanguage";

const initialState = {
    success: false,
    message: "",
    fieldErrors: {},
};

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    password: "",
};

const useRegisterForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const isEn = language === "en";

    const [state, formAction, isPending] = useActionState(
        signupAction,
        initialState,
    );
    const [fieldErrors, setFieldErrors] = useState({});
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            dispatch(
                showToast({
                    message: state.message,
                    type: "success",
                }),
            );

            setTimeout(() => {
                router.push(
                    `/verify-otp?email=${state.email}&purpose=email_verification`,
                );
            }, 3000);
        } else {
            if (state.fieldErrors) {
                const firstNameError = state.fieldErrors.firstName;
                const lastNameError = state.fieldErrors.lastName;
                const emailError = state.fieldErrors.email;
                const phoneError = state.fieldErrors.phone;
                const countryError = state.fieldErrors.country;
                const cityError = state.fieldErrors.city;
                const addressError = state.fieldErrors.address;
                const passwordError = state.fieldErrors.password;

                setFieldErrors((prev) => ({
                    ...prev,

                    ...(firstNameError && {
                        firstName:
                            firstNameError === "Firstname is required"
                                ? isEn
                                    ? "Firstname is required"
                                    : "الاسم الأول مطلوب"
                                : firstNameError ===
                                    "Firstname must be at least 2 characters"
                                    ? isEn
                                        ? "Firstname must be at least 2 characters"
                                        : "الاسم الأول يجب أن يكون حرفين على الأقل"
                                    : firstNameError ===
                                        "Firstname must be at most 30 characters"
                                        ? isEn
                                            ? "Firstname must be at most 30 characters"
                                            : "الاسم الأول يجب ألا يتجاوز 30 حرفًا"
                                        : firstNameError,
                    }),

                    ...(lastNameError && {
                        lastName:
                            lastNameError === "Lastname is required"
                                ? isEn
                                    ? "Lastname is required"
                                    : "اسم العائلة مطلوب"
                                : lastNameError ===
                                    "Lastname must be at least 2 characters"
                                    ? isEn
                                        ? "Lastname must be at least 2 characters"
                                        : "اسم العائلة يجب أن يكون حرفين على الأقل"
                                    : lastNameError ===
                                        "Lastname must be at most 30 characters"
                                        ? isEn
                                            ? "Lastname must be at most 30 characters"
                                            : "اسم العائلة يجب ألا يتجاوز 30 حرفًا"
                                        : lastNameError,
                    }),

                    ...(emailError && {
                        email:
                            emailError === "Email is required"
                                ? isEn
                                    ? "Email is required"
                                    : "البريد الإلكتروني مطلوب"
                                : emailError === "Please enter a valid email address"
                                    ? isEn
                                        ? "Please enter a valid email address"
                                        : "يرجى إدخال عنوان بريد إلكتروني صالح"
                                    : emailError ===
                                        "Temporary or disposable email addresses are not allowed"
                                        ? isEn
                                            ? "Temporary or disposable email addresses are not allowed"
                                            : "لا يُسمح باستخدام البريد الإلكتروني المؤقت"
                                        : emailError,
                    }),

                    ...(phoneError && {
                        phone:
                            phoneError === "Phone number is required"
                                ? isEn
                                    ? "Phone number is required"
                                    : "رقم الهاتف مطلوب"
                                : phoneError ===
                                    "Please enter a valid phone number in international format."
                                    ? isEn
                                        ? "Please enter a valid phone number in international format."
                                        : "يرجى إدخال رقم هاتف صالح بالصيغة الدولية"
                                    : phoneError,
                    }),

                    ...(countryError && {
                        country:
                            countryError === "Country is required"
                                ? isEn
                                    ? "Country is required"
                                    : "الدولة مطلوبة"
                                : countryError ===
                                    "Country must be at least 2 characters"
                                    ? isEn
                                        ? "Country must be at least 2 characters"
                                        : "الدولة يجب أن تكون حرفين على الأقل"
                                    : countryError ===
                                        "Country must be at most 100 characters"
                                        ? isEn
                                            ? "Country must be at most 100 characters"
                                            : "الدولة يجب ألا تتجاوز 100 حرف"
                                        : countryError,
                    }),

                    ...(cityError && {
                        city:
                            cityError === "City is required"
                                ? isEn
                                    ? "City is required"
                                    : "المدينة مطلوبة"
                                : cityError ===
                                    "City must be at least 2 characters"
                                    ? isEn
                                        ? "City must be at least 2 characters"
                                        : "المدينة يجب أن تكون حرفين على الأقل"
                                    : cityError ===
                                        "City must be at most 100 characters"
                                        ? isEn
                                            ? "City must be at most 100 characters"
                                            : "المدينة يجب ألا تتجاوز 100 حرف"
                                        : cityError,
                    }),

                    ...(addressError && {
                        address:
                            addressError === "Address is required"
                                ? isEn
                                    ? "Address is required"
                                    : "العنوان مطلوب"
                                : addressError ===
                                    "Address must be at least 2 characters"
                                    ? isEn
                                        ? "Address must be at least 2 characters"
                                        : "العنوان يجب أن يكون حرفين على الأقل"
                                    : addressError ===
                                        "Address must be at most 300 characters"
                                        ? isEn
                                            ? "Address must be at most 300 characters"
                                            : "العنوان يجب ألا يتجاوز 300 حرف"
                                        : addressError,
                    }),

                    ...(passwordError && {
                        password:
                            passwordError === "Password is required"
                                ? isEn
                                    ? "Password is required"
                                    : "كلمة المرور مطلوبة"
                                : passwordError ===
                                    "Password must be at least 6 characters"
                                    ? isEn
                                        ? "Password must be at least 6 characters"
                                        : "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
                                    : passwordError ===
                                        "Password must be at most 20 characters"
                                        ? isEn
                                            ? "Password must be at most 20 characters"
                                            : "كلمة المرور يجب ألا تتجاوز 20 حرفًا"
                                        : passwordError ===
                                        "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                        ? isEn
                                            ? "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
                                            : "كلمة المرور يجب أن تكون 6-20 حرفًا، وتتضمن حرفًا واحدًا على الأقل ورقمًا واحدًا، ويمكن أن تشمل رموزًا: _@$!%*#?&-"
                                        : passwordError,
                    }),
                }));
            }

            if (state.message !== "Validation failed") {
                dispatch(
                    showToast({
                        message: state.message,
                        type: "error",
                    }),
                );
            }
        }
    }, [state, router, dispatch, isEn]);

    // دالة لمسح خطأ الحقل بمجرد أن يبدأ المستخدم في الكتابة بداخله
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // حفظ قيمة الحقل
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // مسح error الحقل أثناء الكتابة
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    // Phone input
    const handlePhoneChange = (value) => {
        // const formattedPhone = value ? `+${value}` : "";
        console.log("value:", value);
        //  console.log("formattedPhone:", formattedPhone);
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));

        if (fieldErrors.phone) {
            setFieldErrors((prev) => ({
                ...prev,
                phone: null,
            }));
        }
    };

    return {
        formAction,
        loading: isPending,
        fieldErrors,
        handleInputChange,
        handlePhoneChange,
        formData,
        isEn
    };
};

export default useRegisterForm;
