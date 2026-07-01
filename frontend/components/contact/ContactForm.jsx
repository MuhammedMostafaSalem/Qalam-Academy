"use client";

import Button from "@/components/ui/Button";
import {
    HiOutlineEnvelope,
    HiOutlineUser,
    HiOutlineChatBubbleLeftRight,
    HiOutlinePaperAirplane,
} from "react-icons/hi2";

const ContactForm = () => {
    return (
        <div>

            <div className="mb-8">

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-text-primary
                    "
                >
                    أرسل لنا رسالة
                </h2>

                <p
                    className="
                        mt-3
                        text-text-secondary
                        leading-7
                    "
                >
                    املأ النموذج التالي وسيتواصل معك أحد أعضاء فريقنا
                    في أقرب وقت.
                </p>

            </div>

            <form
                className="
                    space-y-6
                "
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
                            htmlFor="name"
                            className="
                                mb-2
                                block
                                font-medium
                                text-text-primary
                            "
                        >
                            الاسم بالكامل
                        </label>

                        <div className="relative">

                            <HiOutlineUser
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    text-text-muted
                                "
                            />

                            <input
                                id="name"
                                type="text"
                                placeholder="أدخل اسمك"
                                className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background-alt
                                    pr-12
                                    pl-4
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-primary/10
                                "
                            />

                        </div>

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
                            البريد الإلكتروني
                        </label>

                        <div className="relative">

                            <HiOutlineEnvelope
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    text-text-muted
                                "
                            />

                            <input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background-alt
                                    pr-12
                                    pl-4
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-primary/10
                                "
                            />

                        </div>

                    </div>

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
                        موضوع الرسالة
                    </label>

                    <div className="relative">

                        <HiOutlineChatBubbleLeftRight
                            className="
                                absolute
                                right-4
                                top-1/2
                                h-5
                                w-5
                                -translate-y-1/2
                                text-text-muted
                            "
                        />

                        <input
                            id="subject"
                            type="text"
                            placeholder="عنوان مختصر للرسالة"
                            className="
                                h-14
                                w-full
                                rounded-xl
                                border
                                border-border
                                bg-background-alt
                                pr-12
                                pl-4
                                outline-none
                                transition-all
                                duration-300
                                focus:border-primary
                                focus:ring-4
                                focus:ring-primary/10
                            "
                        />

                    </div>

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
                        الرسالة
                    </label>

                    <textarea
                        id="message"
                        rows={6}
                        placeholder="اكتب رسالتك هنا..."
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

                </div>

                {/* Submit */}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto"
                >
                    إرسال الرسالة

                    <HiOutlinePaperAirplane className="h-5 w-5" />
                </Button>

            </form>

        </div>
    );
};

export default ContactForm;