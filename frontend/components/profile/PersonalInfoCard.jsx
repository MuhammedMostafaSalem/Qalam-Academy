"use client";

import Section from "../sections/Section";

const PersonalInfoCard = () => {
    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    المعلومات الشخصية
                </h2>

                <p className="mt-2 text-text-secondary">
                    قم بتحديث بيانات حسابك الشخصية.
                </p>
            </div>

            <form className="space-y-6">

                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Full Name */}
                    <div>
                        <label className="mb-2 block font-medium">
                            الاسم الكامل
                        </label>

                        <input
                            type="text"
                            defaultValue="Marwan Salem"
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block font-medium">
                            البريد الإلكتروني
                        </label>

                        <input
                            type="email"
                            defaultValue="marwan@company.com"
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-2 block font-medium">
                            رقم الهاتف
                        </label>

                        <input
                            type="text"
                            defaultValue="+20 100 123 4567"
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    {/* Job */}
                    <div>
                        <label className="mb-2 block font-medium">
                            المسمى الوظيفي
                        </label>

                        <input
                            type="text"
                            defaultValue="CEO"
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                </div>

                {/* Bio */}

                <div>
                    <label className="mb-2 block font-medium">
                        نبذة شخصية
                    </label>

                    <textarea
                        rows={5}
                        defaultValue="Founder & Full Stack Developer."
                        className="
                            w-full
                            resize-none
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                        "
                    />
                </div>

                {/* Save */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="
                            rounded-2xl
                            bg-primary
                            px-6
                            py-3
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        حفظ التعديلات
                    </button>

                </div>

            </form>
        </Section>
    );
};

export default PersonalInfoCard;