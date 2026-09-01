"use client";

import Button from "@/components/ui/Button";
import { fadeUp } from "@/lib/animationHelpers";
import {
    HiOutlineEnvelope,
    HiOutlineUser,
    HiOutlineChatBubbleLeftRight,
    HiOutlinePaperAirplane,
    HiOutlinePhone,
} from "react-icons/hi2";
import { useActionState, useState } from "react";
import { submitContactAction } from "@/actions/contactActions";
import { useLanguage } from "@/providers/LanguageProvider";

const ContactForm = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const [state, formAction, isPending] = useActionState(submitContactAction, {
        success: false,
        message: "",
        fieldErrors: {},
    });

    return (
        <div {...fadeUp(300)}>
            <div className="mb-8">
                <h2
                    className="
                        text-3xl
                        font-bold
                        text-text-primary
                    "
                >
                    {isEn ? "Send Us a Message" : "أرسل لنا رسالة"}
                </h2>

                <p
                    className="
                        mt-3
                        text-text-secondary
                        leading-7
                    "
                >
                    {isEn
                        ? "Fill in the form below and a member of our team will get back to you shortly."
                        : "املأ النموذج التالي وسيتواصل معك أحد أعضاء فريقنا في أقرب وقت."}
                </p>
            </div>

            {/* Success message */}
            {state.success && (
                <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 text-success">
                    {state.message}
                </div>
            )}

            {/* Error message */}
            {!state.success && state.message && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                    {state.message}
                </div>
            )}

            <form
                action={formAction}
                className="space-y-6"
            >
                {/* Name & Email */}
                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                    "
                >
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="
                                mb-2
                                block
                                font-medium
                                text-text-primary
                            "
                        >
                            {isEn ? "Full Name" : "الاسم بالكامل"}
                        </label>

                        <div className="relative">
                            <HiOutlineUser
                                className="
                                    absolute
                                    rtl:right-4 rtl:left-auto
                                    ltr:left-4 ltr:right-auto
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    text-text-muted
                                "
                            />

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder={isEn ? "Enter your name" : "أدخل اسمك"}
                                required
                                className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background-alt
                                    rtl:pr-12 rtl:pl-4
                                    ltr:pl-12 ltr:pr-4
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-primary/10
                                "
                            />
                        </div>
                        {(state.fieldErrors?.fullName || state.fieldErrors?.name) && (
                            <p className="mt-1 text-sm text-error">{state.fieldErrors.fullName || state.fieldErrors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="
                                mb-2
                                block
                                font-medium
                                text-text-primary
                            "
                        >
                            {isEn ? "Email Address" : "البريد الإلكتروني"}
                        </label>

                        <div className="relative">
                            <HiOutlineEnvelope
                                className="
                                    absolute
                                    rtl:right-4 rtl:left-auto
                                    ltr:left-4 ltr:right-auto
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    text-text-muted
                                "
                            />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                                className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background-alt
                                    rtl:pr-12 rtl:pl-4
                                    ltr:pl-12 ltr:pr-4
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-primary/10
                                "
                            />
                        </div>
                        {state.fieldErrors?.email && (
                            <p className="mt-1 text-sm text-error">{state.fieldErrors.email}</p>
                        )}
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="
                            mb-2
                            block
                            font-medium
                            text-text-primary
                        "
                    >
                        {isEn ? "Phone Number (Optional)" : "رقم الهاتف (اختياري)"}
                    </label>

                    <div className="relative">
                        <HiOutlinePhone
                            className="
                                absolute
                                rtl:right-4 rtl:left-auto
                                ltr:left-4 ltr:right-auto
                                top-1/2
                                h-5
                                w-5
                                -translate-y-1/2
                                text-text-muted
                            "
                        />

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+20 1XX XXXX XXX"
                            className="
                                h-14
                                w-full
                                rounded-xl
                                border
                                border-border
                                bg-background-alt
                                rtl:pr-12 rtl:pl-4
                                ltr:pl-12 ltr:pr-4
                                outline-none
                                transition-all
                                duration-300
                                focus:border-primary
                                focus:ring-4
                                focus:ring-primary/10
                            "
                        />
                    </div>
                    {state.fieldErrors?.phone && (
                        <p className="mt-1 text-sm text-error">{state.fieldErrors.phone}</p>
                    )}
                </div>

                {/* Subject */}
                <div>
                    <label
                        htmlFor="subject"
                        className="
                            mb-2
                            block
                            font-medium
                            text-text-primary
                        "
                    >
                        {isEn ? "Subject" : "موضوع الرسالة"}
                    </label>

                    <div className="relative">
                        <HiOutlineChatBubbleLeftRight
                            className="
                                absolute
                                rtl:right-4 rtl:left-auto
                                ltr:left-4 ltr:right-auto
                                top-1/2
                                h-5
                                w-5
                                -translate-y-1/2
                                text-text-muted
                            "
                        />

                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            placeholder={isEn ? "Brief subject of your message" : "عنوان مختصر للرسالة"}
                            required
                            className="
                                h-14
                                w-full
                                rounded-xl
                                border
                                border-border
                                bg-background-alt
                                rtl:pr-12 rtl:pl-4
                                ltr:pl-12 ltr:pr-4
                                outline-none
                                transition-all
                                duration-300
                                focus:border-primary
                                focus:ring-4
                                focus:ring-primary/10
                            "
                        />
                    </div>
                    {state.fieldErrors?.subject && (
                        <p className="mt-1 text-sm text-error">{state.fieldErrors.subject}</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="
                            mb-2
                            block
                            font-medium
                            text-text-primary
                        "
                    >
                        {isEn ? "Message" : "الرسالة"}
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder={isEn ? "Type your message here..." : "اكتب رسالتك هنا..."}
                        required
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-background-alt
                            px-4
                            py-4
                            outline-none
                            transition-all
                            duration-300
                            resize-none
                            focus:border-primary
                            focus:ring-4
                            focus:ring-primary/10
                        "
                    />
                    {state.fieldErrors?.message && (
                        <p className="mt-1 text-sm text-error">{state.fieldErrors.message}</p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto flex items-center justify-center gap-2"
                    disabled={isPending}
                >
                    <span>{isPending ? (isEn ? "Sending..." : "جاري الإرسال...") : (isEn ? "Send Message" : "إرسال الرسالة")}</span>

                    <HiOutlinePaperAirplane className="h-5 w-5" />
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;